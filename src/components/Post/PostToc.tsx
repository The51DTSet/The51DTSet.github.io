import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type PostTocProps = {
  tableOfContents: string
}

const PostToc: FunctionComponent<PostTocProps> = ({ tableOfContents }) => {
  const [activeId, setActiveId] = useState<string>('')
  const [hasH1Headings, setHasH1Headings] = useState(false)
  const tocRef = useRef<HTMLDivElement>(null)

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

  // TOC HTML 파싱 + h1 승격: tableOfContents, hasH1Headings 변경 시에만 실행
  const parsedToc = useMemo(() => {
    if (!tableOfContents) return tableOfContents
    if (!hasH1Headings) return tableOfContents

    const parser = new DOMParser()
    const doc = parser.parseFromString(tableOfContents, 'text/html')

    const rootUl = doc.querySelector('ul')
    if (rootUl) {
      const promoted: Element[] = []
      Array.from(rootUl.querySelectorAll(':scope > li')).forEach(li => {
        const nested = li.querySelector(':scope > ul')
        if (nested) {
          Array.from(nested.querySelectorAll(':scope > li')).forEach(child => {
            promoted.push(child)
          })
        }
      })
      rootUl.innerHTML = ''
      promoted.forEach(item => rootUl.appendChild(item))
    }

    return doc.body.innerHTML
  }, [tableOfContents, hasH1Headings])

  // active 클래스 토글: DOMParser 없이 직접 DOM 조작 (스크롤마다 실행)
  useEffect(() => {
    if (!tocRef.current) return
    tocRef.current.querySelectorAll('a').forEach(link => {
      const href = decodeURIComponent(link.getAttribute('href') ?? '')
        .slice(1)
        .toLowerCase()
      link.classList.toggle('toc-active', href === activeId)
    })
  }, [activeId, parsedToc])

  if (!tableOfContents) return null

  return (
    <nav className="toc-container" aria-label="목차">
      <h3 className="toc-title">Contents</h3>
      <div
        ref={tocRef}
        className="toc"
        dangerouslySetInnerHTML={{ __html: parsedToc }}
      />
    </nav>
  )
}

export default PostToc
