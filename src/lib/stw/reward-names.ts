import dailyQuests from '../../locales/en-US/stw-operations/daily-quests.json'

const QUEST_NAMES = dailyQuests.quests as Record<string, string>

const BANNER_NAMES: Record<string, string> = {
  bannertoken: 'Banner',
  homebasebannercolor: 'Banner Color',
  homebasebannericon: 'Banner Icon',
}

/** Homebase banners are not in the item catalog, so the raw template prefix leaked into History. */
export function bannerRewardName(itemType: string) {
  const type = itemType.split(':')[0]?.toLowerCase() ?? ''

  return BANNER_NAMES[type] ?? ''
}

/** English daily-quest names. Other completed quests get a readable id so each row stays distinct. */
export function questRewardTitle(templateId?: string | null) {
  if (!templateId) {
    return null
  }

  const raw = templateId.replace(/^Quest:/i, '').trim()

  if (!raw) {
    return null
  }

  const keys = [
    raw,
    raw.toLowerCase(),
    raw.replace(/^quest_/i, ''),
    raw.replace(/^quest_/i, '').toLowerCase(),
  ]

  for (const key of keys) {
    const name = QUEST_NAMES[key]

    if (name) {
      return name
    }
  }

  const cleaned = raw
    .replace(/^quest_/i, '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!cleaned) {
    return null
  }

  return cleaned.replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
}

/** Quest names written on one claim notification. */
export function claimedQuestTitles(notification: {
  quests?: Array<{ title?: string | null }> | null
  title?: string | null
}) {
  const fromList = (notification.quests ?? [])
    .map((quest) => quest.title?.trim() ?? '')
    .filter((title) => title.length > 0)

  if (fromList.length > 0) {
    return fromList
  }

  const title = notification.title?.trim()

  return title ? [title] : []
}
