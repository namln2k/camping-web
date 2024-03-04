import { gql } from '@apollo/client'

export const categoryProductsQuery = gql`
  query GetCategoryProducts(
    $categoryUid: String!
    $currentPage: Int
    $pageSize: Int
  ) {
    products(
      filter: { category_uid: { eq: $categoryUid } }
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      items {
        sku
        name
        image {
          url
          label
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
        review_count
        rating_summary
      }
      page_info {
        current_page
        page_size
      }
    }
  }
`
