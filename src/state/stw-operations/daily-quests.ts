import type {
  AutoDailyQuestsConfig,
  DailyQuestsAccountData,
} from '../../types/daily-quests'

import { create } from 'zustand'

export type DailyQuestsState = {
  accounts: Array<string>
  tags: Array<string>
  isLoading: boolean
  isClaiming: boolean
  rerollingQuest: {
    accountId: string
    questId: string
  } | null
  dailyQuests: Array<DailyQuestsAccountData>
  autoConfig: AutoDailyQuestsConfig

  updateAccounts: (accountIds: Array<string>) => void
  updateTags: (tags: Array<string>) => void
  setLoading: (isLoading: boolean) => void
  setClaiming: (isClaiming: boolean) => void
  setRerollingQuest: (
    value: DailyQuestsState['rerollingQuest'],
  ) => void
  setDailyQuests: (value: Array<DailyQuestsAccountData>) => void
  patchAccountQuests: (value: DailyQuestsAccountData) => void
  setAutoConfig: (value: AutoDailyQuestsConfig) => void
}

export const useDailyQuestsStore = create<DailyQuestsState>()((set) => ({
  accounts: [],
  tags: [],
  isLoading: false,
  isClaiming: false,
  rerollingQuest: null,
  dailyQuests: [],
  autoConfig: {
    replaceIds: [],
    day: '',
    doneAccountIds: [],
  },

  updateAccounts: (accountIds) =>
    set({
      accounts: [...new Set(accountIds)],
    }),
  updateTags: (tags) =>
    set({
      tags: [...new Set(tags)],
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setClaiming: (isClaiming) => set({ isClaiming }),
  setRerollingQuest: (rerollingQuest) => set({ rerollingQuest }),
  setDailyQuests: (dailyQuests) => set({ dailyQuests }),
  setAutoConfig: (autoConfig) => set({ autoConfig }),
  patchAccountQuests: (value) =>
    set((state) => ({
      dailyQuests: state.dailyQuests.map((item) =>
        item.accountId === value.accountId ? value : item,
      ),
    })),
}))
