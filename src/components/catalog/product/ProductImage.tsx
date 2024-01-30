import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { AllHTMLAttributes } from "react";

interface Props extends AllHTMLAttributes<HTMLImageElement> {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
}

export default function ProductImage({ src, width = 400, height = 400, alt = '', ...props }: Props) {
    const { data, error, loading } = useFetch('image/placeholderBase64?type=product');

    if (!src) return (
        <Image
            src="/images/placeholder/product.jpg"
            width={width}
            height={height}
            alt={alt}
            {...props}
            placeholder="empty"
        />
    )

    if (!data?.success) {
        return (
            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                {...props}
                placeholder="empty"
            />
        )
    }

    return (
        <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            {...props}
            placeholder="blur"
            blurDataURL={data.data}
        />
    )
}