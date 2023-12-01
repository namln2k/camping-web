import { Product } from '@/constants/types'
import { useFetch } from '@/hooks'

export default function useProduct(sku: string): [Product | null, boolean] {
  const { data: productData, loading } = useFetch('GET', `products/${sku}`)

  return [productData, loading]
}
