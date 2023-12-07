import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface Props {
  currentPage: number
  pageSize: number
  totalCount: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalCount / pageSize)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <>
      <div className="mt-12 flex items-center justify-between px-0 md:pl-16 md:pr-24">
        <p className="hidden md:block text-center">
          Showing{' '}
          <span className="font-medium">
            {(currentPage - 1) * pageSize + 1}
          </span>{' '}
          to&nbsp;
          <span className="font-medium">
            {Math.min(currentPage * pageSize, totalCount)}
          </span>{' '}
          of <span className="font-medium">{totalCount}</span> results
        </p>
        <div className="flex items-center justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="!rounded-r-none border-gray-300 w-20 h-16 rounded-l-lg disabled:!opacity-30"
          >
            <span className="w-8 h-8 inline-block mt-1">
              <ChevronLeftIcon className="w-8 h-8" />
            </span>
          </button>
          <ul className="inline-flex">
            {pages.map((page, index) => (
              <button
                key={index}
                disabled={page === currentPage}
                onClick={() => onPageChange(page)}
                className={`${
                  page === currentPage
                    ? 'bg-blue-600 text-white !opacity-100 border-blue-600'
                    : 'border-gray-300'
                } border !rounded-none w-16 h-16 border-collapse`}
              >
                {page}
              </button>
            ))}
          </ul>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="!rounded-l-none border-gray-300 w-20 h-16 rounded-r-lg disabled:!opacity-30"
          >
            <span className="w-8 h-8 inline-block mt-1">
              <ChevronRightIcon className="w-8 h-8" />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
