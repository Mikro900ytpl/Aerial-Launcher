import { Gift } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../components/ui/button'

import { ShopOfferImage } from './-offer-image'

import { numberWithCommaSeparator } from '../../../lib/parsers/numbers'
import { cn } from '../../../lib/utils'

import type { ItemShopOffer } from '../../../types/item-shop'

export function OfferGrid({
  offers,
  disabled,
  onBuy,
  onGift,
}: {
  offers: Array<ItemShopOffer>
  disabled: boolean
  onBuy: (offer: ItemShopOffer) => void
  onGift: (offer: ItemShopOffer) => void
}) {
  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard
          key={offer.offerId}
          offer={offer}
          disabled={disabled}
          onBuy={() => onBuy(offer)}
          onGift={() => onGift(offer)}
        />
      ))}
    </div>
  )
}

function OfferCard({
  offer,
  disabled,
  onBuy,
  onGift,
}: {
  offer: ItemShopOffer
  disabled: boolean
  onBuy: () => void
  onGift: () => void
}) {
  const { t } = useTranslation(['stw-operations'])

  return (
    <article
      className={cn(
        'flex flex-col border rounded-lg overflow-hidden bg-muted/20',
        rarityBorder(offer.rarity)
      )}
    >
      <ShopOfferImage
        src={offer.imageUrl}
        className="h-28 w-full object-contain"
      />
      <div className="flex flex-col gap-1 p-2">
        <div className="font-medium leading-tight text-sm truncate">
          {offer.title}
        </div>
        <div className="text-[11px] text-muted-foreground truncate">
          {offer.type} · {offer.section}
        </div>
        <div className="text-xs">
          {t('item-shop.price', {
            price: numberWithCommaSeparator(offer.price),
          })}
        </div>
        <div className="flex gap-1 mt-1">
          <Button
            size="sm"
            className="flex-1 h-8"
            onClick={onBuy}
            disabled={disabled || !offer.offerId}
          >
            {t('item-shop.buy')}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2"
            onClick={onGift}
            disabled={disabled || !offer.giftable}
            title={t('item-shop.gift')}
          >
            <Gift className="size-3.5" />
          </Button>
        </div>
      </div>
    </article>
  )
}

function rarityBorder(rarity: string) {
  const value = rarity.toLowerCase()

  if (value.includes('mythic') || value.includes('legendary')) {
    return 'border-amber-400/70'
  }

  if (value.includes('epic')) {
    return 'border-purple-400/70'
  }

  if (value.includes('rare')) {
    return 'border-sky-400/70'
  }

  if (value.includes('uncommon')) {
    return 'border-green-400/70'
  }

  return 'border-border'
}
