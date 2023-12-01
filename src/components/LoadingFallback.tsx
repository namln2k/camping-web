interface Props {
  width?: number
  height?: number
  className?: string
  show?: boolean
}

export default function LoadingFallback({
  width,
  height,
  className,
  show,
}: Props) {
  if (!show) {
    return <></>
  }

  if (height && height > 600) {
    return (
      <div
        role="status"
        className={`${className} mx-auto animate-pulse bg-gradient-to-b from-gray-200 to-gray-400 rounded overflow-hidden`}
        style={{ width: width ?? '100%', height }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  const numberOfLines = height ? Math.round(height / 36) : 1

  return (
    <div
      role="status"
      className={`${className} mx-auto animate-pulse bg-white overflow-hidden`}
      style={{ width: width ?? '100%', height: height ?? '100%' }}
    >
      {Array.from({ length: numberOfLines }).map((_, index) => (
        <div key={index} className="h-6 bg-gray-200 rounded-full my-3"></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
