import type {
  MCPCommonNotification,
  MCPCommonProfileChanges,
} from '../../types/services/mcp'
import type { AccountData, AccountDataList } from '../../types/accounts'
import type { RewardsNotification } from '../../types/notifications'

import { QuestEventRepeatable } from '../../config/constants/fortnite/quests'
import { ElectronAPIEventKeys } from '../../config/constants/main-process'

import { MainWindow } from '../startup/windows/main'
import { AccountsManager } from '../startup/accounts'
import { AutoPinUrns } from '../startup/auto-pin-urns'
import { Automation } from '../startup/automation'
import { SettingsManager } from '../startup/settings'
import { MCPClaimRewards } from './mcp/claim-rewards'
import { questRewardTitle } from '../../lib/stw/reward-names'
import { OverlayToasts } from './overlay-toasts'
import { MCPStorageTransfer } from './mcp/storage-transfer'
import { Authentication } from './authentication'

import {
  getQueryProfile,
  setSetPinnedQuests,
} from '../../services/endpoints/mcp'

import { getDateWithDefaultFormat } from '../../lib/dates'
import { enduranceWavesFromProfileItems } from '../../lib/stw/endurance-waves'

export class ClaimRewards {
  static async start(
    accounts: AccountDataList,
    useGlobalNotification?: boolean,
  ) {
    const response = await ClaimRewards.core(accounts)

    if (response) {
      MainWindow.instance.webContents.send(
        useGlobalNotification
          ? ElectronAPIEventKeys.ClaimRewardsClientGlobalSyncNotification
          : ElectronAPIEventKeys.ClaimRewardsClientNotification,
        response,
      )
    }

    MainWindow.instance.webContents.send(
      useGlobalNotification
        ? ElectronAPIEventKeys.ClaimRewardsClientGlobalAutoClaimedNotification
        : ElectronAPIEventKeys.PartyClaimActionNotification,
    )
  }

  static async core(accounts: AccountDataList) {
    if (accounts.length <= 0) {
      return null
    }

    try {
      const settings = await SettingsManager.getData()
      const claimingRewardsDelay = Number(settings.claimingRewards)

      if (claimingRewardsDelay > 0) {
        await new Promise((resolve) => {
          setTimeout(() => resolve(true), claimingRewardsDelay * 1_000)
        })
      }

      const settled = await Promise.allSettled(
        accounts.map((account) => ClaimRewards.claimAccount(account)),
      )
      const claimed = settled.flatMap((item) =>
        item.status === 'fulfilled' ? item.value : [],
      )
      const visible = claimed.filter(rewardRowVisible)

      OverlayToasts.show(visible)

      return visible.length > 0 ? visible : null

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //
    }

    return null
  }

  private static async claimAccount(
    account: AccountData,
  ): Promise<Array<RewardsNotification>> {
    const automationAccount = Automation.getAccountById(account.accountId)
    const accountToTransfer = AccountsManager.getAccountById(
      account.accountId,
    )

    if (
      automationAccount &&
      accountToTransfer &&
      automationAccount.actions.transferMats === true
    ) {
      MCPStorageTransfer.buildingMaterials(accountToTransfer).catch(
        () => {},
      )
    }

    const accessToken = await Authentication.verifyAccessToken(account)

    if (!accessToken) {
      return []
    }

    const response = await getQueryProfile({
      accessToken,
      accountId: account.accountId,
    })
    const profileChanges = response.data.profileChanges[0] ?? null
    const pendingMissionAlertRewardsTotal =
      profileChanges?.profile.stats.attributes
        .mission_alert_redemption_record?.pendingMissionAlertRewards?.items
        .length ?? 0
    const pendingDifficultyIncreaseRewardsTotal =
      profileChanges?.profile.stats.attributes
        .difficulty_increase_rewards_record?.pendingRewards.length ?? 0

    const questClaims = await MCPClaimRewards.claimQuestReward(
      response.data,
      account,
    )
    const cardPacks = await MCPClaimRewards.openCardPackBatch(
      response.data,
      account,
    )
    const missionAlerts =
      pendingMissionAlertRewardsTotal > 0
        ? await MCPClaimRewards.claimMissionAlertRewards(account)
        : []
    const difficultyRewards =
      pendingDifficultyIncreaseRewardsTotal > 0
        ? await MCPClaimRewards.claimDifficultyIncreaseRewards(account)
        : []

    for (const item of [
      ...questClaims.map((quest) => quest.response),
      ...cardPacks,
      ...missionAlerts,
      ...difficultyRewards,
    ]) {
      pinRepeatableQuests(account, item.notifications)
    }

    const accoladesResponse =
      await MCPClaimRewards.redeemSTWAccoladeTokens(account)
    const accolades = sumAccolades(accoladesResponse?.notifications)
    const eventCurrencyTemplateId =
      profileChanges?.profile.stats.attributes.event_currency?.templateId
    const createdAt = getDateWithDefaultFormat()
    const loot: Array<LootRow> = []
    const quests: NonNullable<RewardsNotification['quests']> = []

    for (const quest of questClaims) {
      loot.push(...lootFromClaim(quest.response))

      const title = questRewardTitle(quest.templateId) ?? quest.templateId

      if (title) {
        quests.push({
          questId: quest.templateId,
          title,
        })
      }
    }

    for (const claim of [
      ...cardPacks,
      ...missionAlerts,
      ...difficultyRewards,
    ]) {
      loot.push(...lootFromClaim(claim))
    }

    const row = rewardRow({
      accountId: account.accountId,
      createdAt,
      accolades,
      endurance: enduranceWavesFromProfileItems(
        profileChanges?.profile.items,
        loot.map((entry) => entry.itemType),
      ),
      quests,
      rewards: rewardsFromLoot(loot, eventCurrencyTemplateId),
    })

    return rewardRowVisible(row) ? [row] : []
  }
}

type LootRow = {
  itemType: string
  quantity: number
}

type ClaimBody = {
  notifications?: MCPCommonNotification
  profileChanges?: MCPCommonProfileChanges
}

function rewardRowVisible(row: RewardsNotification) {
  const accoladeTotal =
    (row.accolades?.totalMissionXPRedeemed ?? 0) +
    (row.accolades?.totalQuestXPRedeemed ?? 0)

  return (
    Object.keys(row.rewards).length > 0 ||
    (row.endurance?.length ?? 0) > 0 ||
    accoladeTotal > 0 ||
    (row.quests?.length ?? 0) > 0 ||
    Boolean(row.questId) ||
    Boolean(row.title)
  )
}

function rewardRow({
  accountId,
  accolades,
  createdAt,
  endurance,
  quests,
  rewards = {},
}: {
  accountId: string
  accolades?: RewardsNotification['accolades']
  createdAt: string
  endurance?: RewardsNotification['endurance']
  quests?: RewardsNotification['quests']
  rewards?: RewardsNotification['rewards']
}): RewardsNotification {
  return {
    accolades: accolades ?? {
      totalMissionXPRedeemed: 0,
      totalQuestXPRedeemed: 0,
    },
    rewards,
    endurance,
    createdAt,
    id: crypto.randomUUID(),
    accountId,
    quests: quests && quests.length > 0 ? quests : undefined,
  }
}

function sumAccolades(
  notifications: Array<{
    totalMissionXPRedeemed?: number
    totalQuestXPRedeemed?: number
  }> | undefined,
): RewardsNotification['accolades'] {
  const totals = {
    totalMissionXPRedeemed: 0,
    totalQuestXPRedeemed: 0,
  }

  notifications?.forEach((current) => {
    totals.totalMissionXPRedeemed += current.totalMissionXPRedeemed ?? 0
    totals.totalQuestXPRedeemed += current.totalQuestXPRedeemed ?? 0
  })

  return totals
}

function lootFromClaim(item: ClaimBody) {
  const rows: Array<LootRow> = []

  item.notifications?.forEach((notification) => {
    if (notification.loot?.items) {
      notification.loot.items.forEach((loot) => {
        rows.push({
          itemType: loot.itemType,
          quantity: loot.quantity,
        })
      })
    } else if (notification.loot?.lootGranted) {
      notification.loot.lootGranted.items.forEach((loot) => {
        rows.push({
          itemType: loot.itemType,
          quantity: loot.quantity,
        })
      })
    } else if (notification.lootGranted) {
      notification.lootGranted.items.forEach((loot) => {
        rows.push({
          itemType: loot.itemType,
          quantity: loot.quantity,
        })
      })
    } else if (notification.lootResult) {
      notification.lootResult.items.forEach((loot) => {
        rows.push({
          itemType: loot.itemType,
          quantity: loot.quantity,
        })
      })
    }
  })

  if (rows.length > 0) {
    return rows
  }

  item.profileChanges?.forEach((change) => {
    if (change.changeType !== 'itemAdded' || !change.item?.templateId) {
      return
    }

    const quantity = change.item.quantity || change.quantity || 0

    if (quantity <= 0) {
      return
    }

    rows.push({
      itemType: change.item.templateId,
      quantity,
    })
  })

  return rows
}

function rewardsFromLoot(
  rows: Array<LootRow>,
  eventCurrencyTemplateId?: string,
) {
  const rewards: RewardsNotification['rewards'] = {}

  rows.forEach(({ itemType, quantity }) => {
    if (!itemType || quantity <= 0) {
      return
    }

    if (itemType.toLowerCase().startsWith('accolades:')) {
      return
    }

    const rewardType =
      itemType === 'AccountResource:campaign_event_currency'
        ? eventCurrencyTemplateId ?? itemType
        : itemType

    rewards[rewardType] = (rewards[rewardType] ?? 0) + quantity
  })

  return rewards
}

function pinRepeatableQuests(
  account: AccountData,
  notifications: MCPCommonNotification | undefined,
) {
  const hasAutoPinMiniBosses = AutoPinUrns.findById(
    account.accountId,
    'mini-bosses',
  )
  const hasAutoPinUrns = AutoPinUrns.findById(account.accountId, 'urns')

  if (hasAutoPinMiniBosses !== true && hasAutoPinUrns !== true) {
    return
  }

  const pinMiniBosses = notifications?.find(
    (notification) =>
      notification.questId === QuestEventRepeatable.ExorcismByElimination,
  )
  const pinUrns = notifications?.find(
    (notification) =>
      notification.questId === QuestEventRepeatable.UrnYourKeep,
  )

  if (!pinMiniBosses && !pinUrns) {
    return
  }

  Authentication.verifyAccessToken(account)
    .then((accessToken) => {
      if (!accessToken) {
        return
      }

      getQueryProfile({
        accessToken,
        accountId: account.accountId,
      })
        .then((newQueryProfile) => {
          const newProfileChanges =
            newQueryProfile.data.profileChanges[0] ?? null
          const currentPinned =
            newProfileChanges.profile.stats.attributes.client_settings
              ?.pinnedQuestInstances ?? []
          const newItems = Object.entries(
            newProfileChanges.profile.items ?? [],
          )
            .filter(([, itemValue]) => {
              return (
                (hasAutoPinMiniBosses === true &&
                  itemValue.templateId ===
                    QuestEventRepeatable.ExorcismByElimination) ||
                (hasAutoPinUrns === true &&
                  itemValue.templateId === QuestEventRepeatable.UrnYourKeep)
              )
            })
            .map(([itemId]) => itemId)

          setSetPinnedQuests({
            accessToken,
            accountId: account.accountId,
            pinnedQuestIds: [...currentPinned, ...newItems],
          }).catch(() => {})
        })
        .catch(() => {})
    })
    .catch(() => {})
}
