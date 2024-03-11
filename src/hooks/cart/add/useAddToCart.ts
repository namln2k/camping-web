import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { addSimpleProductsToCartQuery } from './addToCart.gql'

export default function useAddToCart() {
  const [addToCartMutation] = useMutation(addSimpleProductsToCartQuery)

  const addToCart = useCallback(
    (cartId: string, quantity: number, sku: string) => {
      addToCartMutation({
        variables: {
          cartId,
          quantity,
          sku,
        },
      })
    },
    [addToCartMutation]
  )

  return addToCart
}
