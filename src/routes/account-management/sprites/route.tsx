import { useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { UpdateIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

import { Route as RootRoute } from '../../__root'

import { HomeBreadcrumb } from '../../../components/navigations/breadcrumb/home'
import { AccountSelectors } from '../../../components/selectors/accounts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../../../components/ui/card'
import { GoToTop } from '../../../components/go-to-top'

import type {
  SpriteCheckResult,
  SpriteReport,
  SpriteRow,
  SpriteScope,
} from '../../../lib/fortnite/sprites'

import {
  spriteIconUrl,
  spriteInfo,
  spriteXpNext,
} from '../../../lib/fortnite/sprites'

import { useSpritesData } from './-hooks'

import { numberWithCommaSeparator } from '../../../lib/parsers/numbers'
import { cn, parseCustomDisplayName } from '../../../lib/utils'
import { useGetAccounts } from '../../../hooks/accounts'

type SpriteFilter = 'all' | 'owned' | 'missing' | 'mastered' | 'other'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/account-management/sprites',
  component: () => {
    const { t } = useTranslation(['sidebar'], {
      keyPrefix: 'account-management',
    })

    return (
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <HomeBreadcrumb />
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('title')}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('options.sprites')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Content />
      </>
    )
  },
})

function Content() {
  const { t } = useTranslation(['account-management'], {
    keyPrefix: 'sprites',
  })
  const [filter, setFilter] = useState<SpriteFilter>('all')
  const [scope, setScope] = useState<SpriteScope>('current')
  const scopes: Array<SpriteScope> = ['current', 'all']
  const {
    accounts,
    handleCheck,
    isDisabledForm,
    isLoading,
    parsedSelectedAccounts,
    parsedSelectedTags,
    results,
    spritesUpdateAccounts,
    spritesUpdateTags,
    tags,
  } = useSpritesData()
  const filters: Array<SpriteFilter> = [
    'all',
    'owned',
    'missing',
    'mastered',
    'other',
  ]

  return (
    <>
      <div className="flex flex-grow">
        <div className="flex items-center justify-center w-full">
          <div className="max-w-xl space-y-4 w-full">
            <Card className="w-full" id="sprites-card">
              <CardHeader className="border-b">
                <CardDescription>{t('description')}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 pt-6">
                <AccountSelectors
                  accounts={{
                    options: accounts,
                    value: parsedSelectedAccounts,
                  }}
                  tags={{
                    options: tags,
                    value: parsedSelectedTags,
                  }}
                  onUpdateAccounts={spritesUpdateAccounts}
                  onUpdateTags={spritesUpdateTags}
                />
                <div className="flex flex-wrap gap-1">
                  {scopes.map((item) => (
                    <Button
                      key={item}
                      type="button"
                      size="sm"
                      variant={scope === item ? 'default' : 'outline'}
                      onClick={() => setScope(item)}
                    >
                      {t(`scope.${item}`)}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleCheck(scope)}
                  disabled={isDisabledForm}
                >
                  {isLoading ? (
                    <UpdateIcon className="animate-spin" />
                  ) : (
                    t('form.submit-button')
                  )}
                </Button>
              </CardFooter>
            </Card>

            {results.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {filters.map((item) => (
                    <Button
                      key={item}
                      type="button"
                      size="sm"
                      variant={filter === item ? 'default' : 'outline'}
                      onClick={() => setFilter(item)}
                    >
                      {t(`filters.${item}`)}
                    </Button>
                  ))}
                </div>
                {results.map((item) => (
                  <SpriteAccount
                    data={item}
                    filter={filter}
                    key={item.accountId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <GoToTop containerId="sprites-card" />
    </>
  )
}

function SpriteAccount({
  data,
  filter,
}: {
  data: SpriteCheckResult
  filter: SpriteFilter
}) {
  const { accountList } = useGetAccounts()
  const account = accountList[data.accountId]
  const name = account ? parseCustomDisplayName(account) : data.displayName

  return (
    <article className="border rounded">
      <header className="bg-muted-foreground/5 px-2 py-2">
        <div className="truncate text-sm">{name}</div>
      </header>
      {data.errorMessage ? (
        <div className="px-2 py-1.5 text-xs text-yellow-600">
          {data.errorMessage}
        </div>
      ) : (
        data.seasons.map((season) => (
          <SpriteSeason
            filter={filter}
            key={season.season}
            season={season}
          />
        ))
      )}
    </article>
  )
}

function SpriteSeason({
  filter,
  season,
}: {
  filter: SpriteFilter
  season: SpriteCheckResult['seasons'][number]
}) {
  const { t } = useTranslation(['account-management'], {
    keyPrefix: 'sprites',
  })
  const [selected, setSelected] = useState<SpriteRow | null>(null)
  const rows = visibleRows(season, filter)

  return (
    <section className="border-t">
      <header className="px-2 py-1.5">
        <div className="text-xs">{t(`seasons.${season.season}`)}</div>
        <div className="text-muted-foreground text-xs">
          {t('summary', {
            mastered: season.mastered,
            missing: season.missing,
            owned: season.owned,
            total: season.total,
          })}
          {season.dust !== null
            ? ` · ${t('dust', {
                dust: numberWithCommaSeparator(season.dust),
              })}`
            : ''}
          {season.other.length > 0
            ? ` · ${t('other-count', { count: season.other.length })}`
            : ''}
        </div>
      </header>
      {rows.length <= 0 ? (
        <div className="px-2 pb-1.5 text-muted-foreground text-xs">
          {t('empty-filter')}
        </div>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(4.25rem,1fr))] gap-1.5 px-2 pb-2">
          {rows.map((row) => (
            <SpriteTile
              key={`${season.season}-${row.id}-${row.variant}`}
              label={tileLabel(row, t)}
              row={row}
              onSelect={setSelected}
            />
          ))}
        </ul>
      )}
      <SpriteDetail row={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function SpriteTile({
  label,
  onSelect,
  row,
}: {
  label: string
  onSelect: (row: SpriteRow) => void
  row: SpriteRow
}) {
  const [failed, setFailed] = useState(false)

  return (
    <li>
      <button
        type="button"
        className={cn(
          'relative flex aspect-square w-full items-center justify-center overflow-hidden rounded border bg-muted/40',
          {
            'border-foreground/15': row.state === 'owned',
            'border-green-500': row.state === 'mastered',
            'opacity-40 grayscale': row.state === 'missing',
          },
        )}
        title={label}
        onClick={() => onSelect(row)}
      >
        {failed ? (
          <span className="line-clamp-3 px-1 text-center text-[10px] leading-3">
            {row.name}
          </span>
        ) : (
          <img
            alt=""
            className="h-full w-full object-contain"
            loading="lazy"
            src={spriteIconUrl(row.id)}
            onError={() => setFailed(true)}
          />
        )}
        {row.level !== null && (
          <span className="absolute bottom-0 right-0 bg-black/70 px-1 text-[10px] leading-4 text-white">
            {row.level}
          </span>
        )}
      </button>
    </li>
  )
}

function SpriteDetail({
  onClose,
  row,
}: {
  onClose: () => void
  row: SpriteRow | null
}) {
  const { t } = useTranslation(['account-management'], {
    keyPrefix: 'sprites',
  })
  const info = row ? spriteInfo(row.id) : null
  const variant =
    row && row.variant !== 'base' ? t(`variant.${row.variant}`) : ''
  const next = xpTarget(row)

  return (
    <Dialog
      open={row !== null}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogContent className="max-h-[85vh] max-w-sm overflow-y-auto">
        {row && (
          <>
            <DialogHeader>
              <DialogTitle>{row.name}</DialogTitle>
              <DialogDescription>
                {variant || t(`status.${row.state}`)}
              </DialogDescription>
            </DialogHeader>
            <img
              alt=""
              className="mx-auto h-24 w-24 object-contain"
              src={spriteIconUrl(row.id)}
            />
            <dl className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-2 gap-y-1 text-xs">
              <DetailRow label={t('detail.status')} value={t(`status.${row.state}`)} />
              {row.xp !== null && (
                <DetailRow
                  label={t('detail.level')}
                  value={
                    next === null
                      ? t('detail.level-max', {
                          level: row.level,
                          xp: numberWithCommaSeparator(row.xp),
                        })
                      : t('detail.level-progress', {
                          level: row.level,
                          next: numberWithCommaSeparator(next),
                          xp: numberWithCommaSeparator(row.xp),
                        })
                  }
                />
              )}
              {row.count !== null && (
                <DetailRow
                  label={t('detail.holding')}
                  value={t(row.count >= 2 ? 'detail.summoned' : 'detail.discovered')}
                />
              )}
              {info?.rarity && (
                <DetailRow
                  label={t('detail.rarity')}
                  value={rarityLabel(info.rarity, t)}
                />
              )}
              {info && (
                <DetailRow
                  label={t('detail.summon-cost')}
                  value={t('detail.summon-cost-value', {
                    cost: numberWithCommaSeparator(info.summonCost),
                  })}
                />
              )}
              {info?.hint && (
                <DetailRow label={t('detail.found')} value={info.hint} />
              )}
            </dl>
            {info?.description && (
              <div className="space-y-1">
                <div className="text-muted-foreground text-xs">
                  {t('detail.ability')}
                </div>
                <p className="text-sm">{info.description}</p>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </>
  )
}

function xpTarget(row: SpriteRow | null) {
  if (!row || row.level === null) {
    return null
  }

  return spriteXpNext(row.level)
}

function rarityLabel(
  rarity: string,
  t: (key: string, values?: Record<string, unknown>) => string,
) {
  const key = rarity.toLowerCase()

  if (
    key === 'rare' ||
    key === 'epic' ||
    key === 'legendary' ||
    key === 'mythic'
  ) {
    return t(`rarity.${key}`)
  }

  return rarity
}

function tileLabel(
  row: SpriteRow,
  t: (key: string, values?: Record<string, unknown>) => string,
) {
  const variant = row.variant === 'base' ? '' : ` · ${t(`variant.${row.variant}`)}`
  const level = row.level === null ? '' : ` · ${t('level', { level: row.level })}`

  return `${row.name}${variant} · ${t(`status.${row.state}`)}${level}`
}

function visibleRows(data: SpriteReport, filter: SpriteFilter) {
  if (filter === 'other') {
    return data.other
  }

  const catalog = data.rows.filter((row) => matchesFilter(row, filter))

  if (filter === 'all') {
    return [...catalog, ...data.other]
  }

  return catalog
}

function matchesFilter(row: SpriteRow, filter: SpriteFilter) {
  if (filter === 'all' || filter === 'other') {
    return true
  }

  if (filter === 'owned') {
    return row.state === 'owned' || row.state === 'mastered'
  }

  return row.state === filter
}
