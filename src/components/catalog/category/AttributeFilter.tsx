import { AllHTMLAttributes } from 'react'

interface Props extends AllHTMLAttributes<HTMLImageElement> {
  attribute_code: string
  label: string
  options: {
    value: any
    label: string
  }[]
  handleInputChange: (attribute: string, value: string) => void
}

export default function AttributeFilter({
  attribute_code: attributeCode,
  label,
  options,
  handleInputChange,
  ...props
}: Props) {
  return (
    <div key={attributeCode} className='border-t py-8' {...props}>
      <p className='font-semibold'>{label}</p>
      <ul className='mt-2'>
        {options.map((option) => (
          <li key={option.value} className='pt-3'>
            <label>
              <input
                type='checkbox'
                name={option.value}
                value={option.value}
                onChange={() => {
                  handleInputChange(attributeCode, option.value)
                }}
              />
              <span className='pl-2'>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
