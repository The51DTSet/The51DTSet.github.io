import React, { FunctionComponent } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import PostHeadInfo, { PostHeadInfoProps } from 'components/Post/PostHeadInfo'

type PostHeadProps = PostHeadInfoProps & {
  thumbnail: IGatsbyImageData
}

const PostHead: FunctionComponent<PostHeadProps> = function ({
  title,
  date,
  categories,
  thumbnail,
}) {
  return (
    <div className="post-head">
      <GatsbyImage
        image={thumbnail}
        alt="thumbnail"
        className="post-head-image"
      />
      <PostHeadInfo title={title} date={date} categories={categories} />
    </div>
  )
}

export default PostHead
