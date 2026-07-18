import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useAccountSelectorData } from '../../../components/selectors/accounts/hooks'

import {
  useGetCollectionBookActions,
  useGetCollectionBookData,
} from '../../../hooks/stw-operations/collection-book'
import { useGetAccounts } from '../../../hooks/accounts'

import { toast } from '../../../lib/notifications'
import type {
  CollectionBookItem,
  CollectionBookSectionId,
} from '../../../types/collection-book'

export function useCollectionBookPage() {
  const { t } = useTranslation(['stw-operations', 'general'])

  const { accountsArray } = useGetAccounts()
  const {
    accounts,
    tags,
    isLoading,
    isActing,
    data,
    lastResult,
    targetLevel,
  } = useGetCollectionBookData()
  const {
    updateAccounts,
    updateTags,
    updateLoading,
    updateActing,
    updateData,
    clearData,
    setLastResult,
    setTargetLevel,
  } = useGetCollectionBookActions()

  const {
    accounts: accountOptions,
    areThereAccounts,
    isSelectedEmpty,
    parsedSelectedAccounts,
    parsedSelectedTags,
    tags: tagOptions,
    getAccounts,
  } = useAccountSelectorData({
    selectedAccounts: accounts,
    selectedTags: tags,
  })

  const isDisabledForm =
    isSelectedEmpty || isLoading || isActing || !areThereAccounts

  const accountsData = useMemo(
    () =>
      accountsArray
        .filter((account) => data[account.accountId] !== undefined)
        .map((account) => data[account.accountId]),
    [accountsArray, data],
  )

  useEffect(() => {
    const responseListener =
      window.electronAPI.collectionBookResponseData(async (payload) => {
        updateData(payload)
      })
    const loadingListener =
      window.electronAPI.collectionBookLoadingDone(async () => {
        updateLoading(false)
      })
    const resultListener =
      window.electronAPI.collectionBookActionResult(async (result) => {
        updateActing(false)
        setLastResult(result)

        if (result.success) {
          if (result.upgraded) {
            toast(
              t('collection-book.toasts.upgraded', {
                count: result.upgraded,
                failed: result.failed ?? 0,
              }),
            )
          } else if (result.slotted) {
            toast(
              t('collection-book.toasts.slotted', {
                count: result.slotted,
              }),
            )
          } else {
            toast(t('collection-book.toasts.success'))
          }
        } else {
          const errorKey = `collection-book.toasts.error_${result.error ?? 'unknown'}`
          toast(
            t(errorKey, {
              defaultValue: t('collection-book.toasts.error', {
                context: result.error ?? 'unknown',
              }),
            }),
          )
        }
      })

    return () => {
      responseListener.removeListener()
      loadingListener.removeListener()
      resultListener.removeListener()
    }
  }, [t, updateActing, updateData, updateLoading, setLastResult])

  const handleLoad = () => {
    if (isDisabledForm) {
      if (isSelectedEmpty || !areThereAccounts) {
        toast(t('form.accounts.no-linked', { ns: 'general' }))
      }
      return
    }

    const selected = getAccounts()
    if (selected.length <= 0) {
      toast(t('form.accounts.no-linked', { ns: 'general' }))
      return
    }

    updateLoading(true)
    clearData()
    window.electronAPI.collectionBookRequestData(selected)
  }

  const handleUpgradeAll = (accountId: string) => {
    if (isActing) return
    updateActing(true)
    window.electronAPI.collectionBookUpgrade({
      accountId,
      sectionId: 'all',
      targetLevel,
    })
  }

  const handleUpgradeSection = (
    accountId: string,
    sectionId: CollectionBookSectionId,
  ) => {
    if (isActing) return
    updateActing(true)
    window.electronAPI.collectionBookUpgrade({
      accountId,
      sectionId,
      targetLevel,
    })
  }

  const handleUpgradeItem = (
    accountId: string,
    item: CollectionBookItem,
  ) => {
    if (isActing) return
    updateActing(true)
    window.electronAPI.collectionBookUpgrade({
      accountId,
      itemIds: [item.itemId],
      targetLevel,
    })
  }

  const handleSlotItem = (accountId: string, itemId: string) => {
    if (isActing) return
    updateActing(true)
    window.electronAPI.collectionBookSlot({
      accountId,
      itemIds: [itemId],
    })
  }

  const handleSlotSection = (
    accountId: string,
    sectionId: CollectionBookSectionId,
  ) => {
    if (isActing) return
    const accountData = data[accountId]
    if (!accountData) return

    const itemIds = accountData.items
      .filter((item) => item.sectionId === sectionId)
      .map((item) => item.itemId)

    if (itemIds.length <= 0) return

    updateActing(true)
    window.electronAPI.collectionBookSlot({
      accountId,
      itemIds,
    })
  }

  return {
    accountOptions,
    areThereAccounts,
    isDisabledForm,
    isLoading,
    isActing,
    isSelectedEmpty,
    parsedSelectedAccounts,
    parsedSelectedTags,
    tagOptions,
    accountsData,
    lastResult,
    targetLevel,

    updateAccounts,
    updateTags,
    setTargetLevel,
    handleLoad,
    handleUpgradeAll,
    handleUpgradeSection,
    handleUpgradeItem,
    handleSlotItem,
    handleSlotSection,
  }
}
