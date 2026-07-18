export type CollectionBookSectionId =
  | 'heroes-commando'
  | 'heroes-constructor'
  | 'heroes-ninja'
  | 'heroes-outlander'
  | 'heroes-other'
  | 'weapons-assault'
  | 'weapons-shotgun'
  | 'weapons-sniper'
  | 'weapons-pistol'
  | 'weapons-explosive'
  | 'weapons-melee'
  | 'weapons-neon'
  | 'weapons-expansion'
  | 'weapons-other'
  | 'traps'
  | 'defenders'
  | 'survivors'
  | 'other'

export type CollectionBookItem = {
  itemId: string
  templateId: string
  name: string
  type: 'hero' | 'schematic' | 'defender' | 'worker' | 'other'
  sectionId: CollectionBookSectionId
  level: number
  maxLevel: number
  starTier: number
  rarity: string
  favorite: boolean
  isSlotted: boolean
  imageUrl?: string
}

export type CollectionBookSection = {
  id: CollectionBookSectionId
  itemCount: number
  belowTarget: number
  items: Array<CollectionBookItem>
}

export type CollectionBookAccountData = {
  accountId: string
  collectionBookLevel: number
  accountLevel: number
  accountXp: number
  items: Array<CollectionBookItem>
  sections: Array<CollectionBookSection>
  error?: string
}

export type CollectionBookUpgradeRequest = {
  accountId: string
  /** Specific item IDs; if empty, use sectionId / all */
  itemIds?: Array<string>
  /** Upgrade only this section */
  sectionId?: CollectionBookSectionId | 'all'
  targetLevel: number
}

export type CollectionBookSlotRequest = {
  accountId: string
  itemIds: Array<string>
}

export type CollectionBookActionResult = {
  accountId: string
  success: boolean
  upgraded?: number
  skipped?: number
  failed?: number
  slotted?: number
  error?: string
}
