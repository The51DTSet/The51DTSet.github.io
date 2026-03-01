import React, { FunctionComponent } from 'react'
import PostItem from 'components/Main/PostItem'
import { PostListItemType } from 'types/PostItem.types'
import usePagination from 'hooks/usePagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

type PostListProps = {
  selectedCategory: string
  posts: PostListItemType[]
  type: string
}

const getPaginationPages = (
  current: number,
  total: number,
): (number | '...')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '...')[] = [1]

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)

  return pages
}

const PostList: FunctionComponent<PostListProps> = ({
  selectedCategory,
  posts,
  type,
}) => {
  const { postList, currentPage, totalPages, setCurrentPage } = usePagination(
    selectedCategory,
    posts,
  )

  const pages = getPaginationPages(currentPage, totalPages)

  return (
    <>
      <div className={`post-lists ${type}`}>
        {postList.map(
          ({
            node: {
              id,
              fields: { slug },
              frontmatter,
            },
          }: PostListItemType) => (
            <PostItem {...frontmatter} link={slug} key={id} />
          ),
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn pagination-prev"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
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
                onClick={() => setCurrentPage(page as number)}
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
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </>
  )
}

export default PostList
