import { gql } from '@apollo/client'

/**
 * This is a draft for the mini cart query
 * TODO: Develop full logic and implement this query in the useMiniCart hook
 */
export const miniCartQuery = gql`
  query CustomerCart {
    customerCart {
      email
      id
      is_virtual
      total_quantity
      items {
        id
        product {
          name
          sku
          stock_status
          url_key
          url_suffix
          image {
            url
          }
          price_range {
            minimum_price {
              regular_price {
                value
                currency
              }
            }
          }
        }
        quantity
        prices {
          row_total {
            value
            currency
          }
        }
      }
    }
  }
`
