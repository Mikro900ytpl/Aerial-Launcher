import type { AccountData } from '../../../types/accounts'
import type { DailyQuestClaimSummary } from '../../../types/daily-quests'

import { ipcRenderer } from 'electron'

import { ElectronAPIEventKeys } from '../../../config/constants/main-process'

export function setClientQuestLogin(accounts: Array<AccountData>) {
  ipcRenderer.send(ElectronAPIEventKeys.SetSaveQuests, accounts)
}

export function claimAllDailyQuests(): Promise<DailyQuestClaimSummary> {
  return ipcRenderer.invoke(ElectronAPIEventKeys.DailyQuestsClaimAll)
}

export function notificationClientQuestLogin(
  callback: (summary: DailyQuestClaimSummary) => Promise<void>
) {
  const customCallback = (
    _event: Electron.IpcRendererEvent,
    summary: DailyQuestClaimSummary,
  ) => {
    callback(summary).catch(() => {})
  }
  const rendererInstance = ipcRenderer.on(
    ElectronAPIEventKeys.SaveQuestsNotification,
    customCallback
  )

  return {
    removeListener: () =>
      rendererInstance.removeListener(
        ElectronAPIEventKeys.SaveQuestsNotification,
        customCallback
      ),
  }
}
