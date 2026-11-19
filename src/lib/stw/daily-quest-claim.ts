import type { DailyQuestClaimSummary } from '../../types/daily-quests'

export function describeDailyQuestClaim(
  summary: DailyQuestClaimSummary | undefined,
  t: (
    key: string,
    options?: { count?: number; ok?: number; total?: number },
  ) => string,
) {
  if (!summary || summary.total <= 0) {
    return t('daily-quests.notifications.claim-empty')
  }

  if (summary.failures.length === 0) {
    return t('daily-quests.notifications.claimed', { count: summary.ok })
  }

  const detail = summary.failures
    .slice(0, 3)
    .map((row) => `${row.displayName || row.accountId}: ${row.errorMessage}`)
    .join(' | ')
  const extra =
    summary.failures.length > 3 ? ` (+${summary.failures.length - 3})` : ''

  return `${t('daily-quests.notifications.claimed-partial', {
    ok: summary.ok,
    total: summary.total,
  })} ${detail}${extra}`
}
