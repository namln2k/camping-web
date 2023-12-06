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
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          disabled={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}
