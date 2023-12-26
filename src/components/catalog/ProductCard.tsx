import { CategoryProduct } from '@/types'
import Image from 'next/image'
import { IntlProvider } from 'react-intl'
import ProductPrice from './ProductPrice'
import ProductRating from './ProductRating'
import { useRouter } from 'next/navigation'

interface Props {
  product: CategoryProduct
  className?: string
}

export default function ProductCard({ product, className = '' }: Props) {
  const router = useRouter()

  return (
    <div
      className={`cursor-pointer hover:scale-105 transition-all shadow hover:shadow-lg border rounded-xl px-6 pt-4 pb-8 flex flex-col justify-between gap-4 ${className}`}
      onClick={() => {
        router.push(`/product/${product.sku}`)
      }}
    >
      <Image
        src={product?.image.url}
        alt={product.name}
        width={280}
        height={400}
      />
      <div className="p-4">
        <p className="pb-4 font-semibold text-xl">{product.name}</p>
        <div className="my-2">
          <ProductRating
            ratingSummary={product.rating_summary}
            reviewCount={product.review_count}
          />
        </div>
        <div className="mt-6">
          <IntlProvider locale="en">
            <ProductPrice
              className="inline-flex"
              priceRange={{ ...product.price_range }}
            />
          </IntlProvider>
        </div>
      </div>
      <button
        type="button"
        aria-label="Shop now"
        className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 rounded-lg font-bold py-3 text-center focus:ring-0 capitalize"
      >
        Shop Now
      </button>
    </div>
  )
}
