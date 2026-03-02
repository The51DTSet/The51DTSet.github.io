import { useState, useMemo, useEffect } from 'react'
import { PostListItemType } from 'types/PostItem.types'

const ITEMS_PER_PAGE = 10

const usePagination = (
  selectedCategory: string,
  selectedTag: string,
  posts: PostListItemType[],
) => {
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(
    () =>
      posts.filter(({ node: { frontmatter: { categories, tags } } }) => {
        const categoryMatch =
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true
        const tagMatch = selectedTag
          ? Array.isArray(tags) && tags.includes(selectedTag)
          : true
        return categoryMatch && tagMatch
      }),
    [selectedCategory, selectedTag, posts],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedTag])

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)

  const postList = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return { postList, currentPage, totalPages, setCurrentPage }
}

export default usePagination
