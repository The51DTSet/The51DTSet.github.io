import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

const PostRecommended: FunctionComponent = function () {
  return (
    <div className="post-recommended">
      <h3>Recommended Posts</h3>
      <div className="post-recommended-lists">
        <Link to="" className="post-recommended-item">
          Recommended Posts Recommended Posts
        </Link>
        <Link to="" className="post-recommended-item">
          Recommended Posts
        </Link>
        <Link to="" className="post-recommended-item">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
          labore? Voluptates maiores deleniti consequatur dolore quaerat quia
          debitis quibusdam et, eaque iusto ut neque tempore in ipsa molestias
          ea sapiente?
        </Link>
        <Link to="" className="post-recommended-item">
          Recommended Posts Recommended Posts
        </Link>
        <Link to="" className="post-recommended-item">
          Recommended Posts
        </Link>
      </div>
    </div>
  )
}

export default PostRecommended
