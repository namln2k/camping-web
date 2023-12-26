import { SwatchData } from "@/types";

interface Props {
    data: SwatchData
}

const renderSwatch = ({ __typename, value }: SwatchData) => {
    switch (__typename) {
        case 'ColorSwatchData':
            return (
                <div
                    className="w-12 h-12 mr-4 mb-4 border rounded cursor-pointer"
                    style={{ backgroundColor: value }}
                >
                </div>
            )
        case 'ImageSwatchData':
            return (
                <div
                    className="w-12 h-12 mr-4 mb-4 border rounded cursor-pointer"
                    style={{ backgroundImage: `url(${value})` }
                    }
                >
                </div >
            )
        case 'TextSwatchData':
            return (
                <div
                    className="flex items-center justify-center w-12 h-12 mr-4 mb-4 text-sm text-center text-gray-700 border border-black rounded cursor-pointer hover:bg-gray-300"
                >
                    {value}
                </div>
            )
        default:
            return <></>
    }
}

export default function Swatch({ data: { __typename, value }, ...props }: Props) {
    return (
        <div {...props}>
            {renderSwatch({ __typename, value })}
        </div>
    )
}