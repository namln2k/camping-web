import useQuery from '@/hooks/useQuery'
import { CategoryList } from '@/types'
import { megaMenuQuery } from './megaMenu.gql'

export default async function useMegaMenu() {
  const { data, errors } = await useQuery<CategoryList>(megaMenuQuery)

  const categoryList = data?.categoryList
  if (!categoryList || categoryList.length === 0 || errors.length > 0) {
    return { categoryList: [], errors }
  }

  if (categoryList.length === 1) {
    return { categories: categoryList[0].children, errors }
  }

  return { categoryList, errors }
}
