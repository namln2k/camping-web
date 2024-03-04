import useQuery from '@/hooks/useQuery'
import { CategoryDetail, Error } from '@/types'
import { SearchResult } from '@/types/query'
import { categoryDetailQuery } from './categoryDetail.gql'

interface CategoryQueryResult {
  categories: SearchResult<CategoryDetail>
}

interface Response {
  category?: CategoryDetail
  errors: Error[]
}

export default async function useCategoryDetail(
  urlKey: string
): Promise<Response> {
  const { data: queryResult, errors } = await useQuery<CategoryQueryResult>(
    categoryDetailQuery,
    {
      urlKey,
    }
  )

  if (queryResult?.categories?.items.length === 1) {
    return { category: queryResult.categories.items[0], errors }
  }

  return {
    errors: [
      {
        message: `None or more than one category with id ${urlKey} found.`,
      },
    ],
  }
}
