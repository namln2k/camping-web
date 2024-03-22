import { useAppSelector } from '@/lib/redux/hooks'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { addSimpleProductsToCartQuery } from './addToCart.gql'

export default function useAddToCart() {
  const cartId: string = useAppSelector((state) => state.cartId)
  const token: string = useAppSelector((state) => state.token)

  const [addToCartMutation] = useMutation(addSimpleProductsToCartQuery, {
    context: {
      headers: {
        Authorizations: `Bearer ${token}`,
      },
    },
  })

  const addToCart = useCallback(
    (quantity: number, sku?: string) => {
      if (!sku) {
        return false
      }

      addToCartMutation({
        variables: {
          cartId,
          quantity,
          sku,
        },
      })
    },
    [cartId, addToCartMutation]
  )

  return addToCart
}
