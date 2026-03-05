import React, { FunctionComponent } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import PostHeadInfo, { PostHeadInfoProps } from 'components/Post/PostHeadInfo'

type PostHeadProps = PostHeadInfoProps & {
  thumbnail?: IGatsbyImageData
}

const PostHead: FunctionComponent<PostHeadProps> = function ({
  title,
  date,
  updatedAt,
  categories,
  thumbnail,
}) {
  return (
    <div className="post-head">
      {thumbnail && (
        <GatsbyImage image={thumbnail} alt="thumbnail" className="post-head-bg" />
      )}
      <PostHeadInfo title={title} date={date} updatedAt={updatedAt} categories={categories} />
    </div>
  )
}

export default PostHead
