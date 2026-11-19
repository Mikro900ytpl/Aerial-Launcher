import { parseResource } from '../parsers/resources'

import { schematicIconUrl } from './dq-weapons'
import { gameItemName } from './display-names'
import {
  defenderItemName,
  distinctHeroName,
  epicAssetFileName,
  itemIconUrl,
} from './item-icons'

export function shopItemName(input: {
  title?: string
  devName?: string
  primaryTemplateId: string
}) {
  const named = input.primaryTemplateId
    ? gameItemName(input.primaryTemplateId)
    : ''

  if (named) {
    return named
  }

  const type = input.primaryTemplateId.split(':')[0]?.toLowerCase() ?? ''

  if (type === 'hero') {
    const hero = distinctHeroName(input.primaryTemplateId)

    if (hero && hero !== 'Hero') {
      return hero
    }
  }

  if (type === 'defender') {
    const defender = defenderItemName(input.primaryTemplateId, '').trim()

    if (defender && defender.toLowerCase() !== 'defender') {
      return defender
    }
  }

  const title = (input.title ?? '').trim()

  if (
    title &&
    !title.includes('::') &&
    !title.startsWith('Quest:') &&
    !/^fort[a-z]*\./i.test(title)
  ) {
    return title
  }

  const dev = humanizeDevName(input.devName ?? '')

  if (dev) {
    return dev
  }

  return input.primaryTemplateId || 'Item'
}

export function shopItemIcon(templateId: string) {
  if (!templateId) {
    return undefined
  }

  const type = templateId.split(':')[0]?.toLowerCase() ?? ''
  const id = templateId.split(':')[1] ?? templateId

  if (type === 'schematic' || type === 'weapon' || type === 'trap') {
    return schematicIconUrl(templateId)
  }

  if (type === 'hero' || type === 'worker') {
    return itemIconUrl(templateId) ?? undefined
  }

  if (type === 'defender') {
    return `https://api.miadsc.xyz/assets/stw/defenders/${epicAssetFileName(id)}.png`
  }

  return parseResource({
    key: templateId,
    quantity: 1,
  }).imgUrl
}

function humanizeDevName(devName: string) {
  const virtual = devName.match(/x\s+(.+?)(?:\s+for\s+|$)/i)

  if (virtual?.[1] && !virtual[1].includes(':')) {
    return virtual[1].trim()
  }

  const tail = devName.split(/[./]/).pop() ?? devName

  return tail
    .replace(/^\[.*?\]/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim()
}
