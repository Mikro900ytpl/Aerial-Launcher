const PERMANENT_DAYS = 3650
const DAY_MS = 24 * 60 * 60 * 1000

export type BanStatusKind = 'clean' | 'banned' | 'expired' | 'error'

export type ParsedBanStatus = {
  kind: BanStatusKind
  permanent: boolean
  reasons: string[]
  startedAt: string | null
  endsAt: string | null
  durationDays: number | null
  detail: string | null
}

const cleanBan = (): ParsedBanStatus => ({
  kind: 'clean',
  permanent: false,
  reasons: [],
  startedAt: null,
  endsAt: null,
  durationDays: null,
  detail: null,
})

function asRecord(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  return value as Record<string, unknown>
}

function reasonsOf(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0,
  )
}

function detailOf(record: Record<string, unknown>) {
  const parts = [record.additionalInfo, record.exploitProgramName].filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0,
  )

  return parts.join(' · ') || null
}

/** Gameplay ban from common_core stats.attributes.ban_status. */
export function parseBanRecord(raw: unknown, now = Date.now()): ParsedBanStatus {
  const record = asRecord(raw)

  if (!record) {
    return cleanBan()
  }

  const started = record.bBanHasStarted === true
  const reasons = reasonsOf(record.banReasons)
  const days =
    typeof record.banDurationDays === 'number' &&
    Number.isFinite(record.banDurationDays)
      ? record.banDurationDays
      : 0
  const startRaw =
    typeof record.banStartTimeUtc === 'string' ? record.banStartTimeUtc : ''
  const startMs = Date.parse(startRaw)
  const startValid =
    Number.isFinite(startMs) &&
    startMs > Date.parse('2000-01-01T00:00:00.000Z') &&
    !startRaw.startsWith('9999')
  const detail = detailOf(record)

  if (!started && reasons.length === 0 && days <= 0) {
    return cleanBan()
  }

  if (days >= PERMANENT_DAYS || days < 0) {
    return {
      kind: 'banned',
      permanent: true,
      reasons,
      startedAt: startValid ? new Date(startMs).toISOString() : null,
      endsAt: null,
      durationDays: null,
      detail,
    }
  }

  if (startValid && days > 0) {
    const end = startMs + days * DAY_MS
    const active = end > now

    return {
      kind: active ? 'banned' : 'expired',
      permanent: false,
      reasons,
      startedAt: new Date(startMs).toISOString(),
      endsAt: new Date(end).toISOString(),
      durationDays: days,
      detail,
    }
  }

  if (started && (reasons.length > 0 || startValid)) {
    return {
      kind: 'banned',
      permanent: true,
      reasons,
      startedAt: startValid ? new Date(startMs).toISOString() : null,
      endsAt: null,
      durationDays: null,
      detail,
    }
  }

  return cleanBan()
}

export function parseProfileBan(attributes: unknown, now = Date.now()) {
  const record = asRecord(attributes)
  const current = parseBanRecord(record?.ban_status, now)

  if (current.kind === 'banned') {
    return current
  }

  const history = record?.ban_history
  const historyItems = Array.isArray(history) ? history : history ? [history] : []

  for (const item of historyItems) {
    const parsed = parseBanRecord(item, now)

    if (parsed.kind === 'banned') {
      return parsed
    }
  }

  return current
}
