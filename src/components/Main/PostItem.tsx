import React, { FunctionComponent, memo } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PostFrontmatterType } from 'types/PostItem.types'
import { Link } from 'gatsby'

type PostItemProps = PostFrontmatterType & { link: string }

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  thumbnail,
  link,
}) {
  return (
    <Link to={link} className="post-item">
      {thumbnail ? (
        <GatsbyImage
          image={thumbnail.childImageSharp.gatsbyImageData}
          alt="Post Item Image"
          className="thumbnail"
        />
      ) : (
        <div className="thumbnail thumbnail--none" />
      )}
      <div className="text-wrapper">
        <p className="title">{title}</p>
        <p className="desc">{summary}</p>
        <div className="info-wrapper">
          <div className="date">
            <i className="ico ico-calendar fa-regular fa-calendar"></i>
            {date}
          </div>
          <div className="categories">
            <i className="ico ico-folder fa-regular fa-folder-open"></i>
            {categories.map(category => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(PostItem)
