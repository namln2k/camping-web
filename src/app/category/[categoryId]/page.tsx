'use client'

import { useCategoryPage } from '@/hooks/catalog'
import Image from 'next/image'
import Link from 'next/link'
import Loading from './loading'
import ProductCard from '@/components/ProductCard'

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const { categoryId } = params
  const [products, category, loading] = useCategoryPage(categoryId)

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <h1>{category?.name}</h1>
      <div className="flex">
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
        <ul className="w-[calc(100%_-_240px)] pl-16">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.sku}>
                <ProductCard sku={product.sku} />
              </div>
            ))}
          </div>
        </ul>
      </div>
    </>
  )
}
