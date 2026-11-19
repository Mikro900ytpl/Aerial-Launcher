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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../../../components/ui/card'
import { GoToTop } from '../../../components/go-to-top'

import type { BanStatusResult } from '../../../state/account-management/ban-status'

import { useBanStatusData } from './-hooks'

import { getShortDateFormat } from '../../../lib/dates'
import { cn, parseCustomDisplayName } from '../../../lib/utils'
import { useGetAccounts } from '../../../hooks/accounts'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/account-management/ban-status',
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
              <BreadcrumbPage>{t('options.ban-status')}</BreadcrumbPage>
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
    keyPrefix: 'ban-status',
  })
  const {
    accounts,
    banned,
    banStatusUpdateAccounts,
    banStatusUpdateTags,
    clean,
    handleCheck,
    isDisabledForm,
    isLoading,
    parsedSelectedAccounts,
    parsedSelectedTags,
    results,
    tags,
  } = useBanStatusData()

  return (
    <>
      <div className="flex flex-grow">
        <div className="flex items-center justify-center w-full">
          <div className="max-w-lg space-y-4 w-full">
            <Card className="w-full" id="ban-status-card">
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
                  onUpdateAccounts={banStatusUpdateAccounts}
                  onUpdateTags={banStatusUpdateTags}
                />
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleCheck}
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
                <div className="text-center text-muted-foreground text-sm">
                  {t('summary', {
                    banned,
                    clean,
                  })}
                </div>
                {results.map((item) => (
                  <BanStatusRow data={item} key={item.accountId} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <GoToTop containerId="ban-status-card" />
    </>
  )
}

function BanStatusRow({ data }: { data: BanStatusResult }) {
  const { t } = useTranslation(['account-management'], {
    keyPrefix: 'ban-status',
  })
  const { accountList } = useGetAccounts()
  const account = accountList[data.accountId]
  const name = account ? parseCustomDisplayName(account) : data.displayName

  return (
    <article className="border rounded">
      <header className="bg-muted-foreground/5 flex items-center gap-2 px-2 py-2">
        <div className="min-w-0 truncate text-sm">{name}</div>
        <div
          className={cn('ml-auto flex-shrink-0 text-sm font-bold', {
            'text-[#ff6868]': data.kind === 'banned',
            'text-green-600': data.kind === 'clean',
            'text-muted-foreground': data.kind === 'expired',
            'text-yellow-600': data.kind === 'error',
          })}
        >
          {t(`status.${data.kind}`)}
        </div>
      </header>
      {data.kind !== 'clean' && (
        <div className="px-2 py-1.5 text-muted-foreground text-xs space-y-0.5">
          {data.errorMessage && <div>{data.errorMessage}</div>}
          {data.reasons.length > 0 && (
            <div>
              {t('fields.reason')}: {data.reasons.join(', ')}
            </div>
          )}
          {data.startedAt && (
            <div>
              {t('fields.started')}: {getShortDateFormat(data.startedAt)}
            </div>
          )}
          {data.kind === 'banned' && (
            <div>
              {t('fields.remaining')}: {remainingLabel(data, t)}
            </div>
          )}
          {data.endsAt && (
            <div>
              {t(data.kind === 'expired' ? 'fields.ended' : 'fields.ends')}:{' '}
              {getShortDateFormat(data.endsAt)}
            </div>
          )}
          {data.durationDays !== null && data.durationDays > 0 && (
            <div>
              {t('fields.duration')}: {formatDays(data.durationDays)}
            </div>
          )}
          {data.detail && <div>{data.detail}</div>}
        </div>
      )}
    </article>
  )
}

function formatDays(days: number) {
  if (Number.isInteger(days)) {
    return String(days)
  }

  return String(Math.round(days * 10) / 10)
}

function remainingLabel(
  data: BanStatusResult,
  t: ReturnType<typeof useTranslation>['t'],
) {
  if (data.permanent || !data.endsAt) {
    return t('status.permanent')
  }

  const ms = Date.parse(data.endsAt) - Date.now()

  if (!Number.isFinite(ms) || ms <= 0) {
    return t('status.expired')
  }

  const totalMinutes = Math.floor(ms / 60000)
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60

  return t('remaining', { days, hours, minutes })
}
