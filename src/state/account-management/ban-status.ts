import type { BanStatusKind } from '../../lib/stw/ban-status'

import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

export type BanStatusResult = {
  accountId: string
  displayName: string
  kind: BanStatusKind
  permanent: boolean
  reasons: Array<string>
  startedAt: string | null
  endsAt: string | null
  durationDays: number | null
  detail: string | null
  errorMessage: string | null
}

export type BanStatusState = {
  accounts: Array<string>
  isLoading: boolean
  data: Record<string, BanStatusResult>
  tags: Array<string>

  updateAccounts: (accountIds: Array<string>) => void
  updateData: (value: Record<string, BanStatusResult>, reset?: boolean) => void
  updateLoading: (state: boolean) => void
  updateTags: (tags: Array<string>) => void
}

export const useBanStatusStore = create<BanStatusState>()(
  immer((set) => ({
    accounts: [],
    isLoading: false,
    data: {},
    tags: [],

    updateAccounts: (accountIds) =>
      set({
        accounts: [...new Set(accountIds)],
      }),
    updateData: (value, reset) => {
      if (reset === true) {
        set({ data: {} })
      } else {
        set((state) => {
          Object.values(value).forEach((item) => {
            state.data[item.accountId] = item
          })
        })
      }
    },
    updateLoading: (state) => set({ isLoading: state }),
    updateTags: (tags) =>
      set({
        tags: [...new Set(tags)],
      }),
  })),
)
