import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'
import { Product } from '@/types'
import { SearchResult } from '@/types/query'
import { OperationVariables, gql, useSuspenseQuery } from '@apollo/client'

interface Props {
  categoryId: number | string
  currentPage?: number
}

export default function useCategoryProducts(
  categoryId: number | string,
  currentPage: number = 1
): [SearchResult<Product>, Error[]] {
  const {
    data: { products: productsData },
    error,
  } = useSuspenseQuery<{ products: SearchResult<Product> }, OperationVariables>(
    gql`
      query {
        products(
          filter: { category_id: { eq: ${categoryId} } }
          pageSize: ${PRODUCT_LISTING_PAGE_SIZE}
          currentPage: ${currentPage ?? 1}
        ) {
          total_count
          items {
            id
            sku
            name
            url_key
            stock_status
            new
            image {
              url
              label
              position
            }
            small_image {
              url
              label
              position
            }
            thumbnail {
              url
              label
              position
            }
            short_description {
              html
            }
            description {
              html
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
              }
              maximum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
              }
            }
            price_tiers {
              quantity
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
          page_info {
            current_page
            page_size
          }
        }
      }
    `
  )

  return [productsData, [error as Error]]
}
