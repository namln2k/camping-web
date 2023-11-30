export default function Loading() {
  return (
    <div role="status" className="w-[85%] h-screen mx-auto animate-pulse mt-32">
      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-12"></div>
      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-12"></div>
      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-12"></div>
      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-12"></div>
      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-12"></div>
      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
