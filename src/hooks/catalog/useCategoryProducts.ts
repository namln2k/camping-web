import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'
import { Product } from '@/types'
import { SearchResult } from '@/types/query'
import { OperationVariables, gql, useSuspenseQuery } from '@apollo/client'
import { RefetchFunction } from '@apollo/client/react/hooks/useSuspenseQuery'

export default function useCategoryProducts(
  categoryUid: string,
  currentPage: number = 1
): [SearchResult<Product>, Error[], RefetchFunction<any, any>] {
  const {
    data: { products: productsData },
    error,
    refetch,
  } = useSuspenseQuery<{ products: SearchResult<Product> }, OperationVariables>(
    gql`
      query {
        products(
          filter: { category_uid: { eq: "${categoryUid}" } }
          pageSize: ${PRODUCT_LISTING_PAGE_SIZE}
          currentPage: ${currentPage ?? 1}
        ) {
          total_count
          items {
            sku
            uid
            name
            image {
              url
              label
            }
            small_image{
                url
                label
            }
            media_gallery {
                url
                label
                ... on ProductVideo {
                    video_content {
                        media_type
                        video_provider
                        video_url
                        video_title
                        video_description
                        video_metadata
                    }
                }
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
              maximum_price {
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
          }
          page_info {
            current_page
            page_size
          }
        }
      }
    `
  )

  return [productsData, error ? [error as Error] : [], refetch]
}
