import React, { FunctionComponent, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export type PostHeadInfoProps = {
  title: string
  date: string
  updatedAt?: string
  categories: string[]
}

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  updatedAt,
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
          <FontAwesomeIcon icon={faArrowLeft} className='ico' />
        </button>
        <div className="text-wrapper">
          <div className="post-title">{title}</div>
          <div className="post-info">
            <div className="post-dates">
              <span>
                Posted <strong>{date}</strong>
              </span>
              {updatedAt && updatedAt !== date && (
                <span>
                  Updated <strong>{updatedAt}</strong>
                </span>
              )}
            </div>
            {categories?.length > 0 && (
              <div className="post-category">
                {categories.map(x => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostHeadInfo
