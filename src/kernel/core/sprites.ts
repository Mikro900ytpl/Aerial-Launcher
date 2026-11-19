import type { AccountData } from '../../types/accounts'
import type {
  SpriteCheckResult,
  SpriteScope,
} from '../../lib/fortnite/sprites'

import axios from 'axios'

import { fortnitePCGameClient } from '../../config/fortnite/clients'
import { ElectronAPIEventKeys } from '../../config/constants/main-process'

import {
  buildSpriteReports,
  spriteModuleFilters,
} from '../../lib/fortnite/sprites'
import { getFortnitePcAccessToken } from '../../lib/epic/mcp-game'

import { MainWindow } from '../startup/windows/main'

const DEPLOYMENT_ID = '62a9473a2dca46b29ccf17577fcf42d7'

function errorResult(account: AccountData, errorMessage: string): SpriteCheckResult {
  return {
    accountId: account.accountId,
    displayName: account.displayName || account.accountId,
    errorMessage,
    seasons: [],
  }
}

function serviceError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : 'Unknown Error'
  }

  const data = error.response?.data

  if (data && typeof data === 'object') {
    const record = data as {
      errorMessage?: string
      error_description?: string
      message?: string
    }
    const message =
      record.errorMessage || record.error_description || record.message

    if (message) {
      return message
    }
  }

  return error.message || 'Unknown Error'
}

export class Sprites {
  static async request(accounts: Array<AccountData>, scope: SpriteScope) {
    const results = await Promise.all(
      accounts.map((account) => Sprites.check(account, scope)),
    )
    const data: Record<string, SpriteCheckResult> = {}

    results.forEach((result) => {
      data[result.accountId] = result
    })

    const window = MainWindow.instance

    if (!window || window.isDestroyed()) {
      return
    }

    window.webContents.send(ElectronAPIEventKeys.SpritesResponse, data)
  }

  static async check(
    account: AccountData,
    scope: SpriteScope,
  ): Promise<SpriteCheckResult> {
    try {
      if (!account.deviceId || !account.secret) {
        return errorResult(account, 'Missing device auth')
      }

      const pcToken = await getFortnitePcAccessToken(account)
      const eosToken = await eosUserToken(pcToken)
      const modules = await relicInventory(account.accountId, eosToken, scope)

      return {
        accountId: account.accountId,
        displayName: account.displayName || account.accountId,
        errorMessage: null,
        seasons: buildSpriteReports(modules, scope),
      }
    } catch (error) {
      return errorResult(account, serviceError(error))
    }
  }
}

async function eosUserToken(pcToken: string) {
  const body = new URLSearchParams({
    deployment_id: DEPLOYMENT_ID,
    external_auth_token: pcToken,
    external_auth_type: 'epicgames_access_token',
    grant_type: 'external_auth',
    nonce: crypto.randomUUID().replace(/-/g, ''),
  })
  const response = await axios.post<{ access_token?: string }>(
    'https://api.epicgames.dev/auth/v1/oauth/token',
    body.toString(),
    {
      headers: {
        Authorization: `basic ${fortnitePCGameClient.auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 20000,
    },
  )
  const token = response.data.access_token

  if (!token) {
    throw new Error('Missing sprite token')
  }

  return token
}

async function relicInventory(
  accountId: string,
  eosToken: string,
  scope: SpriteScope,
) {
  const response = await axios.get(
    `https://gc.svc.live.fngw.ol.epicgames.com/api/magpie/v2/deployment/${DEPLOYMENT_ID}/domain/FN1/account/${encodeURIComponent(accountId)}/workspace/default/linkMode/live/inventory`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${eosToken}`,
      },
      params: {
        includeMetadata: true,
        moduleFilters: spriteModuleFilters(scope),
      },
      timeout: 20000,
    },
  )

  return modulesFromBody(response.data)
}

function modulesFromBody(body: unknown) {
  if (Array.isArray(body)) {
    return body
  }

  if (body && typeof body === 'object' && 'inventory' in body) {
    const inventory = (body as { inventory?: unknown }).inventory

    if (Array.isArray(inventory)) {
      return inventory
    }
  }

  return []
}
