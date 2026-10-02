import type { AccountData } from '../../../types/accounts'
import type { DqWeaponsAccountData } from '../../../types/dq-weapons'

import { ElectronAPIEventKeys } from '../../../config/constants/main-process'

import { MainWindow } from '../../startup/windows/main'
import { Authentication } from '../authentication'

import { getQueryProfile } from '../../../services/endpoints/mcp'
import {
  classifyDqWeapon,
  emptyKindMap,
  isLampWeapon,
  itemAlterations,
  parseSchematicRarity,
  parseSchematicStar,
  pickBetterMatch,
  schematicDisplayName,
  schematicPowerLevel,
  type DqWeaponMatch,
} from '../../../lib/stw/dq-weapons'

export class MCPDqWeapons {
  static async request(accounts: Array<AccountData>) {
    try {
      const responses = await Promise.allSettled(
        accounts.map(async (account) => {
          return MCPDqWeapons.requestAccount(account)
        })
      )

      const data = responses
        .filter((response) => response.status === 'fulfilled')
        .map((response) => response.value)

      MainWindow.instance.webContents.send(
        ElectronAPIEventKeys.DqWeaponsNotification,
        data
      )

      return
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //
    }

    MainWindow.instance.webContents.send(
      ElectronAPIEventKeys.DqWeaponsNotification,
      []
    )
  }

  private static async requestAccount(
    account: AccountData
  ): Promise<DqWeaponsAccountData> {
    const weapons = emptyKindMap()
    const result: DqWeaponsAccountData = {
      accountId: account.accountId,
      available: true,
      weapons,
      haveCount: 0,
      complete: false,
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

      Object.values(profile.items ?? {}).forEach((item) => {
        const templateId = item.templateId ?? ''
        const kind = classifyDqWeapon(templateId)

        if (!kind) {
          return
        }

        const attributes = (item.attributes ?? {}) as Record<string, unknown>
        const alterations = itemAlterations(attributes)

        if (!isLampWeapon(alterations)) {
          return
        }

        const levelRaw = attributes.level
        const level =
          typeof levelRaw === 'number'
            ? levelRaw
            : typeof levelRaw === 'string'
              ? Number.parseInt(levelRaw, 10) || 0
              : 0
        const next: DqWeaponMatch = {
          kind,
          name: schematicDisplayName(templateId),
          templateId,
          perkCount: alterations.length,
          level,
          power: schematicPowerLevel(templateId, level),
          rarity: parseSchematicRarity(templateId),
          star: parseSchematicStar(templateId, level),
          alterations,
        }
        const current = weapons[kind]

        weapons[kind] = current ? pickBetterMatch(current, next) : next
      })

      result.haveCount = Object.values(weapons).filter(Boolean).length
      result.complete = result.haveCount === 6

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
