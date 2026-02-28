import React, { FunctionComponent } from 'react'

interface PostContentProps {
  html: string
}

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className="post-contents" />
  )
}

export default PostContent
