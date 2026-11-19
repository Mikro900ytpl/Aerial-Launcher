import type { RepositoryReleaseResponse } from '../../types/services/repository'

import { repositoryService } from '../config/repository'

export function getLatestAppRelease() {
  return repositoryService.get<RepositoryReleaseResponse>('/releases/latest')
}
