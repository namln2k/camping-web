import { SearchResult, Category, Error } from '@/constants/types'
import { useFetch } from '@/hooks'

export default function useCategories(): [Category[], boolean, [] | Error[]] {
  let categories: Category[] = []

  const [categoriesData, loading, errors]: [
    SearchResult<Category>,
    boolean,
    [] | Error[]
  ] = useFetch(
    'GET',
    'categories/list?searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[sortOrders][0][field]=position&searchCriteria[filterGroups][0][filters][0][field]=is_active&searchCriteria[filterGroups][0][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][conditionType]=eq'
  )

  if (Array.isArray(categoriesData?.items)) {
    categories = categoriesData.items
  }

  return [categories, loading, errors]
}
