import { fortniteApiService } from '../config/fortnite-api'

export type FortniteApiShopItem = {
  id?: string
  name?: string
  description?: string
  type?: {
    value?: string
    displayValue?: string
  }
  rarity?: {
    value?: string
    displayValue?: string
  }
  images?: {
    smallIcon?: string
    icon?: string
    featured?: string
  }
}

export type FortniteApiShopEntry = {
  regularPrice?: number
  finalPrice?: number
  offerId?: string
  devName?: string
  giftable?: boolean
  layoutId?: string
  layout?: {
    id?: string
    name?: string
    category?: string
  }
  newDisplayAsset?: {
    renderImages?: Array<{
      image?: string
    }>
  }
  items?: Array<FortniteApiShopItem>
  brItems?: Array<FortniteApiShopItem>
  tracks?: Array<FortniteApiShopItem>
  instruments?: Array<FortniteApiShopItem>
  cars?: Array<FortniteApiShopItem>
  legoKits?: Array<FortniteApiShopItem>
}

export type FortniteApiShopResponse = {
  status?: number
  data?: {
    date?: string
    entries?: Array<FortniteApiShopEntry>
  }
}

export function fetchPublicItemShop() {
  return fortniteApiService.get<FortniteApiShopResponse>('/v2/shop')
}
