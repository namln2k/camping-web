import { Category } from '@/constants/types'
import { useFetch } from '@/hooks'

export default function useCategoryPage(
  categoryId: string
): [any[], Category, boolean] {
  // let { data: productsData } = useFetch(
  //   'GET',
  //   `products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[currentPage]=1&searchCriteria[pageSize]=6`
  // )

  // let products = []

  // if (productsData?.items) {
  //   products = productsData.items
  // }

  const { data: products } = useFetch(
    'GET',
    `categories/${categoryId}/products`
  )

  const { data, loading } = useFetch('GET', `categories/${categoryId}`)

  return [products || [], data, loading]
}
