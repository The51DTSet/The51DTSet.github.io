import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

type PostTagsProps = {
  tags: string[]
}

const PostTags: FunctionComponent<PostTagsProps> = function ({ tags }) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="post-tags">
      {tags.map(tag => (
        <Link key={tag} to={`/?tag=${tag}`} className="post-tags-item">
          #{tag}
        </Link>
      ))}
    </div>
  )
}

export default PostTags
