import React, { FunctionComponent, useMemo } from 'react'
import { Link } from 'gatsby'
import { PostListItemType } from 'types/PostItem.types'

type PostTagsProps = {
  edges: PostListItemType[]
  selectedTag: string
}

const PostTags: FunctionComponent<PostTagsProps> = function ({
  edges,
  selectedTag,
}) {
  const tags = useMemo(() => {
    const tagSet = new Set<string>()
    edges.forEach(({ node: { frontmatter: { tags } } }) => {
      if (tags) tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [edges])

  if (tags.length === 0) return null

  return (
    <div className="post-tags">
      <h3>Tags</h3>
      <div className="post-tags-lists">
        {tags.map(tag => (
          <Link
            key={tag}
            to={selectedTag === tag ? '/' : `/?tag=${encodeURIComponent(tag)}`}
            className={`post-tags-item${selectedTag === tag ? ' active' : ''}`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PostTags
