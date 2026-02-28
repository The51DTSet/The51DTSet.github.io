import React, { FunctionComponent } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PostFrontmatterType } from 'types/PostItem.types'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons'

type PostItemProps = PostFrontmatterType & { link: string }

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) {
  return (
    <Link to={link} className="post-item">
      <GatsbyImage
        image={gatsbyImageData}
        alt="Post Item Image"
        className="thumbnail"
      />

      <div className="text-wrapper">
        <p className="title">{title}</p>
        <p className="desc">{summary}</p>
        <div className="info-wrapper">
          <div className="date">
            <FontAwesomeIcon icon={faCalendar} className="ico" />
            {date}
          </div>
          <div className="categories">
            <FontAwesomeIcon icon={faFolderOpen} className="ico" />

            {categories.map(category => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostItem
