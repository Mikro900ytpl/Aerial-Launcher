import { useShallow } from 'zustand/react/shallow'

import type { SelectOption } from '../../components/ui/third-party/extended/input-tags'

import {
  useBanStatusStore,
  type BanStatusState,
} from '../../state/account-management/ban-status'

export function useGetBanStatusData() {
  const { accounts, data, isLoading, tags } = useBanStatusStore(
    useShallow((state) => ({
      accounts: state.accounts,
      isLoading: state.isLoading,
      data: state.data,
      tags: state.tags,
    })),
  )

  return {
    isLoading,
    data,
    selectedAccounts: accounts,
    selectedTags: tags,
  }
}

export function useGetBanStatusActions() {
  const { updateAccounts, updateData, updateLoading, updateTags } =
    useBanStatusStore(
      useShallow((state) => ({
        updateAccounts: state.updateAccounts,
        updateData: state.updateData,
        updateLoading: state.updateLoading,
        updateTags: state.updateTags,
      })),
    )

  const banStatusUpdateAccounts = (value: Array<SelectOption>) => {
    updateAccounts(value.map((item) => item.value))
  }
  const banStatusUpdateTags = (value: Array<SelectOption>) => {
    updateTags(value.map((item) => item.value))
  }
  const banStatusUpdateData = (
    value: BanStatusState['data'],
    reset?: boolean,
  ) => {
    updateData(value, reset)
  }
  const banStatusUpdateLoading = (value: boolean) => {
    updateLoading(value)
  }

  return {
    banStatusUpdateAccounts,
    banStatusUpdateData,
    banStatusUpdateLoading,
    banStatusUpdateTags,
  }
}
