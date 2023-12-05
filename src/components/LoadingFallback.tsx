interface Props {
  width?: number
  height?: number
  className?: string
  show?: boolean
}

export default function LoadingFallback({
  width,
  height,
  className = '',
  show = true,
}: Props) {
  if (!show) {
    return <></>
  }

  return (
    <div
      role="status"
      className={`mx-auto animate-pulse bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl overflow-hidden ${className}`}
      style={{ width: width ?? '100%', height: height ?? '100%' }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
