import { UpdateIcon } from '@radix-ui/react-icons'
import { createRoute } from '@tanstack/react-router'
import {
  BookOpen,
  Crosshair,
  Hammer,
  Rocket,
  Search,
  Shield,
  Swords,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Route as RootRoute } from '../../__root'

import { HomeBreadcrumb } from '../../../components/navigations/breadcrumb/home'
import { AccountSelectors } from '../../../components/selectors/accounts'
import { GoToTop } from '../../../components/go-to-top'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { Button } from '../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Badge } from '../../../components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion'
import { Switch } from '../../../components/ui/switch'

import { COLLECTION_BOOK_SECTIONS } from '../../../config/constants/collection-book'

import { useCollectionBookPage } from './-hooks'
import { useGetAccounts } from '../../../hooks/accounts'

import { numberWithCommaSeparator } from '../../../lib/parsers/numbers'
import { cn, parseCustomDisplayName } from '../../../lib/utils'

import type {
  CollectionBookAccountData,
  CollectionBookItem,
  CollectionBookSectionId,
} from '../../../types/collection-book'

const SECTION_ICONS: Record<CollectionBookSectionId, typeof BookOpen> = {
  'heroes-commando': Users,
  'heroes-constructor': Hammer,
  'heroes-ninja': Swords,
  'heroes-outlander': Crosshair,
  'heroes-other': Users,
  'weapons-assault': Crosshair,
  'weapons-shotgun': Target,
  'weapons-sniper': Crosshair,
  'weapons-pistol': Target,
  'weapons-explosive': Rocket,
  'weapons-melee': Swords,
  'weapons-neon': Zap,
  'weapons-expansion': BookOpen,
  'weapons-other': Crosshair,
  traps: Shield,
  defenders: Shield,
  survivors: Users,
  other: BookOpen,
}

const GROUP_ORDER = ['heroes', 'weapons', 'other'] as const

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/stw-operations/collection-book',
  component: () => {
    const { t } = useTranslation(['sidebar'])

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
                {t('stw-operations.options.collection-book')}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Content />
      </>
    )
  },
})

function Content() {
  const { t } = useTranslation(['stw-operations'])

  const {
    accountOptions,
    isDisabledForm,
    isLoading,
    isActing,
    parsedSelectedAccounts,
    parsedSelectedTags,
    tagOptions,
    accountsData,
    targetLevel,

    updateAccounts,
    updateTags,
    setTargetLevel,
    handleLoad,
    handleUpgradeAll,
    handleUpgradeSection,
    handleUpgradeItem,
    handleSlotItem,
    handleSlotSection,
  } = useCollectionBookPage()

  const presets = [10, 20, 30, 40, 50]

  return (
    <>
      <div className="flex flex-grow">
        <div className="flex flex-col gap-5 items-center justify-center w-full px-2">
          <Card
            className="max-w-3xl w-full shadow-sm"
            id="collection-book-card"
          >
            <CardHeader className="border-b space-y-2">
              <CardTitle className="flex gap-2 items-center text-lg">
                <span className="bg-primary/10 flex p-1.5 rounded-md">
                  <BookOpen className="size-5 text-primary" />
                </span>
                {t('collection-book.title')}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {t('collection-book.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 pt-6">
              <AccountSelectors
                accounts={{
                  options: accountOptions,
                  value: parsedSelectedAccounts,
                }}
                tags={{
                  options: tagOptions,
                  value: parsedSelectedTags,
                }}
                onUpdateAccounts={updateAccounts}
                onUpdateTags={updateTags}
              />

              <div className="bg-muted/40 border space-y-3 p-3 rounded-lg">
                <Label
                  htmlFor="target-level"
                  className="text-sm font-medium"
                >
                  {t('collection-book.form.target-level')}
                </Label>
                <div className="flex flex-wrap gap-2 items-center">
                  <Input
                    id="target-level"
                    type="number"
                    min={1}
                    max={60}
                    className="w-20 bg-background"
                    value={targetLevel}
                    onChange={(event) =>
                      setTargetLevel(Number(event.target.value) || 1)
                    }
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((level) => (
                      <Button
                        key={level}
                        type="button"
                        size="sm"
                        variant={
                          targetLevel === level ? 'default' : 'outline'
                        }
                        className="h-8 min-w-[3.25rem]"
                        onClick={() => setTargetLevel(level)}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20">
              <Button
                className="w-full"
                onClick={handleLoad}
                disabled={isDisabledForm}
              >
                {isLoading ? (
                  <UpdateIcon className="animate-spin" />
                ) : (
                  <>
                    <BookOpen className="mr-2 size-4" />
                    {t('collection-book.form.load')}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {accountsData.length > 0 && (
            <div className="gap-4 grid max-w-3xl w-full">
              {accountsData.map((accountData) => (
                <AccountCollectionPanel
                  key={accountData.accountId}
                  data={accountData}
                  targetLevel={targetLevel}
                  isActing={isActing}
                  onUpgradeAll={handleUpgradeAll}
                  onUpgradeSection={handleUpgradeSection}
                  onUpgradeItem={handleUpgradeItem}
                  onSlotItem={handleSlotItem}
                  onSlotSection={handleSlotSection}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <GoToTop containerId="collection-book-card" />
    </>
  )
}

function AccountCollectionPanel({
  data,
  targetLevel,
  isActing,
  onUpgradeAll,
  onUpgradeSection,
  onUpgradeItem,
  onSlotItem,
  onSlotSection,
}: {
  data: CollectionBookAccountData
  targetLevel: number
  isActing: boolean
  onUpgradeAll: (accountId: string) => void
  onUpgradeSection: (
    accountId: string,
    sectionId: CollectionBookSectionId,
  ) => void
  onUpgradeItem: (accountId: string, item: CollectionBookItem) => void
  onSlotItem: (accountId: string, itemId: string) => void
  onSlotSection: (
    accountId: string,
    sectionId: CollectionBookSectionId,
  ) => void
}) {
  const { t } = useTranslation(['stw-operations'])
  const { accountList } = useGetAccounts()
  const account = accountList[data.accountId]
  const [filter, setFilter] = useState('')
  const [onlyBelow, setOnlyBelow] = useState(true)

  const belowTarget = useMemo(
    () =>
      data.items.filter(
        (item) =>
          item.level < targetLevel && item.level < item.maxLevel,
      ).length,
    [data.items, targetLevel],
  )

  const sectionsMeta = useMemo(() => {
    const map = new Map(
      COLLECTION_BOOK_SECTIONS.map((section) => [section.id, section]),
    )

    return data.sections.map((section) => {
      const meta = map.get(section.id)
      let items = section.items

      if (onlyBelow) {
        items = items.filter(
          (item) =>
            item.level < targetLevel && item.level < item.maxLevel,
        )
      }

      const q = filter.trim().toLowerCase()
      if (q) {
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.templateId.toLowerCase().includes(q) ||
            item.rarity.toLowerCase().includes(q),
        )
      }

      return {
        ...section,
        meta,
        group: meta?.group ?? 'other',
        items,
        below: section.items.filter(
          (item) =>
            item.level < targetLevel && item.level < item.maxLevel,
        ).length,
      }
    }).filter((section) => section.items.length > 0)
  }, [data.sections, targetLevel, onlyBelow, filter])

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      sections: sectionsMeta.filter((s) => s.group === group),
    })).filter((g) => g.sections.length > 0)
  }, [sectionsMeta])

  return (
    <Card className="w-full overflow-hidden shadow-sm">
      <CardHeader className="border-b bg-muted/30 space-y-3 pb-3">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <CardTitle className="text-base truncate">
            {parseCustomDisplayName(account)}
          </CardTitle>
          {data.error && (
            <Badge variant="destructive">
              {t(`collection-book.errors.${data.error}`, {
                defaultValue: data.error,
              })}
            </Badge>
          )}
        </div>

        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          <StatChip
            label={t('collection-book.stats.items', {
              count: data.items.length,
            })}
          />
          <StatChip
            label={t('collection-book.stats.below', {
              count: belowTarget,
            })}
            accent
          />
          <StatChip
            label={t('collection-book.stats.cb-level', {
              level: data.collectionBookLevel,
            })}
          />
          <StatChip
            label={t('collection-book.stats.xp', {
              xp: numberWithCommaSeparator(data.accountXp),
            })}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            size="sm"
            className="shrink-0"
            disabled={isActing || belowTarget <= 0}
            onClick={() => onUpgradeAll(data.accountId)}
          >
            {isActing ? (
              <UpdateIcon className="animate-spin" />
            ) : (
              <>
                <Target className="mr-1.5 size-3.5" />
                {t('collection-book.form.upgrade-all', {
                  level: targetLevel,
                })}
              </>
            )}
          </Button>

          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('collection-book.form.filter')}
              className="bg-background h-8 pl-8"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          </div>

          <label className="flex gap-2 items-center shrink-0 text-muted-foreground text-xs cursor-pointer select-none">
            <Switch
              checked={onlyBelow}
              onCheckedChange={setOnlyBelow}
            />
            {t('collection-book.form.only-below')}
          </label>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-5">
        {grouped.length <= 0 ? (
          <div className="border border-dashed py-10 rounded-lg text-center text-muted-foreground text-sm">
            {t('collection-book.actions.empty')}
          </div>
        ) : (
          grouped.map(({ group, sections }) => (
            <div
              key={group}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 px-0.5">
                <h3 className="font-semibold text-sm tracking-wide uppercase text-muted-foreground">
                  {t(`collection-book.groups.${group}`)}
                </h3>
                <div className="bg-border flex-1 h-px" />
                <span className="text-muted-foreground text-xs tabular-nums">
                  {sections.reduce((n, s) => n + s.items.length, 0)}
                </span>
              </div>

              <Accordion
                type="multiple"
                className="w-full"
              >
                {sections.map((section) => {
                  const Icon = SECTION_ICONS[section.id] ?? BookOpen
                  const label = t(
                    `collection-book.sections.${section.meta?.labelKey ?? section.id}`,
                  )
                  const progress =
                    section.itemCount > 0
                      ? Math.round(
                          ((section.itemCount - section.below) /
                            section.itemCount) *
                            100,
                        )
                      : 100

                  return (
                    <AccordionItem
                      key={section.id}
                      value={section.id}
                      className="border rounded-lg mb-2 px-3 data-[state=open]:bg-muted/20"
                    >
                      <AccordionTrigger className="hover:no-underline py-3">
                        <div className="flex flex-1 flex-col gap-2 pr-3 text-left">
                          <div className="flex flex-wrap gap-2 items-center">
                            <Icon className="size-4 text-primary shrink-0" />
                            <span className="font-medium text-sm">
                              {label}
                            </span>
                            <Badge
                              variant="secondary"
                              className="h-5 text-[0.65rem] tabular-nums"
                            >
                              {section.items.length}
                              {onlyBelow ? ` / ${section.itemCount}` : ''}
                            </Badge>
                            {section.below > 0 ? (
                              <Badge
                                variant="outline"
                                className="h-5 border-amber-500/40 text-amber-600 dark:text-amber-400 text-[0.65rem]"
                              >
                                {t('collection-book.stats.below', {
                                  count: section.below,
                                })}
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="h-5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-[0.65rem]"
                              >
                                OK
                              </Badge>
                            )}
                          </div>
                          <div className="bg-muted h-1.5 overflow-hidden rounded-full w-full max-w-xs">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all',
                                progress >= 100
                                  ? 'bg-emerald-500'
                                  : 'bg-primary',
                              )}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pb-3">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled={isActing || section.below <= 0}
                            onClick={() =>
                              onUpgradeSection(
                                data.accountId,
                                section.id,
                              )
                            }
                          >
                            {t(
                              'collection-book.actions.upgrade-section',
                              { level: targetLevel },
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={
                              isActing || section.items.length <= 0
                            }
                            onClick={() =>
                              onSlotSection(data.accountId, section.id)
                            }
                          >
                            {t('collection-book.actions.slot-section')}
                          </Button>
                        </div>

                        <div className="gap-1.5 grid max-h-72 overflow-y-auto pr-0.5">
                          {section.items.map((item) => {
                            const canUpgrade =
                              item.level < targetLevel &&
                              item.level < item.maxLevel
                            const levelPct = Math.min(
                              100,
                              Math.round(
                                (item.level / Math.max(item.maxLevel, 1)) *
                                  100,
                              ),
                            )

                            return (
                              <div
                                key={item.itemId}
                                className={cn(
                                  'bg-background border flex flex-col gap-2 px-2.5 py-2 rounded-md sm:flex-row sm:items-center',
                                  !canUpgrade && 'opacity-60',
                                )}
                              >
                                <div className="flex flex-1 gap-2.5 items-center min-w-0">
                                  {item.imageUrl && (
                                    <img
                                      src={item.imageUrl}
                                      alt=""
                                      className="size-9 shrink-0 rounded"
                                    />
                                  )}
                                  <div className="min-w-0 flex-1 space-y-1">
                                    <div className="font-medium text-sm truncate">
                                      {item.name}
                                    </div>
                                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-muted-foreground text-xs">
                                      <span className="tabular-nums font-medium text-foreground/80">
                                        {t('collection-book.item.level', {
                                          level: item.level,
                                          max: item.maxLevel,
                                        })}
                                      </span>
                                      <span>
                                        {t('collection-book.item.stars', {
                                          count: item.starTier,
                                        })}
                                      </span>
                                      <span>{item.rarity}</span>
                                    </div>
                                    <div className="bg-muted h-1 overflow-hidden rounded-full w-full max-w-[10rem]">
                                      <div
                                        className={cn(
                                          'h-full rounded-full',
                                          levelPct >= 100
                                            ? 'bg-emerald-500'
                                            : 'bg-sky-500',
                                        )}
                                        style={{
                                          width: `${levelPct}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-1.5 shrink-0">
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className="h-8"
                                    disabled={isActing || !canUpgrade}
                                    onClick={() =>
                                      onUpgradeItem(
                                        data.accountId,
                                        item,
                                      )
                                    }
                                  >
                                    {t('collection-book.item.upgrade')}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8"
                                    disabled={isActing}
                                    onClick={() =>
                                      onSlotItem(
                                        data.accountId,
                                        item.itemId,
                                      )
                                    }
                                  >
                                    {t('collection-book.item.slot')}
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

function StatChip({
  label,
  accent,
}: {
  label: string
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        'border px-2.5 py-1.5 rounded-md text-center text-xs font-medium',
        accent
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
          : 'bg-background',
      )}
    >
      {label}
    </div>
  )
}
