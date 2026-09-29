import type { AccountData } from '../../types/accounts'
import type {
  ItemShopAccountInfo,
  ItemShopActionResult,
  ItemShopCatalogResponse,
  ItemShopCreatorCodeRequest,
  ItemShopGiftHistoryEntry,
  ItemShopGiftRequest,
  ItemShopGiftResultPayload,
  ItemShopOffer,
  ItemShopPurchaseRequest,
} from '../../types/item-shop'

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { ElectronAPIEventKeys } from '../../config/constants/main-process'

import { MainWindow } from '../startup/windows/main'
import { DataDirectory } from '../startup/data-directory'
import { Authentication } from './authentication'

import { lookupAffiliateSlug } from '../../services/endpoints/affiliate'
import {
  fetchPublicItemShop,
  type FortniteApiShopEntry,
} from '../../services/endpoints/fortnite-api'
import {
  giftCatalogEntry,
  getQueryProfileMainProfile,
  purchaseCatalogEntry,
  setAffiliateName,
} from '../../services/endpoints/mcp'
import { storeRequestAccess } from '../../services/endpoints/store'
import { getCatalog } from '../../services/endpoints/storefront'

import { getDate, getDateWithDefaultFormat } from '../../lib/dates'
import { parseCustomDisplayName } from '../../lib/utils'

const SKIP_STOREFRONTS = new Set([
  'CardPackStorePreroll',
  'CardPackStoreGameplay',
  'FoundersPack',
])

type RawPrice = {
  currencyType?: string
  currencySubType?: string
  regularPrice?: number
  finalPrice?: number
}

type RawGrant = {
  templateId?: string
  quantity?: number
}

type RawEntry = {
  offerId?: string
  devName?: string
  title?: string
  displayAssetPath?: string
  giftable?: boolean
  refundable?: boolean
  categories?: Array<string>
  prices?: Array<RawPrice>
  itemGrants?: Array<RawGrant>
  meta?: Record<string, unknown>
  metaInfo?: Array<{ key?: string; value?: string }>
}

type RawStorefront = {
  name?: string
  catalogEntries?: Array<RawEntry>
}

type CachedCatalog = {
  shopDate: string | null
  expiration: string | null
  fetchedAt: string | null
  offers: Array<ItemShopOffer>
  sections: Array<string>
}

function emptyCatalog(): ItemShopCatalogResponse {
  return {
    shopDate: null,
    expiration: null,
    fetchedAt: null,
    newShopAvailable: false,
    offers: [],
    sections: [],
  }
}

function catalogPath() {
  return path.join(DataDirectory.rootPath, 'item-shop-catalog.json')
}

function giftsPath() {
  return path.join(DataDirectory.rootPath, 'item-shop-gifts.json')
}

function isNewShopAvailable(expiration: string | null) {
  if (!expiration) {
    return false
  }

  const expires = Date.parse(expiration)

  return Number.isFinite(expires) && Date.now() > expires
}

function epicError(error: unknown) {
  const response = (
    error as { response?: { data?: Record<string, string> } }
  )?.response?.data

  return (
    response?.errorMessage ??
    response?.errorCode?.split('.')?.at(-1) ??
    'unknown'
  )
}

async function readCachedCatalog(): Promise<CachedCatalog | null> {
  try {
    const raw = await readFile(catalogPath(), { encoding: 'utf8' })
    const parsed = JSON.parse(raw) as CachedCatalog

    if (!parsed || !Array.isArray(parsed.offers)) {
      return null
    }

    return parsed
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}

async function writeCachedCatalog(data: CachedCatalog) {
  await writeFile(catalogPath(), JSON.stringify(data, null, 2), {
    encoding: 'utf8',
  })
}

async function readGiftHistory(): Promise<Array<ItemShopGiftHistoryEntry>> {
  try {
    const raw = await readFile(giftsPath(), { encoding: 'utf8' })
    const parsed = JSON.parse(raw) as Array<ItemShopGiftHistoryEntry>

    return Array.isArray(parsed) ? parsed : []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return []
  }
}

async function writeGiftHistory(data: Array<ItemShopGiftHistoryEntry>) {
  await writeFile(giftsPath(), JSON.stringify(data, null, 2), {
    encoding: 'utf8',
  })
}

function firstPublicItem(entry: FortniteApiShopEntry) {
  return (
    entry.brItems?.[0] ??
    entry.items?.[0] ??
    entry.tracks?.[0] ??
    entry.instruments?.[0] ??
    entry.cars?.[0] ??
    entry.legoKits?.[0] ??
    null
  )
}

function entryIconUrl(entry: FortniteApiShopEntry) {
  const first = firstPublicItem(entry)
  const image =
    first?.images?.icon ??
    first?.images?.smallIcon ??
    entry.newDisplayAsset?.renderImages?.[0]?.image ??
    null

  if (image && image.startsWith('https://')) {
    return image
  }

  return null
}

function offersFromPublicShop(
  publicEntries: Array<FortniteApiShopEntry>
): Array<ItemShopOffer> {
  const offers: Array<ItemShopOffer> = []

  publicEntries.forEach((entry) => {
    const first = firstPublicItem(entry)

    if (!first?.name) {
      return
    }

    offers.push({
      offerId: entry.offerId ?? first.id ?? first.name,
      title: first.name,
      description: first.description ?? '',
      section: entry.layout?.name ?? entry.layoutId ?? 'Shop',
      storefront: 'BRShop',
      type: first.type?.displayValue ?? first.type?.value ?? 'Item',
      rarity: first.rarity?.value ?? first.rarity?.displayValue ?? 'common',
      imageUrl: entryIconUrl(entry),
      price: entry.finalPrice ?? 0,
      regularPrice: entry.regularPrice ?? entry.finalPrice ?? 0,
      currencyType: 'MtxCurrency',
      currencySubType: '',
      giftable: entry.giftable ?? false,
      grants: first.id ? [{ templateId: first.id, quantity: 1 }] : [],
    })
  })

  const unique = new Map<string, ItemShopOffer>()
  offers.forEach((offer) => {
    if (!unique.has(offer.offerId)) {
      unique.set(offer.offerId, offer)
    }
  })

  return Array.from(unique.values()).sort((a, b) => {
    if (a.section !== b.section) {
      return a.section.localeCompare(b.section)
    }

    return a.title.localeCompare(b.title)
  })
}

export class ItemShop {
  static async loadCachedCatalog() {
    const cached = await readCachedCatalog()

    if (!cached) {
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.ItemShopCatalogResponse,
        emptyCatalog()
      )
      return
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.ItemShopCatalogResponse,
      {
        shopDate: cached.shopDate,
        expiration: cached.expiration,
        fetchedAt: cached.fetchedAt,
        newShopAvailable: isNewShopAvailable(cached.expiration),
        offers: cached.offers.map((offer) => ({
          ...offer,
          imageUrl:
            offer.imageUrl && offer.imageUrl.startsWith('https://')
              ? offer.imageUrl
              : null,
        })),
        sections: cached.sections,
        fromCache: true,
      }
    )
  }

  static async loadGiftHistory() {
    const gifts = await readGiftHistory()

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.ItemShopGiftHistoryResponse,
      gifts.map((gift) => ({
        ...gift,
        imageUrl:
          gift.imageUrl && !gift.imageUrl.startsWith('data:')
            ? gift.imageUrl
            : null,
      }))
    )
  }

  static async requestCatalog(account: AccountData) {
    const send = async (payload: ItemShopCatalogResponse) => {
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.ItemShopCatalogResponse,
        payload
      )

      await writeCachedCatalog({
        shopDate: payload.shopDate,
        expiration: payload.expiration,
        fetchedAt: payload.fetchedAt,
        offers: payload.offers,
        sections: payload.sections,
      })
    }

    try {
      const publicShop = await fetchPublicItemShop()
      const publicData = publicShop.data.data
      const publicEntries = publicData?.entries ?? []
      const offers = offersFromPublicShop(publicEntries)

      const payload: ItemShopCatalogResponse = {
        shopDate: publicData?.date ? getDate(publicData.date) : getDate(),
        expiration: null,
        fetchedAt: getDateWithDefaultFormat(),
        newShopAvailable: false,
        offers,
        sections: [...new Set(offers.map((offer) => offer.section))].sort(
          (a, b) => a.localeCompare(b)
        ),
      }

      await send(payload)

      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        return
      }

      const catalog = await getCatalog({ accessToken })
      payload.expiration = catalog.data.expiration ?? null
      payload.newShopAvailable = isNewShopAvailable(payload.expiration)

      const epicByOfferId = new Map<string, ItemShopOffer['grants']>()
      const epicPriceByOfferId = new Map<
        string,
        { price: number; regularPrice: number; currencySubType: string }
      >()

      const storefronts = (catalog.data.storefronts ??
        []) as Array<RawStorefront>

      storefronts.forEach((storefront) => {
        if (SKIP_STOREFRONTS.has(storefront.name ?? '')) {
          return
        }

        const catalogEntries = storefront.catalogEntries ?? []

        catalogEntries.forEach((entry) => {
          if (!entry.offerId) {
            return
          }

          const mtxPrice = entry.prices?.find(
            (price) => price.currencyType === 'MtxCurrency'
          )

          if (!mtxPrice) {
            return
          }

          const grants = (entry.itemGrants ?? [])
            .filter((grant) => typeof grant.templateId === 'string')
            .map((grant) => ({
              templateId: grant.templateId as string,
              quantity: grant.quantity ?? 1,
            }))

          epicByOfferId.set(entry.offerId, grants)
          epicPriceByOfferId.set(entry.offerId, {
            price: mtxPrice.finalPrice ?? 0,
            regularPrice: mtxPrice.regularPrice ?? mtxPrice.finalPrice ?? 0,
            currencySubType: mtxPrice.currencySubType ?? '',
          })
        })
      })

      payload.offers = payload.offers.map((offer) => {
        const grants = epicByOfferId.get(offer.offerId)
        const price = epicPriceByOfferId.get(offer.offerId)

        if (!grants && !price) {
          return offer
        }

        return {
          ...offer,
          grants: grants ?? offer.grants,
          price: price?.price ?? offer.price,
          regularPrice: price?.regularPrice ?? offer.regularPrice,
          currencySubType: price?.currencySubType ?? offer.currencySubType,
        }
      })

      await send(payload)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.ItemShopCatalogResponse,
        emptyCatalog()
      )
    }
  }

  static async requestAccounts(accounts: Array<AccountData>) {
    await Promise.allSettled(
      accounts.map(async (account) => {
        const info = await ItemShop.fetchAccountInfo(account)

        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.ItemShopAccountResponse,
          info
        )
      })
    )

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.ItemShopAccountsDone
    )
  }

  static async fetchAccountInfo(
    account: AccountData
  ): Promise<ItemShopAccountInfo> {
    const info: ItemShopAccountInfo = {
      accountId: account.accountId,
      vbucks: 0,
      affiliate: '',
      canSendGifts: true,
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        info.error = 'auth'
        return info
      }

      const profile = await getQueryProfileMainProfile({
        accessToken,
        accountId: account.accountId,
      })
      const change = profile.data.profileChanges?.[0]?.profile
      const items = change?.items ?? {}
      const stats = (change?.stats?.attributes ?? {}) as Record<string, unknown>

      Object.values(items).forEach((item) => {
        if (item.templateId.startsWith('Currency:Mtx')) {
          info.vbucks += item.quantity ?? 0
        }
      })

      if (typeof stats.mtx_affiliate === 'string') {
        info.affiliate = stats.mtx_affiliate
      }

      if (typeof stats.allowed_to_send_gifts === 'boolean') {
        info.canSendGifts = stats.allowed_to_send_gifts
      }

      return info
    } catch {
      info.error = 'fetch'
      return info
    }
  }

  static async applyCreatorCode(request: ItemShopCreatorCodeRequest) {
    const results: Array<ItemShopActionResult> = []
    const slug = request.code.trim()

    if (slug === '') {
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.ItemShopCreatorCodeResult,
        results
      )
      return
    }

    await Promise.allSettled(
      request.accounts.map(async (account) => {
        const result: ItemShopActionResult = {
          accountId: account.accountId,
          success: false,
        }

        try {
          const accessToken = await Authentication.verifyAccessToken(account)

          if (!accessToken) {
            result.error = 'auth'
            result.errorMessage = 'invalid_access_token'
            results.push(result)
            return
          }

          try {
            await lookupAffiliateSlug({ slug })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            // Lookup is optional — Fortnite still accepts many codes here.
          }

          const response = await setAffiliateName({
            accessToken,
            accountId: account.accountId,
            affiliateName: slug,
          })

          const stats = (response.data.profileChanges?.[0]?.profile?.stats
            ?.attributes ?? {}) as Record<string, unknown>
          const applied =
            typeof stats.mtx_affiliate === 'string'
              ? stats.mtx_affiliate
              : ''

          if (
            applied !== '' &&
            applied.toLowerCase() !== slug.toLowerCase()
          ) {
            result.error = 'mismatch'
            result.errorMessage = applied
            results.push(result)
            return
          }

          result.success = true
          results.push(result)
        } catch (error) {
          result.error = 'apply'
          result.errorMessage = epicError(error)
          results.push(result)
        }
      })
    )

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.ItemShopCreatorCodeResult,
      results
    )
  }

  static async purchase(request: ItemShopPurchaseRequest) {
    const results: Array<ItemShopActionResult> = []
    const gifts: Array<ItemShopGiftHistoryEntry> = []

    await Promise.allSettled(
      request.accounts.map(async (account) => {
        const result: ItemShopActionResult = {
          accountId: account.accountId,
          success: false,
        }

        try {
          const accessToken = await Authentication.verifyAccessToken(account)

          if (!accessToken) {
            result.error = 'auth'
            result.errorMessage = 'invalid_access_token'
            results.push(result)
            return
          }

          try {
            await storeRequestAccess({
              accessToken,
              accountId: account.accountId,
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            //
          }

          const info = await ItemShop.fetchAccountInfo(account)

          await purchaseCatalogEntry({
            accessToken,
            accountId: account.accountId,
            offerId: request.offerId,
            currency: request.currencyType,
            currencySubType: request.currencySubType,
            expectedTotalPrice: request.expectedTotalPrice,
            purchaseQuantity: 1,
            gameContext: '',
          })

          result.success = true
          results.push(result)

          const displayName = parseCustomDisplayName(account)

          gifts.push({
            id: crypto.randomUUID(),
            kind: 'purchase',
            createdAt: getDateWithDefaultFormat(),
            fromAccountId: account.accountId,
            fromDisplayName: displayName,
            toAccountId: account.accountId,
            toDisplayName: displayName,
            offerId: request.offerId,
            title: request.offerTitle,
            imageUrl:
              request.imageUrl?.startsWith('https://')
                ? request.imageUrl
                : null,
            price: request.expectedTotalPrice,
            creatorCode: info.affiliate,
          })
        } catch (error) {
          result.error = 'purchase'
          result.errorMessage = epicError(error)
          results.push(result)
        }
      })
    )

    if (gifts.length > 0) {
      const history = await readGiftHistory()
      await writeGiftHistory([...gifts, ...history].slice(0, 500))
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.ItemShopPurchaseResult,
      {
        results,
        gifts,
      }
    )
  }

  static async gift(request: ItemShopGiftRequest) {
    const results: Array<ItemShopActionResult> = []
    const gifts: Array<ItemShopGiftHistoryEntry> = []

    await Promise.allSettled(
      request.accounts.map(async (account) => {
        const result: ItemShopActionResult = {
          accountId: account.accountId,
          success: false,
        }

        try {
          const accessToken = await Authentication.verifyAccessToken(account)

          if (!accessToken) {
            result.error = 'auth'
            result.errorMessage = 'invalid_access_token'
            results.push(result)
            return
          }

          const info = await ItemShop.fetchAccountInfo(account)

          await giftCatalogEntry({
            accessToken,
            accountId: account.accountId,
            offerId: request.offerId,
            receiverAccountIds: [request.receiverAccountId],
            expectedTotalPrice: request.expectedTotalPrice,
            currency: request.currencyType,
            currencySubType: request.currencySubType,
            purchaseQuantity: 1,
            personalMessage: request.personalMessage ?? '',
          })

          result.success = true
          results.push(result)

          gifts.push({
            id: crypto.randomUUID(),
            kind: 'gift',
            createdAt: getDateWithDefaultFormat(),
            fromAccountId: account.accountId,
            fromDisplayName: parseCustomDisplayName(account),
            toAccountId: request.receiverAccountId,
            toDisplayName: request.receiverDisplayName,
            offerId: request.offerId,
            title: request.offerTitle,
            imageUrl: request.imageUrl?.startsWith('https://')
              ? request.imageUrl
              : null,
            iconFile: request.iconFile ?? null,
            price: request.expectedTotalPrice,
            creatorCode: info.affiliate,
          })
        } catch (error) {
          result.error = 'gift'
          result.errorMessage = epicError(error)
          results.push(result)
        }
      })
    )

    if (gifts.length > 0) {
      const history = await readGiftHistory()
      await writeGiftHistory([...gifts, ...history].slice(0, 500))
    }

    const payload: ItemShopGiftResultPayload = {
      results,
      gifts,
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.ItemShopGiftResult,
      payload
    )
  }
}
