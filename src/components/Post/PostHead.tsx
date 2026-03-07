import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import PostHeadInfo, { PostHeadInfoProps } from 'components/Post/PostHeadInfo'
import { Icon } from 'components/Common/icon'
import { useLayout } from 'contexts/LayoutContext'

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
  const { toggleToc } = useLayout()
  const [topbarOn, setTopbarOn] = useState(false)
  const contentsRef = useRef<Element | null>(null)

  useEffect(() => {
    contentsRef.current = document.getElementById('contents')

    const handleScroll = () => {
      if (!contentsRef.current) return
      const contentsBottom =
        contentsRef.current.getBoundingClientRect().top + window.scrollY - 50
      setTopbarOn(window.scrollY > contentsBottom)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="post-head">
      <div className={`post-topbar${topbarOn ? ' on' : ''}`}>
        <div className="section">
          <div className="inner">
            <div className="title">
              <h1>{title}</h1>
            </div>
            <button type="button" className="btn-toc" onClick={toggleToc}>
              <Icon name="listMenu" className="ico ico-menu" />
            </button>
          </div>
        </div>
      </div>
      {thumbnail && (
        <GatsbyImage
          image={thumbnail}
          alt="thumbnail"
          className="post-head-bg"
        />
      )}
      <PostHeadInfo
        title={title}
        date={date}
        updatedAt={updatedAt}
        categories={categories}
      />
    </div>
  )
}

export default PostHead
