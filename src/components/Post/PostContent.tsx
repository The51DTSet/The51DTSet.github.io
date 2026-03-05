import React, { FunctionComponent, useEffect, useRef } from 'react'

interface PostContentProps {
  html: string
}

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      className="post-contents"
    />
  )
}

export default PostContent
