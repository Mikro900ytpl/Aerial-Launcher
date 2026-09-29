import type {
  LookupFindManyByDisplayNameResponse,
  LookupFindOneByDisplayNameResponse,
} from '../../types/services/lookup'

import { publicAccountService } from '../config/public-account'

export function findUsersByAccountIds({
  accessToken,
  accountIds,
}: {
  accessToken: string
  accountIds: Array<string>
}) {
  const query = accountIds
    .map((accountId) => `accountId=${encodeURIComponent(accountId)}`)
    .join('&')

  return publicAccountService.get<Array<LookupFindOneByDisplayNameResponse>>(
    `?${query}`,
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }
  )
}

export function findUserByAccountId({
  accessToken,
  accountId,
}: {
  accessToken: string
  accountId: string
}) {
  return publicAccountService.get<LookupFindOneByDisplayNameResponse>(
    `/${accountId}`,
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }
  )
}

export function findUserByDisplayName({
  accessToken,
  displayName,
}: {
  accessToken: string
  displayName: string
}) {
  return publicAccountService.get<LookupFindOneByDisplayNameResponse>(
    `/displayName/${displayName}`,
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }
  )
}

export function findUserByExternalDisplayName({
  accessToken,
  displayName,
  externalAuthType,
}: {
  accessToken: string
  displayName: string
  externalAuthType: 'psn' | 'xbl' | 'nintendo' | 'steam'
}) {
  return publicAccountService.get<LookupFindManyByDisplayNameResponse>(
    `/lookup/externalAuth/${externalAuthType}/displayName/${displayName}?caseInsensitive=true`,
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    }
  )
}
