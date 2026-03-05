import React, { FunctionComponent, memo } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PostFrontmatterType } from 'types/PostItem.types'
import { Link } from 'gatsby'

import { Icon } from 'components/Common/icon'

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
            <Icon name="calendar" className="ico ico-calendar" />
            {date}
          </div>
          <div className="categories">
            <Icon name="folder" className="ico ico-folder" />
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
