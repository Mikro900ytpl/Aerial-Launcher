export type ShopGrant = {
  templateId: string
  quantity: number
}

export type ShopCatalogEntry = {
  offerId: string
  devName?: string
  title?: string
  dailyLimit?: number
  weeklyLimit?: number
  monthlyLimit?: number
  sortPriority?: number
  prices?: Array<{
    currencyType?: string
    currencySubType?: string
    finalPrice?: number
  }>
  meta?: {
    PurchaseLimitingEventId?: string
    EventLimit?: string
  }
  metaInfo?: Array<{
    key?: string
    value?: string
  }>
  itemGrants?: Array<{
    templateId?: string
    quantity?: number
  }>
}

export type ShopSection = 'event' | 'weekly'
export type ShopLimitKind = 'daily' | 'weekly' | 'monthly' | 'event' | 'none'

export type ShopPurchaseState = {
  daily: Record<string, number>
  weekly: Record<string, number>
  monthly: Record<string, number>
  events: Array<{
    instanceId: string
    counts: Record<string, number>
  }>
}

export type ShopOfferLimit = {
  purchased: number
  remaining: number | null
  limit: number | null
  limitKind: ShopLimitKind
}

const GRANT_PRIORITY = [
  'schematic',
  'hero',
  'defender',
  'worker',
  'trap',
]

export const GOLD_TEMPLATE = 'AccountResource:eventcurrency_scaling'
export const WEEKLY_STOREFRONT = 'STWRotationalEventStorefront'
export const EVENT_STOREFRONT = 'STWSpecialEventStorefront'

export function shopSection(name: string): ShopSection | null {
  const normalized = name.toLowerCase()

  if (
    name === WEEKLY_STOREFRONT ||
    normalized.includes('rotational')
  ) {
    return 'weekly'
  }

  if (
    name === EVENT_STOREFRONT ||
    normalized.includes('specialevent') ||
    normalized.includes('special_event')
  ) {
    return 'event'
  }

  return null
}

export function primaryTemplateId(
  grants: Array<{ templateId?: string }>,
): string {
  const ids = grants
    .map((grant) => grant.templateId ?? '')
    .filter((id) => id.length > 0)

  for (const type of GRANT_PRIORITY) {
    const found = ids.find((id) =>
      id.toLowerCase().startsWith(`${type}:`),
    )

    if (found) {
      return found
    }
  }

  const nonResource = ids.find(
    (id) => !id.toLowerCase().startsWith('accountresource:'),
  )

  return nonResource ?? ids[0] ?? ''
}

export function catalogMeta(entry: ShopCatalogEntry) {
  const meta: {
    PurchaseLimitingEventId?: string
    EventLimit?: string
  } = {
    ...(entry.meta ?? {}),
  }

  for (const info of entry.metaInfo ?? []) {
    const key = info.key ?? ''
    const value = info.value ?? ''

    if (!value) {
      continue
    }

    if (key === 'EventLimit' && !meta.EventLimit) {
      meta.EventLimit = value
    }

    if (
      key === 'PurchaseLimitingEventId' &&
      !meta.PurchaseLimitingEventId
    ) {
      meta.PurchaseLimitingEventId = value
    }
  }

  return meta
}

export function goldPrice(entry: ShopCatalogEntry): {
  price: number
  currencyType: string
  currencySubType: string
} | null {
  const prices = entry.prices ?? []
  const gold =
    prices.find((price) =>
      (price.currencySubType ?? '')
        .toLowerCase()
        .includes('eventcurrency_scaling'),
    ) ??
    prices.find(
      (price) =>
        (price.currencyType ?? '') !== 'RealMoney' &&
        (price.currencySubType ?? '').toLowerCase().includes('eventcurrency'),
    )

  if (!gold) {
    return null
  }

  return {
    price: gold.finalPrice ?? 0,
    currencyType: gold.currencyType ?? 'GameItem',
    currencySubType: gold.currencySubType ?? GOLD_TEMPLATE,
  }
}

/** Wednesday 00:00 UTC. The STW weekly store resets then. */
export function stwWeekStart(date = new Date()): Date {
  const utc = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  )
  const daysSinceWednesday = (utc.getUTCDay() + 4) % 7

  utc.setUTCDate(utc.getUTCDate() - daysSinceWednesday)

  return utc
}

export function stwWeekKey(date = new Date()): string {
  return stwWeekStart(date).toISOString().slice(0, 10)
}

export function stwNextReset(date = new Date()): Date {
  const next = stwWeekStart(date)

  next.setUTCDate(next.getUTCDate() + 7)

  return next
}

export function utcDayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

export function monthStart(date = new Date()): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
}

export function purchaseListIfCurrent(
  block:
    | {
        lastInterval?: string
        purchaseList?: Record<string, number>
      }
    | undefined,
  intervalStartMs: number,
): Record<string, number> {
  if (!block?.purchaseList) {
    return {}
  }

  if (!block.lastInterval) {
    return block.purchaseList
  }

  const last = Date.parse(block.lastInterval)

  if (Number.isNaN(last) || last < intervalStartMs) {
    return {}
  }

  return block.purchaseList
}

function countOf(list: Record<string, number>, offerId: string) {
  return Number(list[offerId] ?? 0)
}

export function offerLimit(
  entry: ShopCatalogEntry,
  state: ShopPurchaseState,
): ShopOfferLimit {
  const caps: Array<{
    kind: ShopLimitKind
    limit: number
    purchased: number
  }> = []

  if ((entry.dailyLimit ?? -1) > 0) {
    caps.push({
      kind: 'daily',
      limit: entry.dailyLimit ?? 0,
      purchased: countOf(state.daily, entry.offerId),
    })
  }

  if ((entry.weeklyLimit ?? -1) > 0) {
    caps.push({
      kind: 'weekly',
      limit: entry.weeklyLimit ?? 0,
      purchased: countOf(state.weekly, entry.offerId),
    })
  }

  if ((entry.monthlyLimit ?? -1) > 0) {
    caps.push({
      kind: 'monthly',
      limit: entry.monthlyLimit ?? 0,
      purchased: countOf(state.monthly, entry.offerId),
    })
  }

  const eventLimit = Number(entry.meta?.EventLimit ?? '')
  const eventId = entry.meta?.PurchaseLimitingEventId ?? ''

  if (Number.isFinite(eventLimit) && eventLimit > 0) {
    const bucket =
      state.events.find((event) => event.instanceId === eventId) ??
      (eventId
        ? undefined
        : state.events.find((event) =>
            Object.prototype.hasOwnProperty.call(event.counts, entry.offerId),
          ))
    const purchased = bucket ? countOf(bucket.counts, entry.offerId) : 0

    caps.push({
      kind: 'event',
      limit: eventLimit,
      purchased,
    })
  }

  if (caps.length === 0) {
    return {
      purchased: 0,
      remaining: null,
      limit: null,
      limitKind: 'none',
    }
  }

  let chosen = caps[0]

  for (const cap of caps) {
    if (cap.limit - cap.purchased < chosen.limit - chosen.purchased) {
      chosen = cap
    }
  }

  return {
    purchased: Math.max(chosen.purchased, 0),
    remaining: Math.max(chosen.limit - chosen.purchased, 0),
    limit: chosen.limit,
    limitKind: chosen.kind,
  }
}

export function readEventPurchases(
  items: Record<
    string,
    {
      attributes?: {
        event_purchases?: unknown
        event_instance_id?: string
      }
    }
  >,
): ShopPurchaseState['events'] {
  const events: ShopPurchaseState['events'] = []

  Object.values(items ?? {}).forEach((item) => {
    const raw = item?.attributes?.event_purchases

    if (!raw || typeof raw !== 'object') {
      return
    }

    const record = raw as Record<string, unknown>
    const flat = numericMap(record)

    if (flat) {
      events.push({
        instanceId: item.attributes?.event_instance_id ?? '',
        counts: flat,
      })

      return
    }

    Object.entries(record).forEach(([eventId, value]) => {
      const nested = numericMap(value)

      if (!nested) {
        return
      }

      events.push({
        instanceId: eventId,
        counts: nested,
      })
    })
  })

  return events
}

function numericMap(value: unknown): Record<string, number> | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const entries = Object.entries(value as Record<string, unknown>)

  if (entries.length === 0) {
    return {}
  }

  if (!entries.every(([, entry]) => typeof entry === 'number')) {
    return null
  }

  return Object.fromEntries(entries) as Record<string, number>
}

export function shopItemSignature(templateIds: Array<string>) {
  return [...new Set(templateIds.filter(Boolean))].sort().join('|')
}

export function shopSignatureNeedsRun(
  doneSignature: string | undefined,
  signature: string,
) {
  const next = signature.split('|').filter(Boolean)

  if (next.length === 0) {
    return false
  }

  const done = new Set((doneSignature ?? '').split('|').filter(Boolean))

  return next.some((id) => !done.has(id))
}
