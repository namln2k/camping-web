import { Error, ProductDetail } from "@/types"
import { OperationVariables, gql, useSuspenseQuery } from "@apollo/client"
import { RefetchFunction } from "@apollo/client/react/hooks/useSuspenseQuery"
import { useState } from "react"

export default function useProductDetail(
  sku: string | number
): [ProductDetail | undefined, Error[], RefetchFunction<any, any>] {
  const {
    data: { products: productList },
    error,
    refetch,
  } = useSuspenseQuery<
    { products: { items: ProductDetail[] } },
    OperationVariables
  >(
    gql`
      query {
        products(filter: { sku: { eq: "${sku}" } }) {
          items {
            id
            uid
            categories {
              uid
              breadcrumbs {
                category_uid
                category_name
              }
            }
            description {
              html
            }
            short_description {
              html
            }
            id
            uid
            media_gallery_entries {
              uid
              label
              position
              disabled
              file
            }
            meta_description
            name
            price {
              regularPrice {
                amount {
                  currency
                  value
                }
              }
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
            sku
            small_image {
              url
            }
            stock_status
            url_key
            ... on ConfigurableProduct {
              configurable_options {
                attribute_code
                attribute_id
                uid
                label
                values {
                  uid
                  default_label
                  label
                  store_label
                  use_default_value
                  value_index
                  swatch_data {
                    ... on ImageSwatchData {
                      thumbnail
                    }
                    value
                  }
                }
              }
              variants {
                attributes {
                  code
                  value_index
                }
                product {
                  uid
                  media_gallery_entries {
                    uid
                    disabled
                    file
                    label
                    position
                  }
                  sku
                  stock_status
                  price {
                    regularPrice {
                      amount {
                        currency
                        value
                      }
                    }
                  }
                  price_range {
                    maximum_price {
                      final_price {
                        currency
                        value
                      }
                      discount {
                        amount_off
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  if (productList.items.length === 1) {
    let productData = productList.items[0]

    // Find the category with the longest breadcrumbs and assign it to the product data
    const categoryForBreadcrumb = productData.categories.reduce((a, b) => {
      return (a.breadcrumbs?.length || 0) > (b.breadcrumbs?.length || 0) ? a : b
    }, productData.categories[0])

    productData = {
      ...productData,
      category: categoryForBreadcrumb,
    }

    return [productData, error ? [error as Error] : [], refetch]
  }

  return [undefined, error ? [error as Error] : [], refetch]
}
