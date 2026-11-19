import type { AccountData } from '../../types/accounts'
import type {
  StwShopAutoResult,
  StwShopBuyResult,
  StwShopConfig,
  StwShopLoadResult,
  StwShopSavedItem,
} from '../../types/stw-shop'

import { ipcRenderer } from 'electron'

import { ElectronAPIEventKeys } from '../../config/constants/main-process'

import { createElectronNotification } from '../../lib/electron-notifications'

export function requestStwShopConfig() {
  ipcRenderer.send(ElectronAPIEventKeys.StwShopConfigRequest)
}

export function saveStwShopConfig(config: {
  enabled?: boolean
  accountIds?: Array<string>
  items?: Array<StwShopSavedItem>
}) {
  ipcRenderer.send(ElectronAPIEventKeys.StwShopConfigSave, config)
}

export function requestStwShop(accounts: Array<AccountData>) {
  ipcRenderer.send(ElectronAPIEventKeys.StwShopLoadRequest, accounts)
}

export function buyStwShopOffer(
  account: AccountData,
  offerId: string,
  quantity: number,
) {
  ipcRenderer.send(ElectronAPIEventKeys.StwShopBuyRequest, {
    account,
    offerId,
    quantity,
  })
}

export function runStwShopAuto(force = false) {
  ipcRenderer.send(ElectronAPIEventKeys.StwShopAutoRun, force)
}

export const notificationStwShopConfig = createElectronNotification<
  [StwShopConfig]
>({
  key: ElectronAPIEventKeys.StwShopConfigNotification,
})

export const notificationStwShopLoad = createElectronNotification<
  [StwShopLoadResult]
>({
  key: ElectronAPIEventKeys.StwShopLoadNotification,
})

export const notificationStwShopBuy = createElectronNotification<
  [StwShopBuyResult]
>({
  key: ElectronAPIEventKeys.StwShopBuyNotification,
})

export const notificationStwShopAuto = createElectronNotification<
  [StwShopAutoResult]
>({
  key: ElectronAPIEventKeys.StwShopAutoNotification,
})
