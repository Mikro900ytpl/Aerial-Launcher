import type { AccountData } from '../../../types/accounts'
import type { StwShopAccount, StwShopOffer } from '../../../types/stw-shop'

import { UpdateIcon } from '@radix-ui/react-icons'
import { createRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Route as RootRoute } from '../../__root'

import { HomeBreadcrumb } from '../../../components/navigations/breadcrumb/home'
import { AccountSelectors } from '../../../components/selectors/accounts'
import { RewardIcon } from '../../../components/reward-icon'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Switch } from '../../../components/ui/switch'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs'

import { parseResource } from '../../../lib/parsers/resources'
import { shopItemIcon, shopItemName } from '../../../lib/stw/shop-display'
import { parseCustomDisplayName } from '../../../lib/utils'

import { useStwShopAuto, useStwShopData } from './-hooks'

const GOLD_KEY = 'AccountResource:eventcurrency_scaling'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/stw-operations/stw-shop',
  component: StwShopPage,
})

function StwShopPage() {
  const { t } = useTranslation(['sidebar', 'stw-operations'])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <HomeBreadcrumb />
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('stw-operations.title')}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {t('stw-operations.options.stw-shop')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs
        defaultValue="shop"
        className="mt-4 flex flex-grow flex-col"
      >
        <div className="flex justify-center px-2">
          <TabsList>
            <TabsTrigger value="shop">
              {t('stw-shop.tabs.shop', { ns: 'stw-operations' })}
            </TabsTrigger>
            <TabsTrigger value="auto">
              {t('stw-shop.tabs.auto', { ns: 'stw-operations' })}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="shop"
          className="mt-4 flex-grow"
        >
          <ShopPanel />
        </TabsContent>
        <TabsContent
          value="auto"
          className="mt-4 flex-grow"
        >
          <AutoPanel />
        </TabsContent>
      </Tabs>
    </>
  )
}

function ShopPanel() {
  const { t } = useTranslation(['stw-operations', 'general'])
  const {
    accountList,
    offers,
    shopAccounts,
    resetAt,
    isLoading,
    buyingKey,
    loadDisabled,
    selector,
    updateShopAccounts,
    updateShopTags,
    load,
    buy,
  } = useStwShopData()
  const resetLabel = useResetLabel(resetAt)
  const eventOffers = offers.filter((offer) => offer.section === 'event')
  const weeklyOffers = offers.filter((offer) => offer.section === 'weekly')

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
      <div className="flex items-center gap-2 rounded-lg border p-2">
        <AccountSelectors
          layout="row"
          accounts={{
            options: selector.accounts,
            value: selector.parsedSelectedAccounts,
          }}
          tags={{
            options: selector.tags,
            value: selector.parsedSelectedTags,
          }}
          onUpdateAccounts={updateShopAccounts}
          onUpdateTags={updateShopTags}
        />
        <Button
          className="shrink-0"
          disabled={loadDisabled}
          onClick={load}
        >
          {isLoading ? (
            <UpdateIcon className="animate-spin" />
          ) : (
            t('stw-shop.form.load')
          )}
        </Button>
      </div>

      {offers.length === 0 ? (
        <Card>
          <CardContent className="py-5 text-muted-foreground text-sm">
            {t('stw-shop.list.empty')}
          </CardContent>
        </Card>
      ) : (
        <>
          <GoldStrip
            accounts={shopAccounts}
            names={accountList}
          />
          <ShopSection
            title={t('stw-shop.sections.event')}
            offers={eventOffers}
            accounts={shopAccounts}
            names={accountList}
            buyingKey={buyingKey}
            onBuy={buy}
          />
          <ShopSection
            title={t('stw-shop.sections.weekly')}
            detail={
              resetLabel ? t('stw-shop.sections.resets', { time: resetLabel }) : ''
            }
            offers={weeklyOffers}
            accounts={shopAccounts}
            names={accountList}
            buyingKey={buyingKey}
            onBuy={buy}
          />
        </>
      )}
    </div>
  )
}

function AutoPanel() {
  const { t } = useTranslation(['stw-operations'])
  const {
    config,
    offers,
    missing,
    checked,
    autoRunning,
    isLoading,
    selector,
    setAccountIds,
    setTagIds,
    setEnabled,
    toggleItem,
    buyNow,
    loadShop,
    itemName,
  } = useStwShopAuto()
  const limited = offers.filter((offer) => offer.limit != null && offer.primaryTemplateId)

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between gap-3">
            <span>{t('stw-shop.auto.title')}</span>
            <Switch
              checked={config?.enabled === true}
              onCheckedChange={setEnabled}
            />
          </div>
          <p className="text-muted-foreground text-sm">{t('stw-shop.auto.hint')}</p>
          <AccountSelectors
            layout="row"
            accounts={{
              options: selector.accounts,
              value: selector.parsedSelectedAccounts,
            }}
            tags={{
              options: selector.tags,
              value: selector.parsedSelectedTags,
            }}
            onUpdateAccounts={setAccountIds}
            onUpdateTags={setTagIds}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={selector.isSelectedEmpty || isLoading}
              onClick={loadShop}
            >
              {isLoading ? (
                <UpdateIcon className="animate-spin" />
              ) : (
                t('stw-shop.form.load')
              )}
            </Button>
            <Button
              disabled={autoRunning || (config?.accountIds.length ?? 0) === 0}
              onClick={buyNow}
            >
              {autoRunning ? (
                <UpdateIcon className="animate-spin" />
              ) : (
                t('stw-shop.auto.buy-now')
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 pt-6">
          <div className="text-sm font-medium">{t('stw-shop.auto.list')}</div>
          {limited.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('stw-shop.auto.empty')}
            </p>
          ) : (
            limited.map((offer) => {
              const name = itemName(offer)

              return (
                <label
                  key={offer.offerId}
                  className="flex items-center gap-2 rounded px-1 py-1 text-sm hover:bg-muted/40"
                >
                  <input
                    type="checkbox"
                    className="size-3.5 accent-violet-400"
                    checked={checked.has(offer.primaryTemplateId)}
                    onChange={(event) =>
                      toggleItem(
                        offer.primaryTemplateId,
                        name,
                        event.target.checked,
                      )
                    }
                  />
                  <ItemIcon templateId={offer.primaryTemplateId} />
                  <span className="min-w-0 flex-1 truncate">{name}</span>
                  <span className="text-muted-foreground text-xs">
                    {offer.price.toLocaleString()}
                  </span>
                </label>
              )
            })
          )}
          {missing.map((item) => (
            <label
              key={item.templateId}
              className="flex items-center gap-2 rounded px-1 py-1 text-sm text-muted-foreground"
            >
              <input
                type="checkbox"
                className="size-3.5 accent-violet-400"
                checked
                onChange={() => toggleItem(item.templateId, item.name, false)}
              />
              <span className="min-w-0 flex-1 truncate">{item.name}</span>
              <span className="text-xs">{t('stw-shop.auto.not-in-shop')}</span>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function ShopSection({
  title,
  detail,
  offers,
  accounts,
  names,
  buyingKey,
  onBuy,
}: {
  title: string
  detail?: string
  offers: Array<StwShopOffer>
  accounts: Array<StwShopAccount>
  names: Record<string, AccountData>
  buyingKey: string | null
  onBuy: (accountId: string, offerId: string, quantity: number) => void
}) {
  if (offers.length === 0) {
    return null
  }

  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-sm font-semibold uppercase tracking-wide">
            {title}
          </div>
          {detail ? (
            <div className="text-muted-foreground text-xs">{detail}</div>
          ) : null}
        </div>
        {offers.map((offer) => (
          <OfferBlock
            key={offer.offerId}
            offer={offer}
            accounts={accounts}
            names={names}
            buyingKey={buyingKey}
            onBuy={onBuy}
          />
        ))}
      </CardContent>
    </Card>
  )
}

function OfferBlock({
  offer,
  accounts,
  names,
  buyingKey,
  onBuy,
}: {
  offer: StwShopOffer
  accounts: Array<StwShopAccount>
  names: ShopSectionProps['names']
  buyingKey: string | null
  onBuy: (accountId: string, offerId: string, quantity: number) => void
}) {
  const { t } = useTranslation(['stw-operations'])
  const name = shopItemName(offer)

  return (
    <div className="rounded-md border">
      <div className="flex items-center gap-3 px-3 py-2">
        <ItemIcon templateId={offer.primaryTemplateId} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm">{name}</div>
          <div className="text-muted-foreground text-xs">
            {offer.price.toLocaleString()} {t('stw-shop.gold')}
            {offer.limit == null
              ? ` · ${t('stw-shop.unlimited')}`
              : ` · ${t('stw-shop.limit', { count: offer.limit })}`}
          </div>
        </div>
      </div>
      <div className="divide-y border-t">
        {accounts.map((account) => (
          <AccountBuyRow
            key={account.accountId}
            account={account}
            offer={offer}
            displayName={accountName(names, account.accountId)}
            busy={buyingKey === `${account.accountId}:${offer.offerId}`}
            locked={buyingKey !== null}
            onBuy={onBuy}
          />
        ))}
      </div>
    </div>
  )
}

type ShopSectionProps = Parameters<typeof ShopSection>[0]

function AccountBuyRow({
  account,
  offer,
  displayName,
  busy,
  locked,
  onBuy,
}: {
  account: StwShopAccount
  offer: StwShopOffer
  displayName: string
  busy: boolean
  locked: boolean
  onBuy: (accountId: string, offerId: string, quantity: number) => void
}) {
  const { t } = useTranslation(['stw-operations'])
  const row = account.offers.find((item) => item.offerId === offer.offerId)
  const remaining = row?.remaining ?? offer.limit
  const purchased = row?.purchased ?? 0
  const affordable =
    offer.price > 0 ? Math.floor(account.gold / offer.price) : 50
  const cap =
    remaining == null
      ? Math.min(50, Math.max(affordable, 0))
      : Math.max(Math.min(remaining, affordable), 0)
  const [quantity, setQuantity] = useState(
    remaining == null ? 1 : cap > 0 ? cap : 1,
  )
  const soldOut = remaining === 0 || cap <= 0

  useEffect(() => {
    setQuantity((current) => {
      if (cap <= 0) {
        return 1
      }

      if (current > cap) {
        return cap
      }

      return current
    })
  }, [cap])

  return (
    <div className="flex items-center gap-2 px-3 py-2 text-sm">
      <div className="min-w-0 flex-1 truncate text-[#e9c4cc]">{displayName}</div>
      <div className="shrink-0 text-muted-foreground text-xs">
        {account.errorMessage
          ? account.errorMessage
          : remaining == null
            ? t('stw-shop.unlimited')
            : t('stw-shop.purchased', {
                bought: purchased,
                limit: offer.limit ?? remaining + purchased,
              })}
      </div>
      <input
        type="number"
        min={1}
        max={cap > 0 ? cap : 1}
        value={quantity}
        disabled={soldOut || locked}
        onChange={(event) => {
          const next = Math.floor(Number(event.target.value))

          if (Number.isFinite(next)) {
            setQuantity(Math.max(1, Math.min(next, cap > 0 ? cap : 1)))
          }
        }}
        className="h-8 w-16 rounded-md border bg-transparent px-2 text-sm"
      />
      <Button
        size="sm"
        className="h-8"
        disabled={soldOut || locked || Boolean(account.errorMessage)}
        onClick={() => onBuy(account.accountId, offer.offerId, quantity)}
      >
        {busy ? <UpdateIcon className="animate-spin" /> : t('stw-shop.form.buy')}
      </Button>
    </div>
  )
}

function GoldStrip({
  accounts,
  names,
}: {
  accounts: Array<StwShopAccount>
  names: ShopSectionProps['names']
}) {
  const gold = parseResource({
    key: GOLD_KEY,
    quantity: 1,
  })

  return (
    <Card>
      <CardContent className="flex flex-wrap gap-x-4 gap-y-2 py-3">
        {accounts.map((account) => (
          <div
            key={account.accountId}
            className="flex items-center gap-2 text-sm"
          >
            <span className="text-[#e9c4cc]">
              {accountName(names, account.accountId)}
            </span>
            <RewardIcon
              src={gold.imgUrl}
              className="size-4"
            />
            <span>{account.gold.toLocaleString()}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ItemIcon({ templateId }: { templateId: string }) {
  return (
    <RewardIcon
      src={shopItemIcon(templateId)}
      className="size-10 rounded bg-muted object-contain"
    />
  )
}

function accountName(
  names: ShopSectionProps['names'],
  accountId: string,
) {
  const account = names[accountId]

  return account ? parseCustomDisplayName(account) : accountId
}

function useResetLabel(resetAt: string) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000)

    return () => window.clearInterval(timer)
  }, [])

  if (!resetAt) {
    return ''
  }

  const ms = Date.parse(resetAt) - now

  if (!Number.isFinite(ms) || ms <= 0) {
    return ''
  }

  const minutes = Math.floor(ms / 60000)
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)

  if (days > 0) {
    return `${days}d ${hours}h`
  }

  return `${hours}h ${minutes % 60}m`
}
