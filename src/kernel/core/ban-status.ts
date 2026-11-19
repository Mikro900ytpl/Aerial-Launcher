import type { AccountData } from '../../types/accounts'
import type { BanStatusResult } from '../../state/account-management/ban-status'

import axios from 'axios'

import { ElectronAPIEventKeys } from '../../config/constants/main-process'

import { parseProfileBan } from '../../lib/stw/ban-status'
import { getQueryProfileMainProfile } from '../../services/endpoints/mcp'

import { Authentication } from './authentication'
import { MainWindow } from '../startup/windows/main'

function epicError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : 'Unknown Error'
  }

  const data = error.response?.data

  if (data && typeof data === 'object' && 'errorMessage' in data) {
    const message = (data as { errorMessage?: string }).errorMessage

    if (message) {
      return message
    }
  }

  return error.message || 'Unknown Error'
}

function emptyResult(
  account: AccountData,
  errorMessage: string,
): BanStatusResult {
  return {
    accountId: account.accountId,
    displayName: account.displayName || account.accountId,
    kind: 'error',
    permanent: false,
    reasons: [],
    startedAt: null,
    endsAt: null,
    durationDays: null,
    detail: null,
    errorMessage,
  }
}

export class BanStatus {
  static async request(accounts: Array<AccountData>) {
    const results = await Promise.all(
      accounts.map((account) => BanStatus.check(account)),
    )
    const data: Record<string, BanStatusResult> = {}

    results.forEach((result) => {
      data[result.accountId] = result
    })

    const window = MainWindow.instance

    if (!window || window.isDestroyed()) {
      return
    }

    window.webContents.send(ElectronAPIEventKeys.BanStatusResponse, data)
  }

  static async check(account: AccountData): Promise<BanStatusResult> {
    try {
      const accessToken = await Authentication.verifyAccessToken(account)

      if (!accessToken) {
        return emptyResult(account, 'Missing access token')
      }

      const response = await getQueryProfileMainProfile({
        accessToken,
        accountId: account.accountId,
      })
      const attributes = response.data.profileChanges[0]?.profile.stats
        .attributes
      const parsed = parseProfileBan(attributes)

      return {
        accountId: account.accountId,
        displayName: account.displayName || account.accountId,
        ...parsed,
        errorMessage: null,
      }
    } catch (error) {
      return emptyResult(account, epicError(error))
    }
  }
}
