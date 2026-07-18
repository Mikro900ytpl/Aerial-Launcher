import type { AccountData } from '../../types/accounts'
import type {
  LlamaManagerAccountData,
  LlamaManagerActionResult,
  LlamaManagerCurrency,
  LlamaManagerInventoryPack,
  LlamaManagerOpenChoiceRequest,
  LlamaManagerOpenRequest,
  LlamaManagerPurchaseRequest,
  LlamaManagerShopOffer,
} from '../../types/llama-manager'
import type { MCPQueryProfileProfileChangesPrerollData } from '../../types/services/mcp'
import type { RewardsNotification } from '../../types/notifications'

import { ElectronAPIEventKeys } from '../../config/constants/main-process'
import { resourcesJson } from '../../config/constants/resources'

import { Authentication } from './authentication'
import { MainWindow } from '../startup/windows/main'
import { AccountsManager } from '../startup/accounts'

import {
  getQueryProfile,
  getQueryProfileMainProfile,
  populatePrerolledOffers,
  purchaseCatalogEntry,
  setOpenCardPack,
  setOpenCardPackBatch,
} from '../../services/endpoints/mcp'
import { getCatalog } from '../../services/endpoints/storefront'

import {
  isMCPQueryProfileChangesCardPack,
  isMCPQueryProfileChangesPrerollData,
} from '../../lib/check-objects'
import { getDateWithDefaultFormat } from '../../lib/dates'
import { getKey } from '../../lib/parsers/resources'

const SHOP_STOREFRONTS = [
  'CardPackStorePreroll',
  'CardPackStoreGameplay',
] as const

const BATCH_OPEN_SIZE = 50

function humanizeTemplateId(templateId: string) {
  const cleaned = templateId
    .replace(/^CardPack:/i, '')
    .replace(/^AccountResource:/i, '')
    .replace(/^zcp_/i, '')
    .replace(/_/g, ' ')

  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function resolveResourceName(templateId: string) {
  const key = templateId
    .replace('AccountResource:', '')
    .replace('CardPack:zcp_', '')
    .replace('CardPack:', '')
  const resource = getKey(key, resourcesJson)

  if (resource) {
    return resource[1].name
  }

  return humanizeTemplateId(templateId)
}

function isChoicePackTemplate(templateId: string) {
  const lower = templateId.toLowerCase()

  return (
    lower.includes('zcp_') ||
    lower.includes('choice') ||
    lower.includes('_cp_') ||
    lower.includes('chooseyour') ||
    lower.includes('pickone')
  )
}

function extractRewards(
  notifications: Array<{
    loot?: {
      items?: Array<{ itemType: string; quantity: number }>
      lootGranted?: {
        items: Array<{ itemType: string; quantity: number }>
      }
    }
    lootGranted?: {
      items: Array<{ itemType: string; quantity: number }>
    }
    lootResult?: {
      items: Array<{ itemType: string; quantity: number }>
    }
  }> = [],
) {
  const rewards: Record<string, number> = {}

  notifications.forEach((notification) => {
    const items =
      notification.loot?.items ??
      notification.loot?.lootGranted?.items ??
      notification.lootGranted?.items ??
      notification.lootResult?.items ??
      []

    items.forEach(({ itemType, quantity }) => {
      if (itemType.toLowerCase().startsWith('accolades:')) {
        return
      }

      rewards[itemType] = (rewards[itemType] ?? 0) + quantity
    })
  })

  return rewards
}

function sendRewardsNotification({
  accountId,
  rewards,
}: {
  accountId: string
  rewards: Record<string, number>
}) {
  if (Object.keys(rewards).length <= 0) {
    return
  }

  const result: RewardsNotification = {
    accolades: {
      totalMissionXPRedeemed: 0,
      totalQuestXPRedeemed: 0,
    },
    rewards,
    createdAt: getDateWithDefaultFormat(),
    id: crypto.randomUUID(),
    accountId,
  }

  MainWindow.instance.webContents.send(
    ElectronAPIEventKeys.ClaimRewardsClientGlobalSyncNotification,
    [result],
  )
}

export class LlamaManager {
  static async requestBulk(accounts: Array<AccountData>) {
    await Promise.allSettled(
      accounts.map(async (account) => {
        const data = await LlamaManager.fetchAccountData(account)

        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.LlamaManagerResponseData,
          data,
        )
      }),
    )

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.LlamaManagerLoadingDone,
    )
  }

  static async fetchAccountData(
    account: AccountData,
  ): Promise<LlamaManagerAccountData> {
    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        return {
          accountId: account.accountId,
          shop: [],
          inventory: [],
          currencies: [],
          error: 'auth',
        }
      }

      try {
        await populatePrerolledOffers({
          accessToken,
          accountId: account.accountId,
        })
      } catch {
        //
      }

      const [queryProfile, mainProfile, catalog] = await Promise.all([
        getQueryProfile({
          accessToken,
          accountId: account.accountId,
        }),
        getQueryProfileMainProfile({
          accessToken,
          accountId: account.accountId,
        }),
        getCatalog({ accessToken }),
      ])

      const campaignItems =
        queryProfile.data.profileChanges[0]?.profile?.items ?? {}
      const purchaseList =
        mainProfile.data.profileChanges[0]?.profile.stats.attributes
          .daily_purchases?.purchaseList ?? {}

      const prerollByOffer = new Map<
        string,
        MCPQueryProfileProfileChangesPrerollData
      >()

      Object.values(campaignItems).forEach((item) => {
        if (isMCPQueryProfileChangesPrerollData(item)) {
          prerollByOffer.set(item.attributes.offerId, item)
        }
      })

      const shop: Array<LlamaManagerShopOffer> = []

      catalog.data.storefronts.forEach((storefront) => {
        if (
          !SHOP_STOREFRONTS.includes(
            storefront.name as (typeof SHOP_STOREFRONTS)[number],
          ) &&
          !storefront.name.toLowerCase().includes('cardpack')
        ) {
          return
        }

        storefront.catalogEntries.forEach((entry) => {
          const price = entry.prices?.[0]
          if (!price) {
            return
          }

          const purchasedToday = purchaseList[entry.offerId] ?? 0
          const dailyLimit = entry.dailyLimit ?? -1
          const remaining =
            dailyLimit > 0
              ? Math.max(dailyLimit - purchasedToday, 0)
              : null

          // Hide sold-out / unavailable shop llamas
          if (remaining === 0) {
            return
          }

          const title =
            entry.title?.trim() ||
            humanizeTemplateId(entry.devName ?? entry.offerId)

          // Skip empty / placeholder entries without a usable name
          if (!title || title === entry.offerId) {
            return
          }

          const preroll = prerollByOffer.get(entry.offerId)

          shop.push({
            offerId: entry.offerId,
            devName: entry.devName ?? '',
            title,
            storefront: storefront.name,
            displayAssetPath: entry.displayAssetPath ?? '',
            dailyLimit,
            weeklyLimit: entry.weeklyLimit ?? -1,
            monthlyLimit: entry.monthlyLimit ?? -1,
            purchasedToday,
            remaining,
            price: price.finalPrice ?? 0,
            currencyType: price.currencyType ?? 'GameItem',
            currencySubType: price.currencySubType ?? '',
            regularPrice: price.regularPrice ?? price.finalPrice ?? 0,
            isFree: (price.finalPrice ?? 0) === 0,
            isXRay: storefront.name === 'CardPackStorePreroll',
            itemGrants: (entry.itemGrants ?? []).map((grant) => ({
              templateId: grant.templateId,
              quantity: grant.quantity,
            })),
            prerollItems: (preroll?.attributes.items ?? []).map(
              (item) => ({
                itemType: item.itemType,
                quantity: item.quantity,
              }),
            ),
          })
        })
      })

      shop.sort((a, b) => {
        if (a.isFree !== b.isFree) {
          return a.isFree ? -1 : 1
        }

        return a.title.localeCompare(b.title)
      })

      const inventoryMap = new Map<string, LlamaManagerInventoryPack>()

      Object.entries(campaignItems).forEach(([itemId, item]) => {
        if (!isMCPQueryProfileChangesCardPack(item)) {
          return
        }

        // Skip empty / already consumed markers
        if ((item.quantity ?? 0) <= 0) {
          return
        }

        const isChoice = isChoicePackTemplate(item.templateId)
        const optionsFromAttributes =
          (
            item.attributes as {
              options?: Array<{ itemType?: string; quantity?: number }>
              items?: Array<{ itemType?: string; quantity?: number }>
            }
          ).options ??
          (
            item.attributes as {
              items?: Array<{ itemType?: string; quantity?: number }>
            }
          ).items ??
          []

        const choiceOptions = optionsFromAttributes
          .map((option, index) => ({
            itemType: option.itemType ?? '',
            quantity: option.quantity ?? 1,
            index,
          }))
          .filter((option) => option.itemType.length > 0)

        // Each card pack stack item is separate by itemId; keep individual stacks
        inventoryMap.set(itemId, {
          itemId,
          templateId: item.templateId,
          name: resolveResourceName(item.templateId),
          quantity: item.quantity ?? 1,
          packSource: item.attributes.pack_source,
          isChoicePack: isChoice || choiceOptions.length > 0,
          choiceOptions,
        })
      })

      const inventory = Array.from(inventoryMap.values()).sort((a, b) => {
        if (a.isChoicePack !== b.isChoicePack) {
          return a.isChoicePack ? -1 : 1
        }

        return a.name.localeCompare(b.name)
      })

      const currencies: Array<LlamaManagerCurrency> = []
      const currencyKeys = [
        'AccountResource:currency_xrayllama',
        'AccountResource:voucher_cardpack_bronze',
        'AccountResource:voucher_cardpack_jackpot',
        'AccountResource:voucher_basicpack',
        'AccountResource:currency_mtxswap',
        'Currency:MtxPurchased',
        'Currency:MtxEarned',
        'Currency:MtxGiveaway',
        'Currency:MtxPurchaseBonus',
      ]

      Object.values(campaignItems).forEach((item) => {
        if (
          item.templateId.startsWith('AccountResource:') &&
          (item.templateId.includes('currency') ||
            item.templateId.includes('voucher') ||
            item.templateId.includes('eventcurrency') ||
            item.templateId.includes('specialcurrency'))
        ) {
          currencies.push({
            templateId: item.templateId,
            quantity: item.quantity ?? 0,
            name: resolveResourceName(item.templateId),
          })
        }
      })

      Object.values(
        mainProfile.data.profileChanges[0]?.profile?.items ?? {},
      ).forEach((item) => {
        if (
          item.templateId.startsWith('Currency:') ||
          currencyKeys.includes(item.templateId)
        ) {
          currencies.push({
            templateId: item.templateId,
            quantity: item.quantity ?? 0,
            name: resolveResourceName(item.templateId),
          })
        }
      })

      // Merge duplicate currency templateIds
      const currencyMerged = Object.values(
        currencies.reduce(
          (acc, current) => {
            if (!acc[current.templateId]) {
              acc[current.templateId] = { ...current }
            } else {
              acc[current.templateId].quantity += current.quantity
            }

            return acc
          },
          {} as Record<string, LlamaManagerCurrency>,
        ),
      ).sort((a, b) => b.quantity - a.quantity)

      return {
        accountId: account.accountId,
        shop,
        inventory,
        currencies: currencyMerged,
      }
    } catch {
      return {
        accountId: account.accountId,
        shop: [],
        inventory: [],
        currencies: [],
        error: 'fetch',
      }
    }
  }

  static async purchase(request: LlamaManagerPurchaseRequest) {
    const account = AccountsManager.getAccountById(request.accountId)
    const result: LlamaManagerActionResult = {
      accountId: request.accountId,
      success: false,
      purchased: 0,
    }

    if (!account) {
      result.error = 'account'
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.LlamaManagerActionResult,
        result,
      )
      return
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        result.error = 'auth'
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.LlamaManagerActionResult,
          result,
        )
        return
      }

      const quantity = Math.max(1, Math.floor(request.quantity || 1))
      let purchased = 0
      const allRewards: Record<string, number> = {}

      for (let i = 0; i < quantity; i += 1) {
        try {
          try {
            await populatePrerolledOffers({
              accessToken,
              accountId: account.accountId,
            })
          } catch {
            //
          }

          const unitPrice =
            request.expectedTotalPrice / Math.max(request.quantity, 1)

          const response = await purchaseCatalogEntry({
            accessToken,
            accountId: account.accountId,
            offerId: request.offerId,
            currency: request.currencyType ?? 'GameItem',
            currencySubType: request.currencySubType,
            expectedTotalPrice: unitPrice,
            purchaseQuantity: 1,
          })

          purchased += 1

          const rewards = extractRewards(response.data.notifications ?? [])
          Object.entries(rewards).forEach(([itemType, qty]) => {
            allRewards[itemType] = (allRewards[itemType] ?? 0) + qty
          })
        } catch {
          break
        }
      }

      result.success = purchased > 0
      result.purchased = purchased
      result.rewards = allRewards

      if (Object.keys(allRewards).length > 0) {
        sendRewardsNotification({
          accountId: account.accountId,
          rewards: allRewards,
        })
      }

      if (purchased <= 0) {
        result.error = 'purchase'
      }
    } catch {
      result.error = 'purchase'
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.LlamaManagerActionResult,
      result,
    )

    // Refresh account data after action
    const refreshed = await LlamaManager.fetchAccountData(account)
    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.LlamaManagerResponseData,
      refreshed,
    )
  }

  static async openPacks(request: LlamaManagerOpenRequest) {
    const account = AccountsManager.getAccountById(request.accountId)
    const result: LlamaManagerActionResult = {
      accountId: request.accountId,
      success: false,
      opened: 0,
    }

    if (!account) {
      result.error = 'account'
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.LlamaManagerActionResult,
        result,
      )
      return
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        result.error = 'auth'
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.LlamaManagerActionResult,
          result,
        )
        return
      }

      const itemIds = [...new Set(request.itemIds)].filter(Boolean)
      let opened = 0
      const allRewards: Record<string, number> = {}

      for (let i = 0; i < itemIds.length; i += BATCH_OPEN_SIZE) {
        const batch = itemIds.slice(i, i + BATCH_OPEN_SIZE)

        try {
          const response = await setOpenCardPackBatch({
            accessToken,
            accountId: account.accountId,
            cardPackItemIds: batch,
          })

          opened += batch.length

          const rewards = extractRewards(response.data.notifications ?? [])
          Object.entries(rewards).forEach(([itemType, qty]) => {
            allRewards[itemType] = (allRewards[itemType] ?? 0) + qty
          })
        } catch {
          // Fallback: open one by one
          for (const itemId of batch) {
            try {
              const response = await setOpenCardPack({
                accessToken,
                accountId: account.accountId,
                cardPackItemId: itemId,
                selectionIdx: 0,
              })

              opened += 1

              const rewards = extractRewards(
                response.data.notifications ?? [],
              )
              Object.entries(rewards).forEach(([itemType, qty]) => {
                allRewards[itemType] = (allRewards[itemType] ?? 0) + qty
              })
            } catch {
              // skip failed pack
            }
          }
        }
      }

      result.success = opened > 0
      result.opened = opened
      result.rewards = allRewards

      if (Object.keys(allRewards).length > 0) {
        sendRewardsNotification({
          accountId: account.accountId,
          rewards: allRewards,
        })
      }

      if (opened <= 0) {
        result.error = 'open'
      }
    } catch {
      result.error = 'open'
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.LlamaManagerActionResult,
      result,
    )

    const refreshed = await LlamaManager.fetchAccountData(account)
    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.LlamaManagerResponseData,
      refreshed,
    )
  }

  static async openChoicePack(request: LlamaManagerOpenChoiceRequest) {
    const account = AccountsManager.getAccountById(request.accountId)
    const result: LlamaManagerActionResult = {
      accountId: request.accountId,
      success: false,
      opened: 0,
    }

    if (!account) {
      result.error = 'account'
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.LlamaManagerActionResult,
        result,
      )
      return
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        result.error = 'auth'
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.LlamaManagerActionResult,
          result,
        )
        return
      }

      const itemIds = [
        ...new Set(
          [
            ...(request.cardPackItemIds ?? []),
            request.cardPackItemId,
          ].filter((id): id is string => Boolean(id)),
        ),
      ]

      if (itemIds.length <= 0) {
        result.error = 'open-choice'
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.LlamaManagerActionResult,
          result,
        )
        return
      }

      let opened = 0
      const allRewards: Record<string, number> = {}

      for (const cardPackItemId of itemIds) {
        try {
          const response = await setOpenCardPack({
            accessToken,
            accountId: account.accountId,
            cardPackItemId,
            selectionIdx: request.selectionIdx,
          })

          opened += 1

          const rewards = extractRewards(response.data.notifications ?? [])
          Object.entries(rewards).forEach(([itemType, qty]) => {
            allRewards[itemType] = (allRewards[itemType] ?? 0) + qty
          })
        } catch {
          // skip failed pack, continue bulk
        }
      }

      result.success = opened > 0
      result.opened = opened
      result.rewards = allRewards

      if (Object.keys(allRewards).length > 0) {
        sendRewardsNotification({
          accountId: account.accountId,
          rewards: allRewards,
        })
      }

      if (opened <= 0) {
        result.error = 'open-choice'
      }
    } catch {
      result.error = 'open-choice'
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.LlamaManagerActionResult,
      result,
    )

    const refreshed = await LlamaManager.fetchAccountData(account)
    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.LlamaManagerResponseData,
      refreshed,
    )
  }
}
