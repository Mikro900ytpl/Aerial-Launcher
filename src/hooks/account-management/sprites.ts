import { useShallow } from 'zustand/react/shallow'

import type { SelectOption } from '../../components/ui/third-party/extended/input-tags'

import {
  useSpritesStore,
  type SpritesState,
} from '../../state/account-management/sprites'

export function useGetSpritesData() {
  const { accounts, data, isLoading, tags } = useSpritesStore(
    useShallow((state) => ({
      accounts: state.accounts,
      data: state.data,
      isLoading: state.isLoading,
      tags: state.tags,
    })),
  )

  return {
    data,
    isLoading,
    selectedAccounts: accounts,
    selectedTags: tags,
  }
}

export function useGetSpritesActions() {
  const { updateAccounts, updateData, updateLoading, updateTags } =
    useSpritesStore(
      useShallow((state) => ({
        updateAccounts: state.updateAccounts,
        updateData: state.updateData,
        updateLoading: state.updateLoading,
        updateTags: state.updateTags,
      })),
    )

  const spritesUpdateAccounts = (value: Array<SelectOption>) => {
    updateAccounts(value.map((item) => item.value))
  }
  const spritesUpdateTags = (value: Array<SelectOption>) => {
    updateTags(value.map((item) => item.value))
  }
  const spritesUpdateData = (value: SpritesState['data'], reset?: boolean) => {
    updateData(value, reset)
  }
  const spritesUpdateLoading = (value: boolean) => {
    updateLoading(value)
  }

  return {
    spritesUpdateAccounts,
    spritesUpdateData,
    spritesUpdateLoading,
    spritesUpdateTags,
  }
}
