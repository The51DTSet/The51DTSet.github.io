import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

type PostNavItem = {
  slug: string
  title: string
}

type PostPrevNextProps = {
  prev: PostNavItem | null
  next: PostNavItem | null
}

const PostPrevNext: FunctionComponent<PostPrevNextProps> = function ({
  prev,
  next,
}) {
  if (!prev && !next) return null

  return (
    <div className="post-prev-next">
      {prev ? (
        <Link to={prev.slug} className="post-prev-item">
          <strong>Previous</strong>
          <p>{prev.title}</p>
        </Link>
      ) : (
        <div className="post-prev-item post-nav-empty">
          <strong>Previous</strong>
          <p>-</p>
        </div>
      )}
      {next ? (
        <Link to={next.slug} className="post-next-item">
          <strong>Next</strong>
          <p>{next.title}</p>
        </Link>
      ) : (
        <div className="post-next-item post-nav-empty">
          <strong>Next</strong>
          <p>-</p>
        </div>
      )}
    </div>
  )
}

export default PostPrevNext
