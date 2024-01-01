import { SwatchData } from "@/types";

export default function Swatch({ __typename, value }: SwatchData) {
    switch (__typename) {
        case 'ColorSwatchData':
            return (
                <div
                    className="w-full h-full mr-4 mb-4 rounded cursor-pointer"
                    style={{ backgroundColor: value }}
                >
                </div>
            )
        case 'ImageSwatchData':
            return (
                <div
                    className="w-full h-full mr-4 mb-4 rounded cursor-pointer"
                    style={{ backgroundImage: `url(${value})` }
                    }
                >
                </div >
            )
        case 'TextSwatchData':
            return (
                <div
                    className="flex items-center justify-center w-full h-full mr-4 mb-4 text-sm text-center text-gray-700 border border-blue-400 rounded cursor-pointer"
                >
                    {value}
                </div>
            )
        default:
            return <></>
    }
}