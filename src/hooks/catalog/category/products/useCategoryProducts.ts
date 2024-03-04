import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'
import { CategoryProduct } from '@/types'
import { SearchResult } from '@/types/query'
import { OperationVariables, useSuspenseQuery } from '@apollo/client'
import { RefetchFunction } from '@apollo/client/react/hooks/useSuspenseQuery'
import { categoryProductsQuery } from './categoryProducts.gql'

interface Response {
  products: SearchResult<CategoryProduct>
  errors: Error[]
  refetch: RefetchFunction<any, any>
}

export default function useCategoryProducts(
  categoryUid: string,
  currentPage: number = 1
): Response {
  const {
    data: { products },
    error,
    refetch,
  } = useSuspenseQuery<
    { products: SearchResult<CategoryProduct> },
    OperationVariables
  >(categoryProductsQuery, {
    variables: {
      categoryUid,
      currentPage,
      pageSize: PRODUCT_LISTING_PAGE_SIZE,
    },
  })

  return {
    products,
    errors: error ? [error as Error] : [],
    refetch,
  }
}
