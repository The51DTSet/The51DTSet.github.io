import React, { FunctionComponent, useEffect, useRef } from 'react'
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
  const initialHistoryLength = useRef(0)

  useEffect(() => {
    initialHistoryLength.current = history.length
  }, [])

  const goBackPage = () => {
    history.go(-(history.length - initialHistoryLength.current + 1))
  }

  return (
    <div className="post-head-info">
      <div className="inner">
        <button type="button" onClick={goBackPage} className="btn-back">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="post-title">{title}</div>
        <div className="post-info">
          <div>{categories.join(' / ')}</div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  )
}

export default PostHeadInfo
