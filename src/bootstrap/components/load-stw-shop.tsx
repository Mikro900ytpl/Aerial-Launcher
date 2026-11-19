import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { toast } from '../../lib/notifications'
import { useStwShopStore } from '../../state/stw-operations/stw-shop'

export function LoadStwShop() {
  const { t } = useTranslation(['stw-operations'])

  useEffect(() => {
    const configListener = window.electronAPI.notificationStwShopConfig(
      async (config) => {
        useStwShopStore.getState().setConfig(config)
      },
    )
    const loadListener = window.electronAPI.notificationStwShopLoad(
      async (result) => {
        const store = useStwShopStore.getState()

        store.setLoadResult(result)
        store.setLoading(false)

        if (result.errorMessage) {
          toast(result.errorMessage)
        }
      },
    )
    const buyListener = window.electronAPI.notificationStwShopBuy(
      async (result) => {
        const store = useStwShopStore.getState()

        store.setBuyingKey(null)

        if (result.account) {
          store.patchAccount(result.account)
        }

        if (result.success) {
          toast(
            t('stw-shop.notifications.bought', {
              count: result.purchased,
            }),
          )

          return
        }

        toast(result.errorMessage ?? t('stw-shop.notifications.failed'))
      },
    )
    const autoListener = window.electronAPI.notificationStwShopAuto(
      async (result) => {
        useStwShopStore.getState().setAutoRunning(false)

        if (result.errors[0]) {
          toast(result.errors[0])
        }

        if (result.bought > 0 || result.errors.length === 0) {
          toast(
            t('stw-shop.notifications.auto', {
              bought: result.bought,
              accounts: result.accounts,
            }),
          )
        }
      },
    )

    window.electronAPI.requestStwShopConfig()

    return () => {
      configListener.removeListener()
      loadListener.removeListener()
      buyListener.removeListener()
      autoListener.removeListener()
    }
  }, [t])

  return null
}
