import type { DqWeaponKind, DqWeaponMatch } from '../lib/stw/dq-weapons'

export type DqWeaponsAccountData = {
  accountId: string
  available: boolean
  errorMessage?: string
  weapons: Record<DqWeaponKind, DqWeaponMatch | null>
  haveCount: number
  complete: boolean
}
