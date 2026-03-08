/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it

import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/regular.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'
import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import './src/assets/styles/index.scss'

const LANGUAGE_NAMES = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  jsx: 'JSX',
  ts: 'TypeScript',
  tsx: 'TSX',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  html: 'HTML',
  json: 'JSON',
  md: 'Markdown',
  markdown: 'Markdown',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  python: 'Python',
  py: 'Python',
  java: 'Java',
  kotlin: 'Kotlin',
  kt: 'Kotlin',
  go: 'Go',
  rust: 'Rust',
  rs: 'Rust',
  cpp: 'C++',
  c: 'C',
  sql: 'SQL',
  yaml: 'YAML',
  yml: 'YAML',
  xml: 'XML',
  graphql: 'GraphQL',
  swift: 'Swift',
  dart: 'Dart',
  ruby: 'Ruby',
  rb: 'Ruby',
  php: 'PHP',
}

function buildHeader(highlightEl, title) {
  if (highlightEl.dataset.headerBuilt) return
  highlightEl.dataset.headerBuilt = 'true'

  const lang = highlightEl.dataset.language || ''
  const langName = LANGUAGE_NAMES[lang] || lang || ''

  // 헤더 엘리먼트 생성
  const header = document.createElement('div')
  header.className = 'gatsby-highlight-header'

  // 언어 이름 뱃지
  if (langName) {
    const langEl = document.createElement('span')
    langEl.className = 'gatsby-code-language'
    langEl.textContent = langName
    header.appendChild(langEl)
  }

  // 파일명 (있을 때만)
  if (title) {
    const titleSpan = document.createElement('span')
    titleSpan.className = 'gatsby-code-title'
    titleSpan.textContent = title
    header.appendChild(titleSpan)
  }

  // 복사 버튼
  const copyBtn = document.createElement('button')
  copyBtn.className = 'gatsby-code-copy'
  copyBtn.textContent = 'Copy'
  copyBtn.addEventListener('click', () => {
    const code = highlightEl.querySelector('code')
    if (!code) return
    const text = code.textContent
    const done = () => {
      copyBtn.textContent = 'Copied!'
      setTimeout(() => {
        copyBtn.textContent = 'Copy'
      }, 2000)
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      done()
    }
  })
  header.appendChild(copyBtn)

  // 기존 자식들을 .gatsby-code-body 로 이동 (헤더와 코드 영역 분리)
  const body = document.createElement('div')
  body.className = 'gatsby-code-body'
  while (highlightEl.firstChild) {
    body.appendChild(highlightEl.firstChild)
  }

  highlightEl.appendChild(header)
  highlightEl.appendChild(body)
}

function setupCodeBlocks() {
  // gatsby-remark-code-titles 가 생성한 .gatsby-code-title (형제 요소) 처리
  document.querySelectorAll('.gatsby-code-title').forEach(titleEl => {
    const title = titleEl.textContent.trim()
    const highlightEl = titleEl.nextElementSibling
    if (!highlightEl?.classList.contains('gatsby-highlight')) return
    buildHeader(highlightEl, title)
    titleEl.remove()
  })

  // 파일명 없는 .gatsby-highlight 처리
  document
    .querySelectorAll('.gatsby-highlight:not([data-header-built])')
    .forEach(highlightEl => {
      buildHeader(highlightEl, null)
    })
}

export const onRouteUpdate = () => {
  setupCodeBlocks()
}
