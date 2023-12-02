import { Category, Error, Product, SearchResult } from '@/constants/types'
import { useFetch } from '@/hooks'

export default function useCategoryPage(
  categoryId: string
): [[] | Product[], Category, boolean, [] | Error[]] {
  let [productsData, productsLoading, productsLoadErrors]: [
    SearchResult<Product>,
    boolean,
    [] | Error[]
  ] = useFetch(
    'GET',
    `products?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[currentPage]=1&searchCriteria[pageSize]=6`
  )

  let products: [] | Product[] = []

  if (productsData?.items) {
    products = productsData.items
  }

  // const [products, productsLoading, productsLoadErrors]: [
  //   [] | Product[],
  //   boolean,
  //   [] | Error[]
  // ] = useFetch('GET', `categories/${categoryId}/products`)

  const [category, categoryLoading, categoryLoadErrors]: [
    Category,
    boolean,
    [] | Error[]
  ] = useFetch('GET', `categories/${categoryId}`)

  return [
    products,
    category,
    productsLoading || categoryLoading,
    [...productsLoadErrors, ...categoryLoadErrors],
  ]
}
