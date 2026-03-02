import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'

type PostTocProps = {
  tableOfContents: string
}

const PostToc: FunctionComponent<PostTocProps> = ({ tableOfContents }) => {
  const [activeId, setActiveId] = useState<string>('')
  const [hasH1Headings, setHasH1Headings] = useState(false)

  useEffect(() => {
    const h1s = document.querySelectorAll<HTMLElement>('.post-contents h1[id]')
    setHasH1Headings(h1s.length > 0)

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
    if (!tableOfContents) return tableOfContents
    // DOMParser는 브라우저에서만 동작 — SSR 시 초기값(false, '')으로 early return
    if (!hasH1Headings && !activeId) return tableOfContents

    const parser = new DOMParser()
    const doc = parser.parseFromString(tableOfContents, 'text/html')

    // h1이 존재할 때 최상위 <li>(h1 항목)를 제거하고 그 하위 항목을 승격
    if (hasH1Headings) {
      const rootUl = doc.querySelector('ul')
      if (rootUl) {
        const promoted: Element[] = []
        Array.from(rootUl.querySelectorAll(':scope > li')).forEach(li => {
          const nested = li.querySelector(':scope > ul')
          if (nested) {
            Array.from(nested.querySelectorAll(':scope > li')).forEach(
              child => {
                promoted.push(child)
              },
            )
          }
        })
        rootUl.innerHTML = ''
        promoted.forEach(item => rootUl.appendChild(item))
      }
    }

    // 현재 스크롤 위치에 해당하는 링크 활성화
    if (activeId) {
      doc.querySelectorAll('a').forEach(link => {
        const href = decodeURIComponent(link.getAttribute('href') ?? '')
          .slice(1)
          .toLowerCase()
        link.classList.toggle('toc-active', href === activeId)
      })
    }

    return doc.body.innerHTML
  }, [tableOfContents, activeId, hasH1Headings])

  if (!tableOfContents) return null

  return (
    <div className="toc-container">
      <h3 className="toc-title">Contents</h3>
      <div className="toc" dangerouslySetInnerHTML={{ __html: processedToc }} />
    </div>
  )
}

export default PostToc
