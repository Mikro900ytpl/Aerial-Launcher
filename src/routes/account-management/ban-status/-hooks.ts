import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAccountSelectorData } from '../../../components/selectors/accounts/hooks'

import { useGetAccounts } from '../../../hooks/accounts'
import {
  useGetBanStatusActions,
  useGetBanStatusData,
} from '../../../hooks/account-management/ban-status'

import { toast } from '../../../lib/notifications'

const KIND_ORDER = {
  banned: 0,
  error: 1,
  expired: 2,
  clean: 3,
} as const

export function useBanStatusData() {
  const { t } = useTranslation(['general'])
  const { accountsArray } = useGetAccounts()
  const { data, isLoading, selectedAccounts, selectedTags } =
    useGetBanStatusData()
  const {
    banStatusUpdateAccounts,
    banStatusUpdateData,
    banStatusUpdateLoading,
    banStatusUpdateTags,
  } = useGetBanStatusActions()
  const {
    accounts,
    areThereAccounts,
    isSelectedEmpty,
    parsedSelectedAccounts,
    parsedSelectedTags,
    tags,
    getAccounts,
  } = useAccountSelectorData({
    selectedAccounts,
    selectedTags,
  })

  const results = accountsArray
    .filter((account) => data[account.accountId] !== undefined)
    .map((account) => data[account.accountId])
    .toSorted(
      (left, right) => KIND_ORDER[left.kind] - KIND_ORDER[right.kind],
    )
  const banned = results.filter((item) => item.kind === 'banned').length
  const clean = results.filter((item) => item.kind === 'clean').length
  const isDisabledForm = isSelectedEmpty || isLoading || !areThereAccounts

  useEffect(() => {
    const listener = window.electronAPI.notificationBanStatus(async (next) => {
      banStatusUpdateLoading(false)
      banStatusUpdateData(next)
    })

    return () => {
      listener.removeListener()
    }
  }, [])

  const handleCheck = () => {
    if (isDisabledForm) {
      return
    }

    const selected = getAccounts()

    if (selected.length <= 0) {
      toast(t('form.accounts.no-linked'))

      return
    }

    banStatusUpdateLoading(true)
    banStatusUpdateData({}, true)
    window.electronAPI.requestBanStatus(selected)
  }

  return {
    accounts,
    banned,
    clean,
    handleCheck,
    isDisabledForm,
    isLoading,
    parsedSelectedAccounts,
    parsedSelectedTags,
    results,
    tags,
    banStatusUpdateAccounts,
    banStatusUpdateTags,
  }
}
