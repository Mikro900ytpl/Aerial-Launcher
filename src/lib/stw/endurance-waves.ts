const ZONE_NAMES = [
  'Stonewood',
  'Plankerton',
  'Canny Valley',
  'Twine Peaks',
] as const

const DAILY_RE = /endurancedaily_t0([1-4])_w(\d+)/i
const WAVE30_RE = /endurancewave30theater0([1-4])/i
const ENDLESS_RE = /outpostquest_t([1-4])_endless/i
const PACK_RE = /(?:^|:)zcp_endurance_t0([1-4])(?:$|:)/i
const ACCOLADE_PACK_RE = /(?:^|:)zcp_stwaccolade_endurance_w(\d+)/i
const ACCOLADE_ID_RE = /accoladeid_stw_endurance_w(\d+)/i
const MISSION_RE = /Outpost_PvE_0([1-4])/i

export type EnduranceWave = {
  zone: string
  wave: number
}

function noteBest(best: Map<number, number>, zone: number, wave: number) {
  if (zone < 1 || zone > 4 || wave < 1) {
    return
  }

  const current = best.get(zone) ?? 0

  if (wave > current) {
    best.set(zone, wave)
  }
}

function toRows(best: Map<number, number>): Array<EnduranceWave> {
  return [...best.entries()]
    .sort((left, right) => left[0] - right[0])
    .map(([zone, wave]) => ({
      zone: ZONE_NAMES[zone - 1],
      wave,
    }))
}

function sessionId(value: unknown) {
  return typeof value === 'string' && value.length > 0 ? value : ''
}

function missionZone(value: unknown) {
  if (typeof value !== 'string') {
    return 0
  }

  const match = MISSION_RE.exec(value)

  return match ? Number(match[1]) : 0
}

function maxWave(current: number, next: number) {
  return next > current ? next : current
}

function waveFromTemplate(templateId: string) {
  const accoladePack = ACCOLADE_PACK_RE.exec(templateId)

  if (accoladePack) {
    return Number(accoladePack[1])
  }

  const accolade = ACCOLADE_ID_RE.exec(templateId)

  if (accolade) {
    return Number(accolade[1])
  }

  return 0
}

export function completedEnduranceTemplates(items: unknown) {
  if (!items || typeof items !== 'object') {
    return []
  }

  const ids: Array<string> = []

  for (const item of Object.values(items as Record<string, unknown>)) {
    if (!item || typeof item !== 'object') {
      continue
    }

    const row = item as {
      templateId?: unknown
      attributes?: { quest_state?: unknown }
    }

    if (typeof row.templateId !== 'string') {
      continue
    }

    if (row.attributes?.quest_state !== 'Completed') {
      continue
    }

    if (
      !DAILY_RE.test(row.templateId) &&
      !WAVE30_RE.test(row.templateId) &&
      !ENDLESS_RE.test(row.templateId)
    ) {
      continue
    }

    ids.push(row.templateId)
  }

  return ids
}

/** Highest reward wave per zone. Daily endurance quests land on 5, 10, 15, 20, 25, 30. */
export function enduranceWavesFromTemplates(templateIds: Iterable<string>) {
  const best = new Map<number, number>()

  for (const id of templateIds) {
    const daily = DAILY_RE.exec(id)

    if (daily) {
      noteBest(best, Number(daily[1]), Number(daily[2]))
      continue
    }

    const wave30 = WAVE30_RE.exec(id)

    if (wave30) {
      noteBest(best, Number(wave30[1]), 30)
      continue
    }

    const endless = ENDLESS_RE.exec(id)

    if (endless) {
      noteBest(best, Number(endless[1]), 30)
    }
  }

  return toRows(best)
}

/**
 * Wave reached in an endurance match, from the unopened dump pack and
 * same-session accolades. Daily/wave-30 quests are a fallback when those
 * items are already Completed.
 */
export function enduranceWavesFromProfileItems(
  items: unknown,
  lootItemTypes?: Iterable<string>,
) {
  const best = new Map<number, number>()

  if (!items || typeof items !== 'object') {
    return []
  }

  const packs: Array<{ zone: number; session: string }> = []
  const sessionWaves = new Map<string, number>()
  const zoneWavesFromAccoladePacks = new Map<number, number>()
  let unmatchedAccoladeWave = 0

  const rememberWave = (
    wave: number,
    session: string,
    zone: number,
  ) => {
    if (wave < 1) {
      return
    }

    if (session) {
      sessionWaves.set(session, maxWave(sessionWaves.get(session) ?? 0, wave))
    }

    if (zone >= 1 && zone <= 4) {
      zoneWavesFromAccoladePacks.set(
        zone,
        maxWave(zoneWavesFromAccoladePacks.get(zone) ?? 0, wave),
      )
    } else if (!session) {
      unmatchedAccoladeWave = maxWave(unmatchedAccoladeWave, wave)
    }
  }

  for (const raw of Object.values(items as Record<string, unknown>)) {
    if (!raw || typeof raw !== 'object') {
      continue
    }

    const row = raw as {
      templateId?: unknown
      attributes?: {
        quest_state?: unknown
        match_statistics?: {
          mission_name?: unknown
          matchmaking_session_id?: unknown
        }
        match_accolades?: unknown
      }
    }

    if (typeof row.templateId !== 'string') {
      continue
    }

    const templateId = row.templateId
    const stats = row.attributes?.match_statistics
    const session = sessionId(stats?.matchmaking_session_id)
    const fromMission = missionZone(stats?.mission_name)

    const pack = PACK_RE.exec(templateId)

    if (pack) {
      const zone = Number(pack[1]) || fromMission

      if (zone >= 1 && zone <= 4) {
        packs.push({ zone, session })
      }

      continue
    }

    const accoladeWave = waveFromTemplate(templateId)

    if (accoladeWave > 0 && templateId.toLowerCase().includes('cardpack:')) {
      rememberWave(accoladeWave, session, fromMission)
      continue
    }

    if (templateId.toLowerCase() === 'token:stw_accolade_tracker') {
      const matches = row.attributes?.match_accolades

      if (!Array.isArray(matches)) {
        continue
      }

      for (const match of matches) {
        if (!match || typeof match !== 'object') {
          continue
        }

        const entry = match as {
          matchmakingSessionId?: unknown
          accoladesToGrant?: unknown
        }
        const matchSession = sessionId(entry.matchmakingSessionId)
        const grants = Array.isArray(entry.accoladesToGrant)
          ? entry.accoladesToGrant
          : []

        for (const grant of grants) {
          if (!grant || typeof grant !== 'object') {
            continue
          }

          const templateToGrant = (grant as { templateToGrant?: unknown })
            .templateToGrant

          if (typeof templateToGrant !== 'string') {
            continue
          }

          rememberWave(waveFromTemplate(templateToGrant), matchSession, 0)
        }
      }

      continue
    }

    if (row.attributes?.quest_state !== 'Completed') {
      continue
    }

    const daily = DAILY_RE.exec(templateId)

    if (daily) {
      noteBest(best, Number(daily[1]), Number(daily[2]))
      continue
    }

    const wave30 = WAVE30_RE.exec(templateId)

    if (wave30) {
      noteBest(best, Number(wave30[1]), 30)
      continue
    }

    const endless = ENDLESS_RE.exec(templateId)

    if (endless) {
      noteBest(best, Number(endless[1]), 30)
    }
  }

  if (lootItemTypes) {
    for (const itemType of lootItemTypes) {
      unmatchedAccoladeWave = maxWave(
        unmatchedAccoladeWave,
        waveFromTemplate(itemType),
      )
    }
  }

  for (const pack of packs) {
    let wave = 0

    if (pack.session) {
      wave = sessionWaves.get(pack.session) ?? 0
    }

    if (wave <= 0) {
      wave = zoneWavesFromAccoladePacks.get(pack.zone) ?? 0
    }

    if (wave <= 0 && packs.length === 1) {
      wave = unmatchedAccoladeWave
    }

    if (wave <= 0) {
      wave = best.get(pack.zone) ?? 0
    }

    noteBest(best, pack.zone, wave)
  }

  return toRows(best)
}

export function enduranceWaveLines(waves: Array<EnduranceWave> | undefined) {
  if (!waves || waves.length <= 0) {
    return []
  }

  return waves.map((row) => `${row.zone} Endurance · Wave ${row.wave}`)
}
