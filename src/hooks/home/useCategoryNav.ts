import { useCategories } from '@/hooks/catalog'
import { Category } from '@/constants/types'

const FIRST_CATEGORY_LEVEL = 2

export default function useCategoryNav() {
  let categories: Category[] = useCategories()

  const result = categories.filter((category) => {
    if (category.level === FIRST_CATEGORY_LEVEL) {
      if (category.children && typeof category.children === 'string') {
        const childrenList = category.children.split(',')

        category.children_list = categories.filter((category) => {
          return childrenList.includes(category.id.toString())
        })
      }

      return true
    }
    return false
  })

  return result
}
