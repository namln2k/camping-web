import { Category } from '@/constants/types'
import { useCategories } from '@/hooks/catalog'

const FIRST_CATEGORY_LEVEL = 2

export default function useCategoryNav(): [Category[], boolean] {
  const [categories, loading] = useCategories()

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

  return [result, loading]
}
