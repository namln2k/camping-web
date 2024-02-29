import useQuery from '@/hooks/useQuery'
import { addSimpleProductsToCartQuery } from './addSimpleProductsToCart.gql'

export default function useAddToCart(
  cartId: string,
  quantity: number,
  sku: string
) {
  const result = useQuery(addSimpleProductsToCartQuery, {
    cartId,
    quantity,
    sku,
  })
}
