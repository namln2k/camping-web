import { useFetch } from '@/hooks'

interface CategoryDetail {
  products: any[]
}

export default function useCategoryPage(categoryId: string): CategoryDetail {
  const { data: products } = useFetch(
    'GET',
    `categories/${categoryId}/products`
  )

  return { products: products || [] }
}
