import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

const PostTags: FunctionComponent = function () {
  return (
    <div className="post-tags">
      <h3>Post Tags</h3>
      <div className="post-tags-lists">
        <Link to="" className="post-tags-item">
          Tags1
        </Link>
        <Link to="" className="post-tags-item">
          JavaScript
        </Link>
        <Link to="" className="post-tags-item">
          TagName3
        </Link>
      </div>
    </div>
  )
}

export default PostTags
