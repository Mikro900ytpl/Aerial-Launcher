import type { CollectionBookSectionId } from '../../types/collection-book'
import { RarityType } from './resources'

/** Base max level by star tier (before max_level_bonus / supercharge). */
export const STAR_MAX_LEVEL: Record<number, number> = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
  6: 60,
}

export const COLLECTION_BOOK_SECTIONS: Array<{
  id: CollectionBookSectionId
  /** i18n key under collection-book.sections.* */
  labelKey: string
  group: 'heroes' | 'weapons' | 'other'
}> = [
  {
    id: 'heroes-commando',
    labelKey: 'heroes-commando',
    group: 'heroes',
  },
  {
    id: 'heroes-constructor',
    labelKey: 'heroes-constructor',
    group: 'heroes',
  },
  {
    id: 'heroes-ninja',
    labelKey: 'heroes-ninja',
    group: 'heroes',
  },
  {
    id: 'heroes-outlander',
    labelKey: 'heroes-outlander',
    group: 'heroes',
  },
  {
    id: 'heroes-other',
    labelKey: 'heroes-other',
    group: 'heroes',
  },
  {
    id: 'weapons-assault',
    labelKey: 'weapons-assault',
    group: 'weapons',
  },
  {
    id: 'weapons-shotgun',
    labelKey: 'weapons-shotgun',
    group: 'weapons',
  },
  {
    id: 'weapons-sniper',
    labelKey: 'weapons-sniper',
    group: 'weapons',
  },
  {
    id: 'weapons-pistol',
    labelKey: 'weapons-pistol',
    group: 'weapons',
  },
  {
    id: 'weapons-explosive',
    labelKey: 'weapons-explosive',
    group: 'weapons',
  },
  {
    id: 'weapons-melee',
    labelKey: 'weapons-melee',
    group: 'weapons',
  },
  {
    id: 'weapons-neon',
    labelKey: 'weapons-neon',
    group: 'weapons',
  },
  {
    id: 'weapons-expansion',
    labelKey: 'weapons-expansion',
    group: 'weapons',
  },
  {
    id: 'weapons-other',
    labelKey: 'weapons-other',
    group: 'weapons',
  },
  {
    id: 'traps',
    labelKey: 'traps',
    group: 'other',
  },
  {
    id: 'defenders',
    labelKey: 'defenders',
    group: 'other',
  },
  {
    id: 'survivors',
    labelKey: 'survivors',
    group: 'other',
  },
  {
    id: 'other',
    labelKey: 'other',
    group: 'other',
  },
]

export function parseStarTier(templateId: string): number {
  const tierMatch = templateId.match(/_t0([1-6])(?:_|$)/i)
  if (tierMatch) {
    return Number(tierMatch[1])
  }

  // Fallback from rarity suffix
  if (templateId.endsWith('_ur') || templateId.includes('_ur_')) {
    return 5
  }
  if (templateId.endsWith('_sr') || templateId.includes('_sr_')) {
    return 5
  }
  if (templateId.endsWith('_vr') || templateId.includes('_vr_')) {
    return 4
  }
  if (templateId.endsWith('_r') || templateId.includes('_r_')) {
    return 3
  }
  if (templateId.endsWith('_uc') || templateId.includes('_uc_')) {
    return 2
  }

  return 1
}

export function getMaxLevelForItem(
  templateId: string,
  maxLevelBonus = 0,
): number {
  const stars = parseStarTier(templateId)
  const base = STAR_MAX_LEVEL[stars] ?? 50

  return base + Math.max(0, maxLevelBonus)
}

export function classifySection(
  templateId: string,
): CollectionBookSectionId {
  const id = templateId.toLowerCase()

  if (id.startsWith('hero:')) {
    if (
      id.includes('commando') ||
      id.includes('soldier') ||
      id.includes('_com_')
    ) {
      return 'heroes-commando'
    }
    if (id.includes('constructor') || id.includes('_con_')) {
      return 'heroes-constructor'
    }
    if (id.includes('ninja') || id.includes('_nin_')) {
      return 'heroes-ninja'
    }
    if (id.includes('outlander') || id.includes('_out_')) {
      return 'heroes-outlander'
    }
    return 'heroes-other'
  }

  if (id.startsWith('defender:')) {
    return 'defenders'
  }

  if (id.startsWith('worker:')) {
    return 'survivors'
  }

  if (id.startsWith('schematic:')) {
    // Neon / "lamp" style sets
    if (
      id.includes('neon') ||
      id.includes('laser') ||
      id.includes('vacuum') ||
      id.includes('raygun') ||
      id.includes('zap')
    ) {
      return 'weapons-neon'
    }

    // Expansion / event-ish weapon sets
    if (
      id.includes('hydra') ||
      id.includes('dragon') ||
      id.includes('ratrod') ||
      id.includes('steampunk') ||
      id.includes('holiday') ||
      id.includes('birthday') ||
      id.includes('fortnitemares') ||
      id.includes('scavenger') ||
      id.includes('military') ||
      id.includes('winter') ||
      id.includes('stormking') ||
      id.includes('pirate') ||
      id.includes('spy') ||
      id.includes('retro') ||
      id.includes('boombox') ||
      id.includes('blackmetal') ||
      id.includes('flintlock') ||
      id.includes('medieval') ||
      id.includes('toy') ||
      id.includes('paper') ||
      id.includes('candy') ||
      id.includes('founders')
    ) {
      return 'weapons-expansion'
    }

    if (
      id.includes('assault') ||
      id.includes('ar_') ||
      id.includes('_ar') ||
      (id.includes('rifle') && !id.includes('sniper'))
    ) {
      return 'weapons-assault'
    }
    if (id.includes('shotgun') || id.includes('shell')) {
      return 'weapons-shotgun'
    }
    if (
      id.includes('sniper') ||
      id.includes('bow') ||
      id.includes('crossbow')
    ) {
      return 'weapons-sniper'
    }
    if (
      id.includes('pistol') ||
      id.includes('handcannon') ||
      id.includes('revolver')
    ) {
      return 'weapons-pistol'
    }
    if (
      id.includes('launcher') ||
      id.includes('explosive') ||
      id.includes('grenade') ||
      id.includes('rocket') ||
      id.includes('missile')
    ) {
      return 'weapons-explosive'
    }
    if (
      id.includes('melee') ||
      id.includes('sword') ||
      id.includes('axe') ||
      id.includes('scythe') ||
      id.includes('spear') ||
      id.includes('club') ||
      id.includes('hardware') ||
      id.includes('tool') ||
      id.includes('hammer') ||
      id.includes('knife')
    ) {
      return 'weapons-melee'
    }
    if (
      id.includes('trap') ||
      id.includes('ceiling') ||
      id.includes('floor') ||
      id.includes('wall_')
    ) {
      return 'traps'
    }

    return 'weapons-other'
  }

  return 'other'
}

export function rarityFromTemplate(templateId: string): RarityType {
  if (templateId.includes('_ur')) return RarityType.Mythic
  if (templateId.includes('_sr')) return RarityType.Legendary
  if (templateId.includes('_vr')) return RarityType.Epic
  if (templateId.includes('_r')) return RarityType.Rare
  if (templateId.includes('_uc')) return RarityType.Uncommon
  return RarityType.Common
}
