import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'

type PostTocProps = {
  tableOfContents: string
}

const PostToc: FunctionComponent<PostTocProps> = ({ tableOfContents }) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>(
      '.post-contents h1[id], .post-contents h2[id], .post-contents h3[id], .post-contents h4[id]',
    )

    if (!headings.length) return

    const handleScroll = () => {
      let current = ''
      headings.forEach(heading => {
        if (heading.getBoundingClientRect().top <= 130) {
          current = heading.id.toLowerCase()
        }
      })
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const processedToc = useMemo(() => {
    if (!tableOfContents || !activeId) return tableOfContents

    const parser = new DOMParser()
    const doc = parser.parseFromString(tableOfContents, 'text/html')

    doc.querySelectorAll('a').forEach(link => {
      const href = decodeURIComponent(link.getAttribute('href') ?? '')
        .slice(1)
        .toLowerCase()
      link.classList.toggle('toc-active', href === activeId)
    })

    return doc.body.innerHTML
  }, [tableOfContents, activeId])

  if (!tableOfContents) return null

  return (
    <div className="toc-container">
      <h3 className="toc-title">Contents</h3>
      <div className="toc" dangerouslySetInnerHTML={{ __html: processedToc }} />
    </div>
  )
}

export default PostToc
