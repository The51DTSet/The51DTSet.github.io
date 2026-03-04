import React, { FunctionComponent, useEffect, useRef } from 'react'

interface PostContentProps {
  html: string
}

const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current
      .querySelectorAll<HTMLElement>('.code-block .code-block-header')
      .forEach(block => {
        if (block.querySelector('.copy-btn')) return

        const btn = document.createElement('button')
        btn.className = 'copy-btn'
        btn.setAttribute('aria-label', 'Copy code to clipboard')
        btn.innerHTML = COPY_ICON

        btn.addEventListener('click', async () => {
          const codeEl = block.querySelector(
            'deckgo-highlight-code > code[slot="code"]',
          )
          const text = codeEl?.textContent?.trim() ?? ''

          try {
            await navigator.clipboard.writeText(text)
          } catch {
            // clipboard API 미지원 브라우저 fallback
            const ta = document.createElement('textarea')
            ta.value = text
            ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0'
            document.body.appendChild(ta)
            ta.focus()
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
          }

          btn.innerHTML = CHECK_ICON
          btn.classList.add('copied')
          setTimeout(() => {
            btn.innerHTML = COPY_ICON
            btn.classList.remove('copied')
          }, 2000)
        })

        block.appendChild(btn)
      })
  }, [html])

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      className="post-contents"
    />
  )
}

export default PostContent
