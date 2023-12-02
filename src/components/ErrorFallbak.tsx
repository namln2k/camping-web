export default function ErrorFallback() {
  return (
    <>
      <div className="w-full h-full">
        <p className="italic font-bold text-2xl">
          Oops, something went wrong while we tried to fetch the data for this
          section. Please try again later.
        </p>
      </div>
    </>
  )
}
