import { SwatchData } from '@/types'
import { invertColor } from '@/util'
import { CheckIcon } from '@heroicons/react/24/solid'

export default function Swatch({ __typename, value, selected }: SwatchData) {
  switch (__typename) {
    case 'ColorSwatchData':
      return (
        <div
          className={`w-full h-full mr-4 mb-4 rounded cursor-pointer flex align-top items-start border border-blue-400 ${
            selected ? 'shadow-[0_2px_4px_2px_rgb(71,139,255)]' : ''
          }`}
          style={{ backgroundColor: value }}
        >
          {selected && (
            <CheckIcon
              className='w-6 h-6 ml-auto'
              style={{ color: invertColor(value, true) }}
            />
          )}
        </div>
      )
    case 'ImageSwatchData':
      return (
        <div
          className={`w-full h-full mr-4 mb-4 rounded cursor-pointer ${
            selected ? 'shadow-[0_2px_4px_2px_rgb(71,139,255)]' : ''
          }`}
          style={{ backgroundImage: `url(${value})` }}
        >
          {selected && (
            <CheckIcon
              className='w-6 h-6 ml-auto'
              style={{ color: invertColor(value, true) }}
            />
          )}
        </div>
      )
    case 'TextSwatchData':
      return (
        <div
          className={`flex items-center justify-center w-full h-full mr-4 mb-4 text-sm text-center text-gray-700 border border-blue-400 rounded cursor-pointer ${
            selected ? 'shadow-[0_2px_4px_2px_rgb(71,139,255)]' : ''
          }`}
        >
          {value}
        </div>
      )
    default:
      return <></>
  }
}
