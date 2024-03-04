import useQuery from '@/hooks/useQuery'
import { CmsBlock, Error } from '@/types'
import { SearchResult } from '@/types/query'
import { cmsBlocksQuery } from './cmsBlocks.gql'

interface CmsBlocksQueryResult {
  cmsBlocks: SearchResult<CmsBlock>
}

export default async function useCmsBlocks(
  identifiers: string | string[]
): Promise<[CmsBlock[], Error[]]> {
  if (typeof identifiers === 'string') {
    identifiers = [identifiers]
  }

  const { data: queryResult, errors } = await useQuery<CmsBlocksQueryResult>(
    cmsBlocksQuery,
    {
      identifiers,
    }
  )

  if (queryResult?.cmsBlocks) {
    return [queryResult.cmsBlocks.items, errors]
  }

  return [[], errors]
}
