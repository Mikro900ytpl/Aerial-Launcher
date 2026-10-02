import { useTranslation } from 'react-i18next'
import { useShallow } from 'zustand/react/shallow'

import { useAccountSelectorData } from '../../../components/selectors/accounts/hooks'

import {
  useGetDqWeaponsActions,
  useGetDqWeaponsData,
} from '../../../hooks/stw-operations/dq-weapons'
import { useGetAccounts } from '../../../hooks/accounts'
import { useDqWeaponsStore } from '../../../state/stw-operations/dq-weapons'

import { toast } from '../../../lib/notifications'

export function useDqWeaponsPage() {
  const { t } = useTranslation(['stw-operations', 'general'])

  const { results, isLoading } = useDqWeaponsStore(
    useShallow((state) => ({
      results: state.results,
      isLoading: state.isLoading,
    }))
  )
  const setLoading = useDqWeaponsStore((state) => state.setLoading)

  const { accountList } = useGetAccounts()
  const { selectedAccounts, selectedTags } = useGetDqWeaponsData()
  const { dqWeaponsUpdateAccounts, dqWeaponsUpdateTags } =
    useGetDqWeaponsActions()
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

  const fetchButtonIsDisabled =
    isSelectedEmpty || isLoading || !areThereAccounts

  const handleFetch = () => {
    if (fetchButtonIsDisabled) {
      return
    }

    const selected = getAccounts()

    if (selected.length <= 0) {
      toast(
        t('form.accounts.no-linked', {
          ns: 'general',
        })
      )

      return
    }

    setLoading(true)
    window.electronAPI.requestDqWeapons(selected)
  }

  return {
    accounts,
    accountList,
    results,
    fetchButtonIsDisabled,
    isLoading,
    parsedSelectedAccounts,
    parsedSelectedTags,
    tags,
    dqWeaponsUpdateAccounts,
    dqWeaponsUpdateTags,
    handleFetch,
  }
}
