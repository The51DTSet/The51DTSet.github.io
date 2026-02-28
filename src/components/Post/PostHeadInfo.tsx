import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export type PostHeadInfoProps = {
  title: string
  date: string
  categories: string[]
}

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  categories,
}) {
  const goBackPage = () => window.history.back()

  return (
    <div className="post-head-inner">
      <button type="button" onClick={goBackPage} className="btn-back">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="post-title">{title}</div>
      <div className="post-info">
        <div>{categories.join(' / ')}</div>
        <div>{date}</div>
      </div>
    </div>
  )
}

export default PostHeadInfo
