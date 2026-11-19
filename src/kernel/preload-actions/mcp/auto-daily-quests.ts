import type { AutoDailyQuestsConfig } from '../../../types/daily-quests'

import { ipcRenderer } from 'electron'

import { ElectronAPIEventKeys } from '../../../config/constants/main-process'

import { createElectronNotification } from '../../../lib/electron-notifications'

export function requestAutoDailyQuestsConfig() {
  ipcRenderer.send(ElectronAPIEventKeys.AutoDailyQuestsConfigRequest)
}

export function saveAutoDailyQuestReplaceIds(replaceIds: Array<string>) {
  ipcRenderer.send(ElectronAPIEventKeys.AutoDailyQuestsConfigSave, replaceIds)
}

export function runAutoDailyQuests() {
  ipcRenderer.send(ElectronAPIEventKeys.AutoDailyQuestsRun)
}

export const notificationAutoDailyQuestsConfig =
  createElectronNotification<[AutoDailyQuestsConfig]>({
    key: ElectronAPIEventKeys.AutoDailyQuestsConfigNotification,
  })
