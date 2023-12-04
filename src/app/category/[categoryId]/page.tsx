'use client'

import ErrorFallback from '@/components/ErrorFallbak'
import LoadingFallback from '@/components/LoadingFallback'
import ProductList from '@/components/ProductList'
import { useCategoryPage } from '@/hooks/catalog'
import Link from 'next/link'

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const { categoryId } = params
  const [products, category, loading, errors] = useCategoryPage(categoryId)

  if (errors.length) {
    return <ErrorFallback />
  }

  const FilterSection = () => {
    return (
      <div className="w-[240px] h-screen">
        <h2 className="sr-only">Filters</h2>
        <div className="relative">
          <h3>Shopping options</h3>
          <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
            <li className="py-6 flex items-center justify-between">
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Category name
              </Link>
              <span className="text-sm font-medium">0</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <>
      <h1>{category?.name}</h1>
      <div className="flex">
        <FilterSection />
        <div className="w-[calc(100%_-_240px)] h-screen pl-16 pb-16">
          {loading ? (
            <div className="w-full h-full">
              <LoadingFallback className="rounded-xl" />
            </div>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </>
  )
}
