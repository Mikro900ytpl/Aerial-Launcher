import type { AccountData } from '../../types/accounts'
import type {
  CollectionBookAccountData,
  CollectionBookActionResult,
  CollectionBookItem,
  CollectionBookSection,
  CollectionBookSectionId,
  CollectionBookSlotRequest,
  CollectionBookUpgradeRequest,
} from '../../types/collection-book'

import {
  COLLECTION_BOOK_SECTIONS,
  classifySection,
  getMaxLevelForItem,
  parseStarTier,
  rarityFromTemplate,
} from '../../config/constants/collection-book'
import { ElectronAPIEventKeys } from '../../config/constants/main-process'
import { rarities } from '../../config/constants/resources'

import { Authentication } from './authentication'
import { MainWindow } from '../startup/windows/main'
import { AccountsManager } from '../startup/accounts'

import {
  getQueryProfile,
  setSlotItemIntoCollectionBook,
  setUpgradeItem,
} from '../../services/endpoints/mcp'

import { parseResource } from '../../lib/parsers/resources'
import { sleep } from '../../lib/timers'

const UPGRADABLE_PREFIXES = [
  'Hero:',
  'Schematic:',
  'Defender:',
  'Worker:',
] as const

function humanizeTemplate(templateId: string) {
  return templateId
    .replace(/^(Hero|Schematic|Defender|Worker):/i, '')
    .replace(/_/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function buildSections(
  items: Array<CollectionBookItem>,
): Array<CollectionBookSection> {
  const bySection = new Map<CollectionBookSectionId, CollectionBookItem[]>()

  items.forEach((item) => {
    const list = bySection.get(item.sectionId) ?? []
    list.push(item)
    bySection.set(item.sectionId, list)
  })

  return COLLECTION_BOOK_SECTIONS.map((section) => {
    const sectionItems = (bySection.get(section.id) ?? []).sort(
      (a, b) => a.level - b.level || a.name.localeCompare(b.name),
    )

    return {
      id: section.id,
      itemCount: sectionItems.length,
      belowTarget: sectionItems.filter((item) => item.level < item.maxLevel)
        .length,
      items: sectionItems,
    }
  }).filter((section) => section.itemCount > 0)
}

export class CollectionBookManager {
  static async requestBulk(accounts: Array<AccountData>) {
    await Promise.allSettled(
      accounts.map(async (account) => {
        const data = await CollectionBookManager.fetchAccountData(account)
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.CollectionBookResponseData,
          data,
        )
      }),
    )

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.CollectionBookLoadingDone,
    )
  }

  static async fetchAccountData(
    account: AccountData,
  ): Promise<CollectionBookAccountData> {
    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        return {
          accountId: account.accountId,
          collectionBookLevel: 0,
          accountLevel: 0,
          accountXp: 0,
          items: [],
          sections: [],
          error: 'auth',
        }
      }

      const queryProfile = await getQueryProfile({
        accessToken,
        accountId: account.accountId,
      })

      const profile = queryProfile.data.profileChanges[0]?.profile
      const stats = profile?.stats?.attributes
      const campaignItems = profile?.items ?? {}

      const items: Array<CollectionBookItem> = []

      Object.entries(campaignItems).forEach(([itemId, item]) => {
        const templateId = item.templateId ?? ''
        const isUpgradable = UPGRADABLE_PREFIXES.some((prefix) =>
          templateId.startsWith(prefix),
        )

        if (!isUpgradable) {
          return
        }

        const attributes = (item.attributes ?? {}) as {
          level?: number
          max_level_bonus?: number
          favorite?: boolean
          // some slotted markers
          bIsInInventory?: boolean
        }

        const level = attributes.level ?? 1
        const maxLevelBonus = attributes.max_level_bonus ?? 0
        const maxLevel = getMaxLevelForItem(templateId, maxLevelBonus)
        const starTier = parseStarTier(templateId)
        const rarity = rarityFromTemplate(templateId)
        const sectionId = classifySection(templateId)
        const parsed = parseResource({
          key: templateId,
          quantity: 1,
        })

        let type: CollectionBookItem['type'] = 'other'
        if (templateId.startsWith('Hero:')) type = 'hero'
        else if (templateId.startsWith('Schematic:')) type = 'schematic'
        else if (templateId.startsWith('Defender:')) type = 'defender'
        else if (templateId.startsWith('Worker:')) type = 'worker'

        items.push({
          itemId,
          templateId,
          name: parsed.name || humanizeTemplate(templateId),
          type,
          sectionId,
          level,
          maxLevel,
          starTier,
          rarity: rarities[rarity],
          favorite: attributes.favorite === true,
          isSlotted: false,
          imageUrl: parsed.imgUrl,
        })
      })

      items.sort(
        (a, b) =>
          a.sectionId.localeCompare(b.sectionId) ||
          a.level - b.level ||
          a.name.localeCompare(b.name),
      )

      return {
        accountId: account.accountId,
        collectionBookLevel: stats?.collection_book?.maxBookXpLevelAchieved ?? 0,
        accountLevel: stats?.level ?? 0,
        accountXp: stats?.xp ?? 0,
        items,
        sections: buildSections(items),
      }
    } catch {
      return {
        accountId: account.accountId,
        collectionBookLevel: 0,
        accountLevel: 0,
        accountXp: 0,
        items: [],
        sections: [],
        error: 'fetch',
      }
    }
  }

  static async upgrade(request: CollectionBookUpgradeRequest) {
    const account = AccountsManager.getAccountById(request.accountId)
    const result: CollectionBookActionResult = {
      accountId: request.accountId,
      success: false,
      upgraded: 0,
      skipped: 0,
      failed: 0,
    }

    if (!account) {
      result.error = 'account'
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.CollectionBookActionResult,
        result,
      )
      return
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        result.error = 'auth'
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.CollectionBookActionResult,
          result,
        )
        return
      }

      const snapshot = await CollectionBookManager.fetchAccountData(account)
      const targetLevel = Math.max(
        1,
        Math.min(60, Math.floor(request.targetLevel || 1)),
      )

      let candidates = snapshot.items

      if (request.itemIds && request.itemIds.length > 0) {
        const set = new Set(request.itemIds)
        candidates = candidates.filter((item) => set.has(item.itemId))
      } else if (
        request.sectionId &&
        request.sectionId !== 'all'
      ) {
        candidates = candidates.filter(
          (item) => item.sectionId === request.sectionId,
        )
      }

      // Only items below target and below their own max
      candidates = candidates.filter(
        (item) =>
          item.level < targetLevel && item.level < item.maxLevel,
      )

      let upgraded = 0
      let skipped = snapshot.items.length - candidates.length
      let failed = 0

      for (const item of candidates) {
        const goal = Math.min(targetLevel, item.maxLevel)
        let currentLevel = item.level
        let itemFailed = false

        while (currentLevel < goal) {
          try {
            await setUpgradeItem({
              accessToken,
              accountId: account.accountId,
              targetItemId: item.itemId,
            })
            currentLevel += 1
            upgraded += 1

            // small delay to avoid rate limits on bulk
            if (upgraded % 25 === 0) {
              await sleep(0.15)
            }
          } catch {
            itemFailed = true
            failed += 1
            break
          }
        }

        if (itemFailed) {
          // continue with next item
        }
      }

      result.success = upgraded > 0
      result.upgraded = upgraded
      result.skipped = skipped
      result.failed = failed

      if (upgraded <= 0 && failed <= 0) {
        result.error = 'nothing'
      } else if (upgraded <= 0) {
        result.error = 'upgrade'
      }
    } catch {
      result.error = 'upgrade'
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.CollectionBookActionResult,
      result,
    )

    const refreshed = await CollectionBookManager.fetchAccountData(account)
    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.CollectionBookResponseData,
      refreshed,
    )
  }

  static async slotItems(request: CollectionBookSlotRequest) {
    const account = AccountsManager.getAccountById(request.accountId)
    const result: CollectionBookActionResult = {
      accountId: request.accountId,
      success: false,
      slotted: 0,
      failed: 0,
    }

    if (!account) {
      result.error = 'account'
      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.CollectionBookActionResult,
        result,
      )
      return
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        result.error = 'auth'
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.CollectionBookActionResult,
          result,
        )
        return
      }

      let slotted = 0
      let failed = 0

      for (const itemId of request.itemIds) {
        try {
          await setSlotItemIntoCollectionBook({
            accessToken,
            accountId: account.accountId,
            itemId,
          })
          slotted += 1
        } catch {
          failed += 1
        }
      }

      result.success = slotted > 0
      result.slotted = slotted
      result.failed = failed

      if (slotted <= 0) {
        result.error = 'slot'
      }
    } catch {
      result.error = 'slot'
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.CollectionBookActionResult,
      result,
    )

    const refreshed = await CollectionBookManager.fetchAccountData(account)
    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.CollectionBookResponseData,
      refreshed,
    )
  }
}
