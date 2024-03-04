import { Error, ProductAggregation } from '@/types'
import { OperationVariables, useSuspenseQuery } from '@apollo/client'
import { categoryAttributesQuery } from './categoryAttributes.gql'

export default function useCategoryAttributes(categoryUid: string): {
  filters: ProductAggregation[]
  errors: Error[]
} {
  const {
    data: {
      products: { aggregations: filters },
    },
    error,
  } = useSuspenseQuery<
    { products: { aggregations: ProductAggregation[] } },
    OperationVariables
  >(categoryAttributesQuery, {
    variables: {
      categoryUid,
    },
  })

  return { filters, errors: error ? [error as Error] : [] }
}
