import { FormattedNumber } from 'react-intl'

interface Props {
  priceRange: {
    minimum_price: {
      final_price: {
        currency: string
        value: number
      }
      regular_price: {
        currency: string
        value: number
      }
      discount: {
        amount_off: number
        percent_off: number
      }
    }
    maximum_price: {
      final_price: {
        currency: string
        value: number
      }
      regular_price: {
        currency: string
        value: number
      }
      discount: {
        amount_off: number
        percent_off: number
      }
    }
  }
  className?: string
}

export default function ProductPrice({ priceRange, className }: Props) {
  return (
    <>
      <div className="flex gap-3 items-center pt-2">
        {priceRange.minimum_price.regular_price.value !==
          priceRange.minimum_price.final_price.value && (
          <span className="line-through text-gray-500 text-[12px]">
            <FormattedNumber
              style="currency"
              {...priceRange.minimum_price.regular_price}
            />
          </span>
        )}
        <span className="text-3xl font-semibold">
          <FormattedNumber
            style="currency"
            {...priceRange.minimum_price.final_price}
          />
        </span>
        {priceRange.minimum_price.discount.percent_off > 0 && (
          <span className="w-fit h-fit bg-red-500 text-white text-md font-bold px-4 py-2 rounded-xl rounded-tr rounded-bl ml-2">
            {`-${priceRange.minimum_price.discount.percent_off}%`}
          </span>
        )}
      </div>
    </>
  )
}
