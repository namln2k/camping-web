import ProductCard from '@/components/ProductCard'
import { Product } from '@/constants/types'

interface Props {
  products: [] | Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <>
      <ul className="w-full h-full">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8">
          {products?.map((product) => (
            <div key={product.sku}>
              <ProductCard sku={product.sku} />
            </div>
          ))}
        </div>
      </ul>
    </>
  )
}
