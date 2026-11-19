import type { AccountData } from '../../../types/accounts'
import type { DailyQuestClaimSummary } from '../../../types/daily-quests'

import { ElectronAPIEventKeys } from '../../../config/constants/main-process'

import { getFortnitePcAccessToken } from '../../../lib/epic/mcp-game'
import { MainWindow } from '../../startup/windows/main'

import { setClientQuestLogin } from '../../../services/endpoints/mcp'

function errorMessage(error: unknown) {
  const data = (
    error as {
      response?: { data?: { errorMessage?: string } }
    }
  )?.response?.data

  if (data?.errorMessage) {
    return data.errorMessage
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Unknown Error'
}

export class MCPClientQuestLogin {
  static async claimAccount(account: AccountData) {
    const displayName = account.displayName || account.accountId

    try {
      if (!account.deviceId || !account.secret) {
        return {
          accountId: account.accountId,
          displayName,
          ok: false,
          errorMessage: 'Missing device auth',
        }
      }

      const accessToken = await getFortnitePcAccessToken(account)

      await setClientQuestLogin({
        accessToken,
        accountId: account.accountId,
      })

      return {
        accountId: account.accountId,
        displayName,
        ok: true,
      }
    } catch (error) {
      return {
        accountId: account.accountId,
        displayName,
        ok: false,
        errorMessage: errorMessage(error),
      }
    }
  }

  static async claim(accounts: Array<AccountData>): Promise<DailyQuestClaimSummary> {
    const results = []

    for (const account of accounts) {
      results.push(await MCPClientQuestLogin.claimAccount(account))
    }

    return {
      ok: results.filter((result) => result.ok).length,
      total: results.length,
      failures: results
        .filter((result) => !result.ok)
        .map((result) => ({
          accountId: result.accountId,
          displayName: result.displayName,
          errorMessage: result.errorMessage ?? 'Unknown Error',
        })),
    }
  }

  static publish(summary: DailyQuestClaimSummary) {
    const window = MainWindow.instance

    if (!window || window.isDestroyed()) {
      return
    }

    window.webContents.send(
      ElectronAPIEventKeys.SaveQuestsNotification,
      summary,
    )
  }

  static async save(accounts: Array<AccountData>) {
    const summary = await MCPClientQuestLogin.claim(accounts)

    MCPClientQuestLogin.publish(summary)

    return summary
  }
}
