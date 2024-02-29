import { ProductVariant } from '@/types'

export interface SelectedOption {
  attributeCode: string
  valueUid: string
}

export function findVariantBySelectedOptions(
  variants: ProductVariant[],
  selectedOptions: SelectedOption[]
): ProductVariant | null {
  let result = null

  variants.forEach((variant) => {
    const { attributes } = variant

    const matched = attributes.every((attribute) => {
      const { code, uid } = attribute
      const selectedOption = selectedOptions.find((option) => {
        return option.attributeCode === code && option.valueUid === uid
      })
      return selectedOption
    })

    if (matched) {
      result = variant
    }
  })

  return result
}

export function findSelectedOptionIndex(
  option: SelectedOption,
  selectedOptions: SelectedOption[]
) {
  return selectedOptions.findIndex((selectedOption) => {
    return selectedOption.attributeCode === option.attributeCode
  })
}
