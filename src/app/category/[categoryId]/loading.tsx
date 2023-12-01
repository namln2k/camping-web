import LoadingFallback from '@/components/LoadingFallback'

export default function Loading() {
  return (
    <div role="status" className="w-full h-screen mx-auto sm:h-96">
      <LoadingFallback height={1000} />
    </div>
  )
}
