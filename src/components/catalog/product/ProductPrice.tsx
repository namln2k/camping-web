import { ProductPrice } from '@/types'
import { FormattedNumber } from 'react-intl'

interface Props {
  priceRange: ProductPrice
  className?: string
}

export default function ProductPrice({ priceRange, className = '' }: Props) {
  const { regular_price, final_price } = priceRange.minimum_price
  const { percent_off } = priceRange.minimum_price.discount

  return (
    <div>
      {final_price.value < regular_price.value && <div>From</div>}
      <div className={`flex gap-2 items-center ${className}`}>
        {regular_price.value !== final_price.value && (
          <span className="line-through text-gray-500 text-[10px]">
            <FormattedNumber style="currency" {...regular_price} />
          </span>
        )}
        <span className="text-2xl font-semibold">
          <FormattedNumber style="currency" {...final_price} />
        </span>
        {percent_off > 0 && (
          <span className="w-fit h-fit bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-xl rounded-tr rounded-bl ml-1 uppercase">
            {`${percent_off}% off`}
          </span>
        )}
      </div>
    </div>
  )
}
