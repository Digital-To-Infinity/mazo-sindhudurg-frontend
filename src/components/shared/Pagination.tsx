import Link from 'next/link'

interface PaginationProps {
  currentPage?: number
  totalPages?: number
  basePath?: string
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  basePath = '',
}: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Pagination">
      {currentPage > 1 && (
        <Link href={`${basePath}?page=${currentPage - 1}`} className="pagination-btn">
          &larr; Prev
        </Link>
      )}
      <span className="pagination-info">Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`} className="pagination-btn">
          Next &rarr;
        </Link>
      )}
    </nav>
  )
}
