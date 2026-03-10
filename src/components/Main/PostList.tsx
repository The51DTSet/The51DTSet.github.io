import React, { FunctionComponent } from 'react'
import PostItem from 'components/Main/PostItem'
import Pagination from 'components/Main/Pagination'
import { PostListItemType } from 'types/PostItem.types'
import usePagination from 'hooks/usePagination'

type PostListProps = {
  selectedCategory: string
  selectedTag: string
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
  selectedTag,
  posts,
  type,
}) => {
  const { postList, currentPage, totalPages, setCurrentPage } = usePagination(
    selectedCategory,
    selectedTag,
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pages={pages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}

export default PostList
