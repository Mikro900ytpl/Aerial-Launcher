export type RewardsNotification = {
  accolades: {
    totalMissionXPRedeemed: number
    totalQuestXPRedeemed: number
  }
  accountId: string
  createdAt: string
  id: string
  rewards: Record<string, number>
  /** Quests redeemed in this one claim. One notification lists every quest. */
  quests?: Array<{
    questId: string
    title: string
  }>
  /** Older rows stored a single quest id before claims were grouped. */
  questId?: string
  /** Older rows stored a single quest title. */
  title?: string
  /** Endurance zone + wave from the dump pack / same-session accolades. */
  endurance?: Array<{
    zone: string
    wave: number
  }>
}
