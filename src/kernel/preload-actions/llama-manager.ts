import type { AccountData } from '../../types/accounts'
import type {
  LlamaManagerAccountData,
  LlamaManagerActionResult,
  LlamaManagerOpenChoiceRequest,
  LlamaManagerOpenRequest,
  LlamaManagerPurchaseRequest,
} from '../../types/llama-manager'

import { ipcRenderer } from 'electron'

import { ElectronAPIEventKeys } from '../../config/constants/main-process'

import { createElectronNotification } from '../../lib/electron-notifications'

export function llamaManagerRequestData(accounts: Array<AccountData>) {
  ipcRenderer.send(ElectronAPIEventKeys.LlamaManagerRequestData, accounts)
}

export function llamaManagerPurchase(data: LlamaManagerPurchaseRequest) {
  ipcRenderer.send(ElectronAPIEventKeys.LlamaManagerPurchase, data)
}

export function llamaManagerOpenPacks(data: LlamaManagerOpenRequest) {
  ipcRenderer.send(ElectronAPIEventKeys.LlamaManagerOpenPacks, data)
}

export function llamaManagerOpenChoice(data: LlamaManagerOpenChoiceRequest) {
  ipcRenderer.send(ElectronAPIEventKeys.LlamaManagerOpenChoice, data)
}

export const llamaManagerResponseData = createElectronNotification<
  [LlamaManagerAccountData]
>({
  key: ElectronAPIEventKeys.LlamaManagerResponseData,
})

export const llamaManagerLoadingDone = createElectronNotification<[]>(
  {
    key: ElectronAPIEventKeys.LlamaManagerLoadingDone,
  },
)

export const llamaManagerActionResult = createElectronNotification<
  [LlamaManagerActionResult]
>({
  key: ElectronAPIEventKeys.LlamaManagerActionResult,
})
