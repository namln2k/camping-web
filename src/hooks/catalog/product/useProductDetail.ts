import { Error, ProductDetail } from '@/types'
import { SearchResult } from '@/types/query'
import { OperationVariables, useSuspenseQuery } from '@apollo/client'
import { productDetailQuery } from './productDetail.gql'

export default function useProductDetail(sku: string) {
  const { data: queryResult, error } = useSuspenseQuery<
    { products: SearchResult<ProductDetail> },
    OperationVariables
  >(productDetailQuery, {
    variables: { sku },
  })

  if (queryResult?.products?.items.length === 1) {
    const products = queryResult.products
    let productData = products.items[0]

    // Find the category with the longest breadcrumbs and assign it to the product data
    const categoryForBreadcrumb = productData.categories.reduce((a, b) => {
      return (a.breadcrumbs?.length || 0) > (b.breadcrumbs?.length || 0) ? a : b
    }, productData.categories[0])
    productData = {
      ...productData,
      category: categoryForBreadcrumb,
    }

    // Get media URLs for gallery entries
    productData = {
      ...productData,
      media_gallery_entries: productData.media_gallery_entries
        .map((entry) => ({
          ...entry,
          url: `${process.env.MAGENTO_BASE_MEDIA_CATALOG_PRODUCT_URL}${entry.file}`,
        }))
        .sort((a, b) => a.position - b.position)
        .filter((entry) => entry.disabled === false),
    }

    return { product: productData, errors: error ? [error as Error] : [] }
  }

  return { errors: error ? [error as Error] : [] }
}
