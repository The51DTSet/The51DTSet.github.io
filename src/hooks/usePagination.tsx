import { useState, useMemo, useEffect } from 'react'
import { PostListItemType } from 'types/PostItem.types'

const ITEMS_PER_PAGE = 10

const usePagination = (selectedCategory: string, posts: PostListItemType[]) => {
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory, posts],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)

  const postList = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return { postList, currentPage, totalPages, setCurrentPage }
}

export default usePagination
