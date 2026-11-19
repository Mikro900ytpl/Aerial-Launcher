import type { AccountData } from '../../types/accounts'
import type {
  StwShopAccount,
  StwShopAutoResult,
  StwShopBuyRequest,
  StwShopBuyResult,
  StwShopConfig,
  StwShopLoadResult,
  StwShopOffer,
  StwShopSavedItem,
} from '../../types/stw-shop'

import { ElectronAPIEventKeys } from '../../config/constants/main-process'

import {
  GOLD_TEMPLATE,
  catalogMeta,
  goldPrice,
  monthStart,
  offerLimit,
  primaryTemplateId,
  purchaseListIfCurrent,
  readEventPurchases,
  shopItemSignature,
  shopSection,
  shopSignatureNeedsRun,
  stwNextReset,
  stwWeekKey,
  stwWeekStart,
  type ShopCatalogEntry,
  type ShopPurchaseState,
} from '../../lib/stw/shop'
import {
  getQueryProfile,
  getQueryProfileMainProfile,
  purchaseCatalogEntry,
} from '../../services/endpoints/mcp'
import { getCatalog } from '../../services/endpoints/storefront'

import { readAppJson, writeAppJson } from '../startup/app-json'
import { AccountsManager } from '../startup/accounts'
import { MainWindow } from '../startup/windows/main'
import { Authentication } from './authentication'

const FILE_NAME = 'stw-shop.json'
const MAX_QUANTITY = 100

const emptyConfig = (): StwShopConfig => ({
  enabled: false,
  accountIds: [],
  items: [],
  week: '',
  done: {},
})

function notifyConfig(config: StwShopConfig) {
  send(ElectronAPIEventKeys.StwShopConfigNotification, config)
}

function send(channel: ElectronAPIEventKeys, payload: unknown) {
  const window = MainWindow.instance

  if (!window || window.isDestroyed()) {
    return
  }

  window.webContents.send(channel, payload)
}

function errorText(error: unknown) {
  const data = (
    error as {
      response?: { data?: { errorMessage?: string; errorCode?: string } }
    }
  )?.response?.data

  if (data?.errorMessage) {
    return data.errorMessage
  }

  if (data?.errorCode) {
    return data.errorCode
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Unknown Error'
}

function sanitizeItems(value: unknown): Array<StwShopSavedItem> {
  if (!Array.isArray(value)) {
    return []
  }

  const items: Array<StwShopSavedItem> = []
  const seen = new Set<string>()

  value.forEach((item) => {
    if (!item || typeof item !== 'object') {
      return
    }

    const row = item as { templateId?: unknown; name?: unknown }
    const templateId =
      typeof row.templateId === 'string' ? row.templateId.trim() : ''

    if (!templateId || seen.has(templateId) || !templateId.includes(':')) {
      return
    }

    seen.add(templateId)
    items.push({
      templateId,
      name: typeof row.name === 'string' && row.name.trim() ? row.name.trim() : templateId,
    })
  })

  return items
}

function sanitizeIds(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return [
    ...new Set(
      value.filter((id): id is string => typeof id === 'string' && id.length > 0),
    ),
  ]
}

function sanitizeDone(value: unknown) {
  if (!value || typeof value !== 'object') {
    return {}
  }

  const done: Record<string, string> = {}

  Object.entries(value as Record<string, unknown>).forEach(([key, entry]) => {
    if (typeof entry === 'string') {
      done[key] = entry
    }
  })

  return done
}

export class StwShop {
  private static chain: Promise<void> = Promise.resolve()

  static enqueue(task: () => Promise<void>) {
    StwShop.chain = StwShop.chain.then(task, task)

    return StwShop.chain
  }

  static async readConfig(): Promise<StwShopConfig> {
    const stored = await readAppJson(FILE_NAME, emptyConfig())

    return {
      enabled: stored.enabled === true,
      accountIds: sanitizeIds(stored.accountIds),
      items: sanitizeItems(stored.items),
      week: typeof stored.week === 'string' ? stored.week : '',
      done: sanitizeDone(stored.done),
    }
  }

  static publish() {
    return StwShop.enqueue(async () => {
      notifyConfig(await StwShop.readConfig())
    })
  }

  static saveConfig(partial: {
    enabled?: boolean
    accountIds?: Array<string>
    items?: Array<StwShopSavedItem>
  }) {
    return StwShop.enqueue(async () => {
      const current = await StwShop.readConfig()
      const next: StwShopConfig = {
        ...current,
        enabled:
          typeof partial.enabled === 'boolean' ? partial.enabled : current.enabled,
        accountIds:
          partial.accountIds !== undefined
            ? sanitizeIds(partial.accountIds)
            : current.accountIds,
        items:
          partial.items !== undefined ? sanitizeItems(partial.items) : current.items,
      }

      await writeAppJson(FILE_NAME, next)
      notifyConfig(next)
    })
  }

  static load(accounts: Array<AccountData>) {
    return StwShop.enqueue(async () => {
      const result = await StwShop.inspect(accounts)

      send(ElectronAPIEventKeys.StwShopLoadNotification, result)
    })
  }

  static buy(request: StwShopBuyRequest) {
    return StwShop.enqueue(async () => {
      const result = await StwShop.buyAccount(request)

      send(ElectronAPIEventKeys.StwShopBuyNotification, result)
    })
  }

  static runAuto(options?: { force?: boolean; silent?: boolean }) {
    return StwShop.enqueue(async () => {
      const result = await StwShop.auto(options?.force === true)
      const shouldReport =
        !options?.silent || result.bought > 0 || result.errors.length > 0

      if (shouldReport) {
        send(ElectronAPIEventKeys.StwShopAutoNotification, result)
      }
    })
  }

  private static async inspect(
    accounts: Array<AccountData>,
  ): Promise<StwShopLoadResult> {
    const resetAt = stwNextReset().toISOString()
    const empty: StwShopLoadResult = {
      resetAt,
      offers: [],
      accounts: [],
      errorMessage: null,
    }

    if (accounts.length === 0) {
      empty.errorMessage = 'No accounts selected.'

      return empty
    }

    let catalogOffers: Array<StwShopOffer> | null = null
    let catalogError = 'Could not sign in.'

    for (const account of accounts) {
      try {
        const accessToken = await Authentication.verifyAccessToken(account)

        if (!accessToken) {
          continue
        }

        const catalog = await getCatalog({ accessToken })

        catalogOffers = parseOffers(catalog.data.storefronts ?? [])
        catalogError = ''
        break
      } catch (error) {
        catalogError = errorText(error)
      }
    }

    if (!catalogOffers) {
      empty.errorMessage = catalogError

      return empty
    }

    empty.offers = catalogOffers
    empty.accounts = await mapPool(accounts, 2, (account) =>
      inspectAccount(account, catalogOffers),
    )

    return empty
  }

  private static async buyAccount(
    request: StwShopBuyRequest,
  ): Promise<StwShopBuyResult> {
    const result: StwShopBuyResult = {
      accountId: request.account.accountId,
      offerId: request.offerId,
      success: false,
      purchased: 0,
      errorMessage: 'Unknown Error',
      account: null,
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(request.account)

      if (!accessToken) {
        result.errorMessage = 'Could not sign in.'

        return result
      }

      const catalog = await getCatalog({ accessToken })
      const offers = parseOffers(catalog.data.storefronts ?? [])
      const offer = offers.find((item) => item.offerId === request.offerId)

      if (!offer) {
        result.errorMessage = 'That item is no longer in the shop.'
        result.account = await inspectAccount(request.account, offers)

        return result
      }

      const before = await inspectAccount(request.account, offers)
      const row = before.offers.find((item) => item.offerId === offer.offerId)
      const remaining = row?.remaining
      const affordable =
        offer.price > 0 ? Math.floor(before.gold / offer.price) : MAX_QUANTITY
      const cap =
        remaining == null
          ? Math.min(MAX_QUANTITY, affordable)
          : Math.min(remaining, affordable, MAX_QUANTITY)
      const quantity = Math.max(0, Math.min(Math.floor(request.quantity || 0), cap))

      if (quantity <= 0) {
        result.errorMessage =
          remaining === 0 ? 'Purchase limit reached.' : 'Not enough gold.'
        result.account = before

        return result
      }

      const purchased = await buyQuantity({
        accessToken,
        accountId: request.account.accountId,
        offer,
        quantity,
      })

      result.success = purchased > 0
      result.purchased = purchased
      result.errorMessage = purchased > 0 ? null : 'Purchase failed.'
      result.account = await inspectAccount(request.account, offers)

      return result
    } catch (error) {
      result.errorMessage = errorText(error)
    }

    return result
  }

  private static async auto(force: boolean): Promise<StwShopAutoResult> {
    const summary: StwShopAutoResult = {
      accounts: 0,
      bought: 0,
      errors: [],
    }
    const config = await StwShop.readConfig()

    if (!config.enabled && !force) {
      return summary
    }

    if (config.accountIds.length === 0 || config.items.length === 0) {
      return summary
    }

    const accounts = config.accountIds
      .map((accountId) => AccountsManager.getAccountById(accountId))
      .filter((account): account is AccountData => account !== undefined)

    summary.accounts = accounts.length

    if (accounts.length === 0) {
      summary.errors.push('Selected accounts are not signed in.')

      return summary
    }

    const week = stwWeekKey()
    const signature = shopItemSignature(
      config.items.map((item) => item.templateId),
    )
    const wanted = new Set(config.items.map((item) => item.templateId))
    const done = config.week === week ? { ...config.done } : {}
    let changed = config.week !== week

    for (const account of accounts) {
      if (
        !force &&
        !shopSignatureNeedsRun(done[account.accountId], signature)
      ) {
        continue
      }

      try {
        const bought = await buyWanted(account, wanted)

        summary.bought += bought.bought
        bought.errors.forEach((message) => {
          summary.errors.push(`${account.displayName}: ${message}`)
        })

        // Short gold stays open so the next launch can finish the week.
        if (!bought.shortGold || bought.errors.length > 0) {
          done[account.accountId] = signature
          changed = true
        }
      } catch (error) {
        summary.errors.push(
          `${account.displayName}: ${errorText(error)}`,
        )
      }
    }

    if (changed) {
      const next: StwShopConfig = {
        ...config,
        week,
        done,
      }

      await writeAppJson(FILE_NAME, next)
      notifyConfig(next)
    }

    return summary
  }
}

async function buyWanted(account: AccountData, wanted: Set<string>) {
  const accessToken = await Authentication.verifyAccessToken(account)

  if (!accessToken) {
    throw new Error('Could not sign in.')
  }

  const catalog = await getCatalog({ accessToken })
  const offers = parseOffers(catalog.data.storefronts ?? []).filter(
    (offer) =>
      offer.limit != null &&
      offer.primaryTemplateId &&
      wanted.has(offer.primaryTemplateId),
  )
  const state = await inspectAccount(account, offers)
  let gold = state.gold
  let bought = 0
  let shortGold = false
  const errors: Array<string> = []

  if (state.errorMessage) {
    throw new Error(state.errorMessage)
  }

  for (const offer of offers) {
    const row = state.offers.find((item) => item.offerId === offer.offerId)
    const remaining = row?.remaining ?? 0

    if (remaining <= 0) {
      continue
    }

    const affordable = offer.price > 0 ? Math.floor(gold / offer.price) : remaining
    const quantity = Math.min(remaining, affordable, MAX_QUANTITY)

    if (quantity <= 0) {
      shortGold = true
      continue
    }

    try {
      const purchased = await buyQuantity({
        accessToken,
        accountId: account.accountId,
        offer,
        quantity,
      })

      bought += purchased
      gold -= purchased * offer.price

      if (purchased < quantity) {
        shortGold = true
      }
    } catch (error) {
      errors.push(errorText(error))
    }
  }

  return {
    bought,
    errors,
    shortGold,
  }
}

async function buyQuantity({
  accessToken,
  accountId,
  offer,
  quantity,
}: {
  accessToken: string
  accountId: string
  offer: StwShopOffer
  quantity: number
}) {
  try {
    await purchaseCatalogEntry({
      accessToken,
      accountId,
      offerId: offer.offerId,
      currency: offer.currencyType,
      currencySubType: offer.currencySubType,
      expectedTotalPrice: offer.price * quantity,
      purchaseQuantity: quantity,
    })

    return quantity
  } catch (error) {
    if (quantity === 1) {
      throw error
    }
  }

  let purchased = 0
  let lastError: unknown = null

  for (let index = 0; index < quantity; index += 1) {
    try {
      await purchaseCatalogEntry({
        accessToken,
        accountId,
        offerId: offer.offerId,
        currency: offer.currencyType,
        currencySubType: offer.currencySubType,
        expectedTotalPrice: offer.price,
        purchaseQuantity: 1,
      })
      purchased += 1
    } catch (error) {
      lastError = error
      break
    }
  }

  if (purchased === 0) {
    throw lastError instanceof Error ? lastError : new Error(errorText(lastError))
  }

  return purchased
}

function parseOffers(
  storefronts: Array<{
    name?: string
    catalogEntries?: Array<ShopCatalogEntry>
  }>,
) {
  const offers: Array<StwShopOffer> = []

  storefronts.forEach((storefront) => {
    const section = shopSection(storefront.name ?? '')

    if (!section) {
      return
    }

    ;(storefront.catalogEntries ?? []).forEach((entry) => {
      const price = goldPrice(entry)

      if (!entry.offerId || !price) {
        return
      }

      const grants = (entry.itemGrants ?? [])
        .map((grant) => ({
          templateId: grant.templateId ?? '',
          quantity: grant.quantity ?? 1,
        }))
        .filter((grant) => grant.templateId.length > 0)
      const meta = catalogMeta(entry)
      const eventLimit = Number(meta.EventLimit ?? '')
      const shaped: StwShopOffer = {
        offerId: entry.offerId,
        section,
        devName: entry.devName ?? '',
        title: entry.title ?? '',
        primaryTemplateId: primaryTemplateId(grants),
        grants,
        price: price.price,
        currencyType: price.currencyType,
        currencySubType: price.currencySubType,
        dailyLimit: entry.dailyLimit ?? -1,
        weeklyLimit: entry.weeklyLimit ?? -1,
        monthlyLimit: entry.monthlyLimit ?? -1,
        eventLimit: Number.isFinite(eventLimit) ? eventLimit : -1,
        eventId: meta.PurchaseLimitingEventId ?? '',
        limit: null,
        limitKind: 'none',
        sortPriority: entry.sortPriority ?? 0,
      }
      const limit = accountOfferLimit(shaped, emptyPurchases())

      shaped.limit = limit.limit
      shaped.limitKind = limit.limitKind
      offers.push(shaped)
    })
  })

  offers.sort((a, b) => {
    if (a.section !== b.section) {
      return a.section === 'event' ? -1 : 1
    }

    return a.sortPriority - b.sortPriority
  })

  return offers
}

function emptyPurchases(): ShopPurchaseState {
  return {
    daily: {},
    weekly: {},
    monthly: {},
    events: [],
  }
}

async function inspectAccount(
  account: AccountData,
  offers: Array<StwShopOffer>,
): Promise<StwShopAccount> {
  const result: StwShopAccount = {
    accountId: account.accountId,
    gold: 0,
    errorMessage: null,
    offers: offers.map((offer) => ({
      offerId: offer.offerId,
      purchased: 0,
      remaining: offer.limit,
    })),
  }

  try {
    const accessToken = await Authentication.verifyAccessToken(account)

    if (!accessToken) {
      result.errorMessage = 'Could not sign in.'

      return result
    }

    const [campaign, core] = await Promise.all([
      getQueryProfile({
        accessToken,
        accountId: account.accountId,
      }),
      getQueryProfileMainProfile({
        accessToken,
        accountId: account.accountId,
      }),
    ])
    const campaignItems =
      campaign.data.profileChanges?.[0]?.profile?.items ?? {}
    const coreProfile = core.data.profileChanges?.[0]?.profile
    const attributes = coreProfile?.stats?.attributes
    const now = new Date()
    const purchases: ShopPurchaseState = {
      daily: purchaseListIfCurrent(
        attributes?.daily_purchases,
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
      ),
      weekly: purchaseListIfCurrent(
        attributes?.weekly_purchases,
        stwWeekStart(now).getTime(),
      ),
      monthly: purchaseListIfCurrent(
        attributes?.monthly_purchases,
        monthStart(now).getTime(),
      ),
      events: readEventPurchases(coreProfile?.items ?? {}),
    }

    result.gold = goldQuantity(campaignItems)
    result.offers = offers.map((offer) => {
      const limit = accountOfferLimit(offer, purchases)

      return {
        offerId: offer.offerId,
        purchased: limit.purchased,
        remaining: limit.remaining,
      }
    })

    return result
  } catch (error) {
    result.errorMessage = errorText(error)
  }

  return result
}

function accountOfferLimit(offer: StwShopOffer, purchases: ShopPurchaseState) {
  return offerLimit(
    {
      offerId: offer.offerId,
      dailyLimit: offer.dailyLimit,
      weeklyLimit: offer.weeklyLimit,
      monthlyLimit: offer.monthlyLimit,
      meta:
        offer.eventLimit > 0
          ? {
              EventLimit: `${offer.eventLimit}`,
              PurchaseLimitingEventId: offer.eventId,
            }
          : undefined,
    },
    purchases,
  )
}

function goldQuantity(items: Record<string, { templateId?: string; quantity?: number }>) {
  return Object.values(items).reduce((total, item) => {
    if (item?.templateId === GOLD_TEMPLATE) {
      return total + (item.quantity ?? 0)
    }

    return total
  }, 0)
}

async function mapPool<T, R>(
  items: Array<T>,
  limit: number,
  task: (item: T) => Promise<R>,
) {
  const results = new Array<R>(items.length)
  let index = 0

  async function worker() {
    while (index < items.length) {
      const current = index

      index += 1
      results[current] = await task(items[current])
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  )

  return results
}

