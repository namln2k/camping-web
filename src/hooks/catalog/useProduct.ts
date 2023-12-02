import { Error, Product } from '@/constants/types'
import { useFetch } from '@/hooks'

export default function useProduct(
  sku: string
): [Product | null | undefined, boolean, [] | Error[]] {
  const [productData, loading, errors]: [
    Product | null | undefined,
    boolean,
    [] | Error[]
  ] = useFetch('GET', `products/${sku}`)

  return [productData, loading, errors]
}
