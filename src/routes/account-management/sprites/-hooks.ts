import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import type { SpriteScope } from '../../../lib/fortnite/sprites'

import { useAccountSelectorData } from '../../../components/selectors/accounts/hooks'

import { useGetAccounts } from '../../../hooks/accounts'
import {
  useGetSpritesActions,
  useGetSpritesData,
} from '../../../hooks/account-management/sprites'

import { toast } from '../../../lib/notifications'

export function useSpritesData() {
  const { t } = useTranslation(['general'])
  const { accountsArray } = useGetAccounts()
  const { data, isLoading, selectedAccounts, selectedTags } = useGetSpritesData()
  const {
    spritesUpdateAccounts,
    spritesUpdateData,
    spritesUpdateLoading,
    spritesUpdateTags,
  } = useGetSpritesActions()
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
  const isDisabledForm = isSelectedEmpty || isLoading || !areThereAccounts

  useEffect(() => {
    const listener = window.electronAPI.notificationSprites(async (next) => {
      spritesUpdateLoading(false)
      spritesUpdateData(next)
    })

    return () => {
      listener.removeListener()
    }
  }, [])

  const handleCheck = (scope: SpriteScope) => {
    if (isDisabledForm) {
      return
    }

    const selected = getAccounts()

    if (selected.length <= 0) {
      toast(t('form.accounts.no-linked'))

      return
    }

    spritesUpdateLoading(true)
    spritesUpdateData({}, true)
    window.electronAPI.requestSprites(selected, scope)
  }

  return {
    accounts,
    handleCheck,
    isDisabledForm,
    isLoading,
    parsedSelectedAccounts,
    parsedSelectedTags,
    results,
    spritesUpdateAccounts,
    spritesUpdateTags,
    tags,
  }
}
