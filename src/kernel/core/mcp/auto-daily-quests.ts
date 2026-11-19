import type { AutoDailyQuestsConfig } from '../../../types/daily-quests'

import { ElectronAPIEventKeys } from '../../../config/constants/main-process'

import { utcDayKey } from '../../../lib/stw/shop'

import { readAppJson, writeAppJson } from '../../startup/app-json'
import { AccountsManager } from '../../startup/accounts'
import { SettingsManager } from '../../startup/settings'
import { MainWindow } from '../../startup/windows/main'

import { MCPClientQuestLogin } from './client-quest-login'
import { MCPDailyQuests } from './daily-quests'

const FILE_NAME = 'auto-daily-quests.json'

type StoredDailyQuests = {
  replaceIds: Array<string>
  day: string
  done: Record<string, string>
}

function notify(config: AutoDailyQuestsConfig) {
  const window = MainWindow.instance

  if (!window || window.isDestroyed()) {
    return
  }

  window.webContents.send(
    ElectronAPIEventKeys.AutoDailyQuestsConfigNotification,
    config,
  )
}

function sanitizeReplaceIds(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return [
    ...new Set(
      value
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim().toLowerCase())
        .filter((item) => /^daily_[a-z0-9_]+$/.test(item)),
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

function signatureOf(replaceIds: Array<string>) {
  return [...replaceIds].sort().join('|')
}

function toPublic(stored: StoredDailyQuests): AutoDailyQuestsConfig {
  const today = utcDayKey()
  const signature = signatureOf(stored.replaceIds)
  const done = stored.day === today ? stored.done : {}

  return {
    replaceIds: stored.replaceIds,
    day: stored.day === today ? today : '',
    doneAccountIds: Object.entries(done)
      .filter(([, value]) => value === signature)
      .map(([accountId]) => accountId),
  }
}

export class AutoDailyQuests {
  private static chain: Promise<void> = Promise.resolve()

  private static enqueue(task: () => Promise<void>) {
    AutoDailyQuests.chain = AutoDailyQuests.chain.then(task, task)

    return AutoDailyQuests.chain
  }

  static kick(options?: { forceEnabled?: boolean }) {
    return AutoDailyQuests.enqueue(() => AutoDailyQuests.run(options))
  }

  static async publish() {
    const config = toPublic(await AutoDailyQuests.read())

    notify(config)

    return config
  }

  static saveReplaceIds(replaceIds: Array<string>) {
    return AutoDailyQuests.enqueue(async () => {
      const current = await AutoDailyQuests.read()
      const next: StoredDailyQuests = {
        ...current,
        replaceIds: sanitizeReplaceIds(replaceIds),
      }

      await writeAppJson(FILE_NAME, next)
      notify(toPublic(next))
    })
  }

  private static async read(): Promise<StoredDailyQuests> {
    const stored = await readAppJson(FILE_NAME, {
      replaceIds: [],
      day: '',
      done: {},
      doneAccountIds: [],
    })
    const replaceIds = sanitizeReplaceIds(stored.replaceIds)
    let done = sanitizeDone(stored.done)

    if (
      Object.keys(done).length === 0 &&
      Array.isArray(stored.doneAccountIds)
    ) {
      const signature = signatureOf(replaceIds)

      stored.doneAccountIds.forEach((accountId) => {
        if (typeof accountId === 'string' && accountId) {
          done[accountId] = signature
        }
      })
    }

    return {
      replaceIds,
      day: typeof stored.day === 'string' ? stored.day : '',
      done,
    }
  }

  private static async run(options?: { forceEnabled?: boolean }) {
    await Promise.race([
      AccountsManager.waitUntilLoaded(),
      new Promise((resolve) => setTimeout(resolve, 20_000)),
    ])

    const settings = await SettingsManager.getData()

    if (!options?.forceEnabled && !settings.autoDailyQuests) {
      return
    }

    const accounts = [...AccountsManager.getAccounts().values()]

    if (accounts.length === 0) {
      return
    }

    const today = utcDayKey()
    const state = await AutoDailyQuests.read()
    const replaceIds = state.replaceIds
    const signature = signatureOf(replaceIds)
    const done = state.day === today ? { ...state.done } : {}
    const pending = accounts.filter(
      (account) => done[account.accountId] !== signature,
    )

    const failures: Array<{
      accountId: string
      displayName: string
      errorMessage: string
    }> = []
    let claimed = 0

    for (const account of pending) {
      const result = await MCPDailyQuests.loginAndReplace(
        account,
        new Set(replaceIds),
      )

      if (!result.ok) {
        failures.push({
          accountId: account.accountId,
          displayName: account.displayName || account.accountId,
          errorMessage: result.errorMessage ?? 'Unknown Error',
        })
        continue
      }

      claimed += 1
      done[account.accountId] = signature

      await writeAppJson(FILE_NAME, {
        replaceIds,
        day: today,
        done,
      } satisfies StoredDailyQuests)
    }

    if (pending.length > 0) {
      MCPClientQuestLogin.publish({
        ok: claimed,
        total: pending.length,
        failures,
      })
    }

    notify(toPublic(await AutoDailyQuests.read()))
  }
}
