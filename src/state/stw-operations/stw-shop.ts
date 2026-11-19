import type {
  StwShopAccount,
  StwShopConfig,
  StwShopOffer,
} from '../../types/stw-shop'

import { create } from 'zustand'

export type StwShopState = {
  offers: Array<StwShopOffer>
  accounts: Array<StwShopAccount>
  resetAt: string
  isLoading: boolean
  buyingKey: string | null
  autoRunning: boolean
  config: StwShopConfig | null
  shopAccountIds: Array<string>
  shopTagIds: Array<string>

  setLoading: (isLoading: boolean) => void
  setBuyingKey: (buyingKey: string | null) => void
  setAutoRunning: (autoRunning: boolean) => void
  setLoadResult: (value: {
    offers: Array<StwShopOffer>
    accounts: Array<StwShopAccount>
    resetAt: string
  }) => void
  patchAccount: (account: StwShopAccount) => void
  setConfig: (config: StwShopConfig) => void
  updateShopAccounts: (accountIds: Array<string>) => void
  updateShopTags: (tags: Array<string>) => void
}

export const useStwShopStore = create<StwShopState>()((set) => ({
  offers: [],
  accounts: [],
  resetAt: '',
  isLoading: false,
  buyingKey: null,
  autoRunning: false,
  config: null,
  shopAccountIds: [],
  shopTagIds: [],

  setLoading: (isLoading) => set({ isLoading }),
  setBuyingKey: (buyingKey) => set({ buyingKey }),
  setAutoRunning: (autoRunning) => set({ autoRunning }),
  setLoadResult: (value) =>
    set({
      offers: value.offers,
      accounts: value.accounts,
      resetAt: value.resetAt,
      isLoading: false,
    }),
  patchAccount: (account) =>
    set((state) => ({
      accounts: state.accounts.map((item) =>
        item.accountId === account.accountId ? account : item,
      ),
    })),
  setConfig: (config) => set({ config }),
  updateShopAccounts: (accountIds) =>
    set({
      shopAccountIds: [...new Set(accountIds)],
    }),
  updateShopTags: (shopTagIds) =>
    set({
      shopTagIds: [...new Set(shopTagIds)],
    }),
}))
