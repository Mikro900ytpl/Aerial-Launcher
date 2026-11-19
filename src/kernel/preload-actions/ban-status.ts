import type { IpcRendererEvent } from 'electron'
import type { AccountData } from '../../types/accounts'
import type { BanStatusState } from '../../state/account-management/ban-status'

import { ipcRenderer } from 'electron'

import { ElectronAPIEventKeys } from '../../config/constants/main-process'

export function requestBanStatus(accounts: Array<AccountData>) {
  ipcRenderer.send(ElectronAPIEventKeys.BanStatusRequest, accounts)
}

export function notificationBanStatus(
  callback: (value: BanStatusState['data']) => Promise<void>,
) {
  const customCallback = (
    _: IpcRendererEvent,
    value: BanStatusState['data'],
  ) => {
    callback(value).catch(() => {})
  }
  const rendererInstance = ipcRenderer.on(
    ElectronAPIEventKeys.BanStatusResponse,
    customCallback,
  )

  return {
    removeListener: () =>
      rendererInstance.removeListener(
        ElectronAPIEventKeys.BanStatusResponse,
        customCallback,
      ),
  }
}
