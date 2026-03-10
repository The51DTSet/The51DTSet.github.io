import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

type PaginationProps = {
  currentPage: number
  totalPages: number
  pages: (number | '...')[]
  setCurrentPage: (updater: (p: number) => number) => void
}

const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalPages,
  pages,
  setCurrentPage,
}) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn pagination-prev"
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        <FontAwesomeIcon icon={faAngleLeft} className="ico" />
      </button>
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`pagination-btn pagination-page${currentPage === page ? ' active' : ''}`}
            onClick={() => setCurrentPage(() => page as number)}
          >
            {page}
          </button>
        ),
      )}
      <button
        className="pagination-btn pagination-next"
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        <FontAwesomeIcon icon={faAngleRight} className="ico" />
      </button>
    </div>
  )
}

export default Pagination
