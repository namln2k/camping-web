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
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <span className="w-6 h-6">
          <ChevronLeftIcon className="w-6 h-6" />
        </span>
      </button>
      {pages.map((page) => (
        <span
          key={page}
          className={`inline-flex items-center px-5 py-2 ring-1 ring-inset ring-gray-600 border-collapse ml-[-1px] mr-[-1px] cursor-pointer ${
            page === currentPage
              ? 'bg-indigo-500 text-white hover:bg-indigo-600'
              : 'hover:bg-gray-100 '
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </span>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span className="w-6 h-6">
          <ChevronRightIcon className="w-6 h-6" />
        </span>
      </button>
    </div>
  )
}
