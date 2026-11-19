import type { SelectOption } from '../../../components/ui/third-party/extended/input-tags'

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useShallow } from 'zustand/react/shallow'

import { useAccountSelectorData } from '../../../components/selectors/accounts/hooks'

import { useGetAccounts } from '../../../hooks/accounts'
import { toast } from '../../../lib/notifications'
import { shopItemName } from '../../../lib/stw/shop-display'
import { useStwShopStore } from '../../../state/stw-operations/stw-shop'

export function useStwShopData() {
  const { t } = useTranslation(['stw-operations', 'general'])
  const { accountList } = useGetAccounts()
  const {
    offers,
    accounts: shopAccounts,
    resetAt,
    isLoading,
    buyingKey,
    shopAccountIds,
    shopTagIds,
  } = useStwShopStore(
    useShallow((state) => ({
      offers: state.offers,
      accounts: state.accounts,
      resetAt: state.resetAt,
      isLoading: state.isLoading,
      buyingKey: state.buyingKey,
      shopAccountIds: state.shopAccountIds,
      shopTagIds: state.shopTagIds,
    })),
  )
  const updateShopAccounts = useStwShopStore((state) => state.updateShopAccounts)
  const updateShopTags = useStwShopStore((state) => state.updateShopTags)
  const selector = useAccountSelectorData({
    selectedAccounts: shopAccountIds,
    selectedTags: shopTagIds,
  })

  const load = () => {
    const selected = selector.getAccounts()

    if (selected.length <= 0) {
      toast(t('form.accounts.no-linked', { ns: 'general' }))

      return
    }

    useStwShopStore.getState().setLoading(true)
    window.electronAPI.requestStwShop(selected)
  }

  const buy = (accountId: string, offerId: string, quantity: number) => {
    const account = accountList[accountId]

    if (!account || buyingKey) {
      return
    }

    useStwShopStore.getState().setBuyingKey(`${accountId}:${offerId}`)
    window.electronAPI.buyStwShopOffer(account, offerId, quantity)
  }

  return {
    accountList,
    offers,
    shopAccounts,
    resetAt,
    isLoading,
    buyingKey,
    loadDisabled:
      selector.isSelectedEmpty || isLoading || !selector.areThereAccounts,
    selector,
    updateShopAccounts: (value: Array<SelectOption>) => {
      updateShopAccounts(value.map((item) => item.value))
    },
    updateShopTags: (value: Array<SelectOption>) => {
      updateShopTags(value.map((item) => item.value))
    },
    load,
    buy,
  }
}

export function useStwShopAuto() {
  const config = useStwShopStore((state) => state.config)
  const offers = useStwShopStore((state) => state.offers)
  const autoRunning = useStwShopStore((state) => state.autoRunning)
  const isLoading = useStwShopStore((state) => state.isLoading)
  const [accountIds, setAccountIds] = useState<Array<string>>([])
  const [tagIds, setTagIds] = useState<Array<string>>([])
  const selector = useAccountSelectorData({
    selectedAccounts: accountIds,
    selectedTags: tagIds,
  })
  const hydrated = useRef(false)
  const userEdited = useRef(false)

  useEffect(() => {
    if (!config || hydrated.current) {
      return
    }

    hydrated.current = true
    setAccountIds(config.accountIds)
  }, [config])

  useEffect(() => {
    if (!userEdited.current) {
      return
    }

    const nextIds = selector.getAccounts().map((account) => account.accountId)
    const saved = useStwShopStore.getState().config?.accountIds ?? []
    const same =
      nextIds.length === saved.length &&
      nextIds.every((id) => saved.includes(id))

    if (same) {
      return
    }

    window.electronAPI.saveStwShopConfig({ accountIds: nextIds })
  }, [accountIds, tagIds])

  const setEnabled = (enabled: boolean) => {
    window.electronAPI.saveStwShopConfig({ enabled })

    if (enabled) {
      useStwShopStore.getState().setAutoRunning(true)
      window.electronAPI.runStwShopAuto(false)
    }
  }

  const toggleItem = (templateId: string, name: string, checked: boolean) => {
    const current = useStwShopStore.getState().config?.items ?? []
    const items = checked
      ? [
          ...current.filter((item) => item.templateId !== templateId),
          { templateId, name },
        ]
      : current.filter((item) => item.templateId !== templateId)

    window.electronAPI.saveStwShopConfig({ items })
  }

  const buyNow = () => {
    if (autoRunning) {
      return
    }

    useStwShopStore.getState().setAutoRunning(true)
    window.electronAPI.runStwShopAuto(true)
  }

  const loadShop = () => {
    const selected = selector.getAccounts()

    if (selected.length <= 0) {
      return
    }

    useStwShopStore.getState().setLoading(true)
    window.electronAPI.requestStwShop(selected)
  }

  const checked = new Set((config?.items ?? []).map((item) => item.templateId))
  const offerTemplates = new Set(
    offers.map((offer) => offer.primaryTemplateId).filter(Boolean),
  )
  const missing = (config?.items ?? []).filter(
    (item) => item.templateId && !offerTemplates.has(item.templateId),
  )

  return {
    config,
    offers,
    missing,
    checked,
    autoRunning,
    isLoading,
    selector,
    setAccountIds: (value: Array<SelectOption>) => {
      userEdited.current = true
      setAccountIds(value.map((item) => item.value))
    },
    setTagIds: (value: Array<SelectOption>) => {
      userEdited.current = true
      setTagIds(value.map((item) => item.value))
    },
    setEnabled,
    toggleItem,
    buyNow,
    loadShop,
    itemName: shopItemName,
  }
}
