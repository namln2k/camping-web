'use client'

import BreadCrumb from '@/components/Breadcrumb'
import ErrorFallback from '@/components/ErrorFallback'
import BundleProduct from '@/components/catalog/product/detail/BundleProduct'
import ConfigurableProduct from '@/components/catalog/product/detail/ConfigurableProduct'
import DownloadableProduct from '@/components/catalog/product/detail/DownloadableProduct'
import GroupedProduct from '@/components/catalog/product/detail/GroupedProduct'
import SimpleProduct from '@/components/catalog/product/detail/SimpleProduct'
import useProductDetail from '@/hooks/catalog/product/useProductDetail'
import { ProductDetail } from '@/types'

interface Props {
  params: {
    sku: string
  }
}

const renderProductDetail = (product: ProductDetail) => {
  switch (product.__typename) {
    case 'SimpleProduct':
      return <SimpleProduct product={product} />
    case 'ConfigurableProduct':
      return <ConfigurableProduct product={product} />
    case 'GroupedProduct':
      return <GroupedProduct product={product} />
    case 'BundleProduct':
      return <BundleProduct product={product} />
    case 'DownloadableProduct':
      return <DownloadableProduct product={product} />
    default:
      return <></>
  }
}

export default function ProductDetail({ params: { sku } }: Props) {
  const { product, errors } = useProductDetail(sku)

  if (!product || errors.length) {
    return <ErrorFallback sectionName='Product Detail Page' errors={errors} />
  }

  const { name: productName, category } = product

  return (
    <div>
      <section>
        {category && (
          <BreadCrumb
            breadcrumb={category.breadcrumbs}
            currentNode={productName}
          />
        )}
        {renderProductDetail(product)}
      </section>
    </div>
  )
}
