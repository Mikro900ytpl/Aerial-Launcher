import type { AccountData } from '../../../types/accounts'
import type {
  DailyQuest,
  DailyQuestRerollResponse,
  DailyQuestsAccountData,
} from '../../../types/daily-quests'
import type { MCPQueryProfileChanges } from '../../../types/services/mcp'

import { ElectronAPIEventKeys } from '../../../config/constants/main-process'

import { MainWindow } from '../../startup/windows/main'
import { Authentication } from '../authentication'

import { MCPClientQuestLogin } from './client-quest-login'

import {
  getQueryProfile,
  setFortRerollDailyQuest,
} from '../../../services/endpoints/mcp'

import { isMCPQueryProfileChangesQuest } from '../../../lib/check-objects'

const dailyQuestPrefix = 'quest:daily_'

export class MCPDailyQuests {
  static async request(accounts: Array<AccountData>) {
    try {
      const responses = await Promise.allSettled(
        accounts.map(async (account) => {
          return MCPDailyQuests.requestAccount(account)
        }),
      )

      const data = responses
        .filter((response) => response.status === 'fulfilled')
        .map((response) => response.value)

      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.DailyQuestsNotification,
        data,
      )

      return

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.DailyQuestsNotification,
      [],
    )
  }

  static async reroll(account: AccountData, questId: string) {
    const response: DailyQuestRerollResponse = {
      accountId: account.accountId,
      success: false,
      errorMessage: 'Unknown Error',
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.DailyQuestRerollNotification,
          response,
        )

        return
      }

      await setFortRerollDailyQuest({
        accessToken,
        accountId: account.accountId,
        questId,
      })

      const profileResponse = await getQueryProfile({
        accessToken,
        accountId: account.accountId,
      })
      const profile =
        profileResponse.data.profileChanges?.[0]?.profile ?? null

      if (!profile) {
        MainWindow.instance.webContents.send(
          ElectronAPIEventKeys.DailyQuestRerollNotification,
          response,
        )

        return
      }

      const quests = parseDailyQuests(profile)
      const rerolls =
        profile.stats?.attributes?.quest_manager?.dailyQuestRerolls ?? 0

      const data: DailyQuestsAccountData = {
        accountId: account.accountId,
        available: true,
        rerolls,
        quests,
      }

      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.DailyQuestRerollNotification,
        {
          accountId: account.accountId,
          success: true,
          errorMessage: null,
          data,
        } as DailyQuestRerollResponse,
      )

      return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.data?.errorMessage) {
        response.errorMessage =
          error.response?.data?.errorMessage ?? 'Unknown Error'
      }
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.DailyQuestRerollNotification,
      response,
    )
  }

  static async loginAndReplace(
    account: AccountData,
    replaceIds: Set<string>,
  ): Promise<{ ok: boolean; errorMessage?: string }> {
    const claimed = await MCPClientQuestLogin.claimAccount(account)

    if (!claimed.ok) {
      return {
        ok: false,
        errorMessage: claimed.errorMessage ?? 'Unknown Error',
      }
    }

    const accessToken = await Authentication.verifyAccessToken(account)

    if (!accessToken) {
      return { ok: true }
    }

    if (replaceIds.size === 0) {
      return { ok: true }
    }

    for (let attempt = 0; attempt < 5; attempt += 1) {
      let profile: Awaited<
        ReturnType<typeof getQueryProfile>
      >['data']['profileChanges'][0]['profile'] | null = null

      try {
        const profileResponse = await getQueryProfile({
          accessToken,
          accountId: account.accountId,
        })

        profile = profileResponse.data.profileChanges?.[0]?.profile ?? null
      } catch {
        return { ok: true }
      }

      if (!profile) {
        return { ok: true }
      }

      const rerolls =
        profile.stats?.attributes?.quest_manager?.dailyQuestRerolls ?? 0
      const target = parseDailyQuests(profile).find((quest) =>
        replaceIds.has(dailyQuestKey(quest.templateId)),
      )

      if (!target || rerolls <= 0) {
        return { ok: true }
      }

      try {
        await setFortRerollDailyQuest({
          accessToken,
          accountId: account.accountId,
          questId: target.questId,
        })
      } catch {
        return { ok: true }
      }
    }

    return { ok: true }
  }

  private static async requestAccount(
    account: AccountData,
  ): Promise<DailyQuestsAccountData> {
    const result: DailyQuestsAccountData = {
      accountId: account.accountId,
      available: true,
      rerolls: 0,
      quests: [],
    }

    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        result.available = false
        result.errorMessage = 'Unknown Error'

        return result
      }

      const profileResponse = await getQueryProfile({
        accessToken,
        accountId: account.accountId,
      })

      const profile =
        profileResponse.data.profileChanges?.[0]?.profile ?? null

      if (!profile) {
        result.available = false
        result.errorMessage = 'Unknown Error'

        return result
      }

      result.quests = parseDailyQuests(profile)
      result.rerolls =
        profile.stats?.attributes?.quest_manager?.dailyQuestRerolls ?? 0

      return result

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      result.available = false
      result.errorMessage =
        error?.response?.data?.errorMessage ?? 'Unknown Error'
    }

    return result
  }
}

function dailyQuestKey(templateId: string) {
  return templateId.replace(/^Quest:/i, '').trim().toLowerCase()
}

function parseDailyQuests(
  profile: MCPQueryProfileChanges['profile'],
): Array<DailyQuest> {
  const items = Object.entries(profile?.items ?? {})
  const quests: Array<DailyQuest> = []

  items.forEach(([id, item]) => {
    if (!isMCPQueryProfileChangesQuest(item)) {
      return
    }

    const templateId = item.templateId ?? ''

    if (!templateId.toLowerCase().startsWith(dailyQuestPrefix)) {
      return
    }

    const attributes = item.attributes as Record<string, unknown>
    const questState = `${attributes.quest_state ?? ''}`

    if (questState.toLowerCase() !== 'active') {
      return
    }

    const progress = parseDailyQuestProgress(attributes)

    quests.push({
      questId: id,
      templateId,
      name: formatQuestName(templateId),
      state: questState,
      progress,
    })
  })

  return quests
}

function parseDailyQuestProgress(
  attributes: Record<string, unknown>,
): number {
  return Object.entries(attributes)
    .filter(
      ([key, value]) =>
        key.startsWith('completion_') && typeof value === 'number',
    )
    .reduce((accumulator, [, value]) => {
      accumulator += value as number

      return accumulator
    }, 0)
}

function formatQuestName(templateId: string) {
  const cleaned = templateId
    .replace(/^Quest:/i, '')
    .replace(/^Daily_/i, '')
    .replace(/_/g, ' ')
    .trim()

  if (!cleaned) {
    return templateId
  }

  return toTitleCase(cleaned)
}

// function formatObjectiveLabel(value: string) {
//   const cleaned = value
//     .replace(/^completion_/i, '')
//     .replace(/_/g, ' ')
//     .trim()

//   if (!cleaned) {
//     return value
//   }

//   return toTitleCase(cleaned)
// }

function toTitleCase(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
