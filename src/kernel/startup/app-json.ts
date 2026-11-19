import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { DataDirectory } from './data-directory'

export async function readAppJson<T extends Record<string, unknown>>(
  fileName: string,
  fallback: T,
): Promise<T> {
  try {
    const raw = await readFile(
      path.join(DataDirectory.rootPath, fileName),
      'utf8',
    )
    const parsed = JSON.parse(raw) as Partial<T>

    if (!parsed || typeof parsed !== 'object') {
      return fallback
    }

    return {
      ...fallback,
      ...parsed,
    }
  } catch {
    return fallback
  }
}

export async function writeAppJson(fileName: string, data: unknown) {
  const dir = DataDirectory.rootPath

  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, fileName), JSON.stringify(data, null, 2), 'utf8')
}
