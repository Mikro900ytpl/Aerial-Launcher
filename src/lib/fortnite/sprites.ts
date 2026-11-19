import { CH7S3_SPRITES, CH7S4_SPRITES } from './sprite-seasons'
import { SPRITE_INFO } from './sprite-info'

export type SpriteVariant =
  | 'base'
  | 'fortune'
  | 'cursed'
  | 'gold'
  | 'cheat-master'
  | 'loot-hacker'
  | 'bounty-hunter'
  | 'trick-treat'
  | 'quack'
  | 'candy'
  | 'galaxy'
  | 'galactic'
  | 'gem'
  | 'holofoil'
  | 'cube'
  | 'other'

export type SpriteRowState = 'owned' | 'missing' | 'mastered'

export type SpriteScope = 'current' | 'all'

export type SpriteSeasonId = 'current' | 'ch7s4' | 'ch7s3'

export type SpriteCatalogEntry = {
  id: string
  name: string
  variant: Exclude<SpriteVariant, 'other'>
}

export type SpriteRow = {
  count: number | null
  id: string
  level: number | null
  name: string
  state: SpriteRowState
  variant: SpriteVariant
  xp: number | null
}

export type SpriteReport = {
  dust: number | null
  mastered: number
  missing: number
  other: Array<SpriteRow>
  owned: number
  rows: Array<SpriteRow>
  total: number
}

export type SpriteSeasonReport = SpriteReport & {
  season: SpriteSeasonId
}

export type SpriteCheckResult = {
  accountId: string
  displayName: string
  errorMessage: string | null
  seasons: Array<SpriteSeasonReport>
}

const CURRENT_SUFFIX = {
  base: 'A',
  fortune: 'Jeweled',
  cursed: 'Cursed',
} as const

/** Released Treasure Hunters forms as of 15 Nov 2026. Gold and Sir Oscar are still scheduled later. */
const FAMILIES: Array<{
  name: string
  stem: string
  variants: Array<keyof typeof CURRENT_SUFFIX>
}> = [
  {
    name: "Halfpeel'd",
    stem: 'PeelyBones',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Re-Pete',
    stem: 'Parrot',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: "Barry O'Fish",
    stem: 'BarrelOfFish',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Wayfinder',
    stem: 'Compass',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Chester',
    stem: 'TreasureChest',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Kelper',
    stem: 'UnbotheredFish',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Exmarks',
    stem: 'TreasureMap',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: "Lil' Squibbly",
    stem: 'Squibbly',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Squiplash',
    stem: 'PirateCalamari',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: "Lil' Flacko",
    stem: 'PlaymakerBrewery',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: "Lil' Uzi Vert Jr.",
    stem: 'RookGecko',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Plundarrgh',
    stem: 'CoinPile',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Mini Miku',
    stem: 'DaffodilChurn',
    variants: ['base', 'fortune', 'cursed'],
  },
  {
    name: 'Transponder Snail',
    stem: 'FeedJet',
    variants: ['base'],
  },
  {
    name: 'Sweet Dreams',
    stem: 'StarLight',
    variants: ['base'],
  },
  {
    name: 'Zee',
    stem: 'YortMelee',
    variants: ['base'],
  },
]

const LEVEL_XP = [0, 400, 1000, 2200, 4000]
const CURRENCY_KEY = 'currency_extractionpoints'

const SUFFIX_VARIANT: Record<string, Exclude<SpriteVariant, 'other'>> = {
  a: 'base',
  base: 'base',
  jeweled: 'fortune',
  cursed: 'cursed',
  liquidgold: 'gold',
  gold: 'gold',
  cheatmaster: 'cheat-master',
  loothacker: 'loot-hacker',
  reaper: 'bounty-hunter',
  tricktreat: 'trick-treat',
  quack: 'quack',
  candy: 'candy',
  galaxy: 'galaxy',
  galactic: 'galactic',
  gem: 'gem',
  holofoil: 'holofoil',
  cube: 'cube',
}

const VARIANT_ORDER: Record<SpriteVariant, number> = {
  base: 0,
  fortune: 1,
  cursed: 2,
  gold: 3,
  'cheat-master': 4,
  'loot-hacker': 5,
  'bounty-hunter': 6,
  'trick-treat': 7,
  quack: 8,
  candy: 9,
  galaxy: 10,
  galactic: 11,
  gem: 12,
  holofoil: 13,
  cube: 14,
  other: 15,
}

export const CURRENT_MODULE_ID = '05b7e211-c684-4622-a9e2-10e6ede94d60'
export const CH7S4_MODULE_ID = '828c9446-3eb8-497e-a282-d95b92243c14'
export const CH7S3_MODULE_ID = '70329e8f-f377-4a73-90cf-76b7ace87a07'

export const CURRENT_SPRITES: Array<SpriteCatalogEntry> = FAMILIES.flatMap(
  (family) =>
    family.variants.map((variant) => ({
      id: `${family.stem}_Variant_${CURRENT_SUFFIX[variant]}`,
      name: family.name,
      variant,
    })),
)

const SEASONS: Array<{
  catalog: Array<SpriteCatalogEntry>
  id: SpriteSeasonId
  moduleId: string
}> = [
  { catalog: CURRENT_SPRITES, id: 'current', moduleId: CURRENT_MODULE_ID },
  { catalog: CH7S4_SPRITES, id: 'ch7s4', moduleId: CH7S4_MODULE_ID },
  { catalog: CH7S3_SPRITES, id: 'ch7s3', moduleId: CH7S3_MODULE_ID },
]

type HeldRelic = {
  count: number
  id: string
  mastered: boolean
  xp: number
}

type ParsedModule = {
  dust: number | null
  moduleId: string
  relics: Array<HeldRelic>
}

type RelicModule = {
  counts?: Record<string, unknown>
  entitlementMetadata?: Record<string, unknown>
  moduleId?: unknown
}

export function spriteModuleFilters(scope: SpriteScope) {
  const seasons = scope === 'all' ? SEASONS : SEASONS.slice(0, 1)

  return seasons.map((season) => `${season.moduleId}:*`).join(',')
}

const ICON_SLUG_OVERRIDE: Record<string, string> = {
  '8BitBlaster_Variant_A': '8bitblastersprite_variant_a',
  '8BitBlaster_Variant_CheatMaster': '8bitblastersprite_variant_cheatmaster',
  '8BitBlaster_Variant_Gold': '8bitblastersprite_variant_gold',
  '8BitBlaster_Variant_LootHacker': '8bitblastersprite_variant_loothacker',
  '8BitBlaster_Variant_Reaper': '8bitblastersprite_variant_reaper',
  '8BitBlaster_Variant_TrickTreat': '8bitblastersprite_variant_tricktreat',
  CokeParmesan_Variant_A: 'cokeparmesansprite_variant_a',
  Dwarf_Variant_A: 'dwarfsprite_variant_a',
  Dwarf_Variant_CheatMaster: 'dwarfsprite_variant_cheatmaster',
  Dwarf_Variant_Gold: 'dwarfsprite_variant_gold',
  Dwarf_Variant_LootHacker: 'dwarfsprite_variant_loothacker',
  Dwarf_Variant_Quack: 'dwarfsprite_variant_quack',
  Dwarf_Variant_Reaper: 'dwarfsprite_variant_reaper',
  Dwarf_Variant_TrickTreat: 'dwarfsprite_variant_tricktreat',
  Jonesy_Variant_A: 'jonesysprite_variant_a',
  Jonesy_Variant_CheatMaster: 'jonesysprite_variant_cheatmaster',
  Jonesy_Variant_Gold: 'jonesysprite_variant_gold',
  Jonesy_Variant_LootHacker: 'jonesysprite_variant_loothacker',
  Jonesy_Variant_Quack: 'jonesysprite_variant_quack',
  Jonesy_Variant_Reaper: 'jonesysprite_variant_reaper',
  Jonesy_Variant_TrickTreat: 'jonesysprite_variant_tricktreat',
  Klombo_Variant_A: 'klombosprite_variant_a',
  Klombo_Variant_CheatMaster: 'klombosprite_variant_cheatmaster',
  Klombo_Variant_Gold: 'klombosprite_variant_gold',
  Klombo_Variant_LootHacker: 'klombosprite_variant_loothacker',
  Klombo_Variant_Quack: 'klombosprite_variant_quack',
  Klombo_Variant_Reaper: 'klombosprite_variant_reaper',
  Klombo_Variant_TrickTreat: 'klombosprite_variant_tricktreat',
  PedicureAntacidSprite_Variant_A: 'pedicureantacidsprite_0',
  WinnerE_Variant_A: 'winneresprite_variant_a',
  WinnerE_Variant_CheatMaster: 'winneresprite_variant_cheatmaster',
  WinnerE_Variant_Gold: 'winneresprite_variant_gold',
  WinnerE_Variant_LootHacker: 'winneresprite_variant_loothacker',
  WinnerE_Variant_Reaper: 'winneresprite_variant_reaper',
  WinnerE_Variant_TrickTreat: 'winneresprite_variant_tricktreat',
}

export function spriteIconUrl(id: string) {
  const slug = ICON_SLUG_OVERRIDE[id] ?? id.trim().toLowerCase()

  return `https://cdn.fn-api.cc/sprites/${encodeURIComponent(slug)}/icon.png`
}

export function normalizeRelicId(id: string) {
  return id
    .trim()
    .toLowerCase()
    .replace(/^esd_/, '')
    .replace(/sprite(?=_variant_|_variation_)/, '')
    .replace('_variation_', '_variant_')
}

const infoByRelicKey = new Map(
  Object.entries(SPRITE_INFO).map(([id, info]) => [normalizeRelicId(id), info]),
)

export function spriteLevel(xp: number) {
  let level = 1

  for (let index = 1; index < LEVEL_XP.length; index += 1) {
    if (xp >= LEVEL_XP[index]) {
      level = index + 1
    }
  }

  return level
}

export function spriteXpNext(level: number) {
  if (level < 1 || level >= LEVEL_XP.length) {
    return null
  }

  return LEVEL_XP[level]
}

export function spriteInfo(id: string) {
  return SPRITE_INFO[id] ?? infoByRelicKey.get(normalizeRelicId(id)) ?? null
}

export function buildSpriteReports(
  modules: Array<unknown>,
  scope: SpriteScope,
): Array<SpriteSeasonReport> {
  const parsed = modules.flatMap(readModule)
  const seasons = scope === 'all' ? SEASONS : SEASONS.slice(0, 1)

  return seasons.map((season) => ({
    season: season.id,
    ...reportFor(
      parsed.find((module) => module.moduleId === season.moduleId),
      season.catalog,
    ),
  }))
}

function reportFor(
  module: ParsedModule | undefined,
  catalog: Array<SpriteCatalogEntry>,
): SpriteReport {
  const held = new Map<string, HeldRelic>()

  module?.relics.forEach((relic) => {
    held.set(normalizeRelicId(relic.id), relic)
  })

  const catalogKeys = new Set(catalog.map((entry) => normalizeRelicId(entry.id)))
  const rows = catalog
    .map((entry) => rowFromCatalog(entry, held.get(normalizeRelicId(entry.id))))
    .toSorted(compareRows)
  const other = [...held.values()]
    .filter((relic) => !catalogKeys.has(normalizeRelicId(relic.id)))
    .map((relic) => rowFromHeld(relic))
    .toSorted(compareRows)
  const mastered = rows.filter((row) => row.state === 'mastered').length
  const missing = rows.filter((row) => row.state === 'missing').length

  return {
    dust: module?.dust ?? null,
    mastered,
    missing,
    other,
    owned: rows.length - missing,
    rows,
    total: rows.length,
  }
}

function rowFromCatalog(
  entry: SpriteCatalogEntry,
  relic: HeldRelic | undefined,
): SpriteRow {
  if (!relic) {
    return {
      count: null,
      id: entry.id,
      level: null,
      name: entry.name,
      state: 'missing',
      variant: entry.variant,
      xp: null,
    }
  }

  return {
    count: relic.count,
    id: entry.id,
    level: spriteLevel(relic.xp),
    name: entry.name,
    state: relic.mastered ? 'mastered' : 'owned',
    variant: entry.variant,
    xp: relic.xp,
  }
}

function rowFromHeld(relic: HeldRelic): SpriteRow {
  return {
    count: relic.count,
    id: relic.id,
    level: spriteLevel(relic.xp),
    name: humanizeRelicId(relic.id),
    state: relic.mastered ? 'mastered' : 'owned',
    variant: variantFromId(relic.id),
    xp: relic.xp,
  }
}

function compareRows(left: SpriteRow, right: SpriteRow) {
  const byName = left.name.localeCompare(right.name)

  if (byName !== 0) {
    return byName
  }

  return VARIANT_ORDER[left.variant] - VARIANT_ORDER[right.variant]
}

function variantFromId(id: string): SpriteVariant {
  const match = normalizeRelicId(id).match(/_variant_([a-z0-9]+)$/)

  if (!match) {
    return 'other'
  }

  return SUFFIX_VARIANT[match[1]] ?? 'other'
}

function humanizeRelicId(id: string) {
  const stem = id
    .replace(/_(?:Variant|Variation)_.+$/i, '')
    .replace(/^ESD_/i, '')
    .replace(/Sprite$/i, '')
  const spaced = stem.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/_/g, ' ').trim()

  return spaced || id
}

function readModule(value: unknown): Array<ParsedModule> {
  if (!value || typeof value !== 'object') {
    return []
  }

  const module = value as RelicModule
  const counts = module.counts ?? {}
  const metadata = module.entitlementMetadata ?? {}
  const relics = new Map<string, HeldRelic>()
  let dust: number | null = null

  Object.entries(counts).forEach(([id, rawCount]) => {
    if (id.trim().toLowerCase() === CURRENCY_KEY) {
      const amount = typeof rawCount === 'number' ? rawCount : Number(rawCount)
      dust = Number.isFinite(amount) ? amount : null
      return
    }

    if (normalizeRelicId(id) === 'starter') {
      return
    }

    const count = typeof rawCount === 'number' ? rawCount : Number(rawCount)

    if (!Number.isFinite(count) || count < 1) {
      return
    }

    const progress = readProgress(metadata[id])
    relics.set(normalizeRelicId(id), {
      count,
      id,
      mastered: progress.mastered,
      xp: progress.xp,
    })
  })

  Object.entries(metadata).forEach(([id, raw]) => {
    if (id.trim().toLowerCase() === CURRENCY_KEY || normalizeRelicId(id) === 'starter') {
      return
    }

    const key = normalizeRelicId(id)
    const progress = readProgress(raw)
    const previous = relics.get(key)

    if (!previous && !progress.mastered && progress.xp <= 0) {
      return
    }

    relics.set(key, {
      count: previous?.count ?? 1,
      id: previous?.id ?? id,
      mastered: previous?.mastered || progress.mastered,
      xp: Math.max(previous?.xp ?? 0, progress.xp),
    })
  })

  return [
    {
      dust,
      moduleId: typeof module.moduleId === 'string' ? module.moduleId : '',
      relics: [...relics.values()],
    },
  ]
}

function readProgress(raw: unknown) {
  const text = typeof raw === 'string' ? raw : ''

  if (!text) {
    return { mastered: false, xp: 0 }
  }

  try {
    const parsed = JSON.parse(text) as { ml?: unknown; xp?: unknown }
    const xp = typeof parsed.xp === 'number' ? parsed.xp : Number(parsed.xp)

    return {
      mastered: parsed.ml === true,
      xp: Number.isFinite(xp) ? xp : 0,
    }
  } catch {
    return { mastered: false, xp: 0 }
  }
}
