import { gql } from '@apollo/client'

export const addSimpleProductsToCartQuery = gql`
  mutation AddToCart(
    $cartId: String!
    $quantity: Float!
    $sku: String!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [
          {
            data: { quantity: $quantity, sku: $sku }
          }
        ]
      }
    ) {
      cart {
        email
        id
        is_virtual
        items {
          id
          product {
            uid
            name
          }
          uid
          quantity
        }
        total_quantity
      }
    }
  }
`
