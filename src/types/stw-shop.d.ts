import type { AccountData } from './accounts'

export type StwShopSection = 'event' | 'weekly'
export type StwShopLimitKind =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'event'
  | 'none'

export type StwShopOffer = {
  offerId: string
  section: StwShopSection
  devName: string
  title: string
  primaryTemplateId: string
  grants: Array<{
    templateId: string
    quantity: number
  }>
  price: number
  currencyType: string
  currencySubType: string
  dailyLimit: number
  weeklyLimit: number
  monthlyLimit: number
  eventLimit: number
  eventId: string
  limit: number | null
  limitKind: StwShopLimitKind
  sortPriority: number
}

export type StwShopAccountOffer = {
  offerId: string
  purchased: number
  remaining: number | null
}

export type StwShopAccount = {
  accountId: string
  gold: number
  errorMessage: string | null
  offers: Array<StwShopAccountOffer>
}

export type StwShopLoadResult = {
  resetAt: string
  offers: Array<StwShopOffer>
  accounts: Array<StwShopAccount>
  errorMessage: string | null
}

export type StwShopBuyRequest = {
  account: AccountData
  offerId: string
  quantity: number
}

export type StwShopBuyResult = {
  accountId: string
  offerId: string
  success: boolean
  purchased: number
  errorMessage: string | null
  account: StwShopAccount | null
}

export type StwShopSavedItem = {
  templateId: string
  name: string
}

export type StwShopConfig = {
  enabled: boolean
  accountIds: Array<string>
  items: Array<StwShopSavedItem>
  week: string
  done: Record<string, string>
}

export type StwShopAutoResult = {
  accounts: number
  bought: number
  errors: Array<string>
}
