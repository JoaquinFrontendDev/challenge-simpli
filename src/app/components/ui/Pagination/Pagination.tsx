import styles from './Pagination.module.css'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (currentPage: number) => void
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button
          onClick={() => {
            onPageChange(currentPage - 1)
          }}
        >
          Anterior
        </button>
      )}

      {[...Array(totalPages).keys()].map((pageNumber) => (
        <button
          key={pageNumber + 1}
          className={currentPage === pageNumber + 1 ? styles.active : ''}
          onClick={() => {
            onPageChange(pageNumber + 1)
          }}
        >
          {pageNumber + 1}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => {
            onPageChange(currentPage + 1)
          }}
        >
          Siguiente
        </button>
      )}
    </div>
  )
}

export default Pagination
