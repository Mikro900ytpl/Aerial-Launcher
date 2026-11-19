import type { IpcRendererEvent } from 'electron'
import type { AccountData } from '../../types/accounts'
import type { SpriteScope } from '../../lib/fortnite/sprites'
import type { SpritesState } from '../../state/account-management/sprites'

import { ipcRenderer } from 'electron'

import { ElectronAPIEventKeys } from '../../config/constants/main-process'

export function requestSprites(
  accounts: Array<AccountData>,
  scope: SpriteScope,
) {
  ipcRenderer.send(ElectronAPIEventKeys.SpritesRequest, accounts, scope)
}

export function notificationSprites(
  callback: (value: SpritesState['data']) => Promise<void>,
) {
  const customCallback = (_: IpcRendererEvent, value: SpritesState['data']) => {
    callback(value).catch(() => {})
  }
  const rendererInstance = ipcRenderer.on(
    ElectronAPIEventKeys.SpritesResponse,
    customCallback,
  )

  return {
    removeListener: () =>
      rendererInstance.removeListener(
        ElectronAPIEventKeys.SpritesResponse,
        customCallback,
      ),
  }
}
