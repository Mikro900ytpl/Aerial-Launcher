import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

import type { SpriteCheckResult } from '../../lib/fortnite/sprites'

export type { SpriteCheckResult }

export type SpritesState = {
  accounts: Array<string>
  data: Record<string, SpriteCheckResult>
  isLoading: boolean
  tags: Array<string>

  updateAccounts: (accountIds: Array<string>) => void
  updateData: (value: Record<string, SpriteCheckResult>, reset?: boolean) => void
  updateLoading: (state: boolean) => void
  updateTags: (tags: Array<string>) => void
}

export const useSpritesStore = create<SpritesState>()(
  immer((set) => ({
    accounts: [],
    data: {},
    isLoading: false,
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
