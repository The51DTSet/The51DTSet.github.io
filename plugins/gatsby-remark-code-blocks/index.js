'use strict'

const visit = require('unist-util-visit')

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * lang 문자열에서 :title=파일명, {1,3-5} 하이라이트 라인을 파싱합니다.
 * 예: javascript:title=파일명.js{1,3-5}
 */
function parseCodeInfo(rawLang) {
  let lang = rawLang || ''
  let title = ''
  let highlightLines = ''

  // :title=파일명 파싱 (콜론 이후, { 또는 끝까지)
  const titleMatch = lang.match(/:title=([^{}\s]+)/)
  if (titleMatch) {
    title = titleMatch[1].trim()
    lang = lang.replace(titleMatch[0], '').trim()
  }

  // {1,3-5} 하이라이트 라인 파싱
  const hlMatch = lang.match(/\{([^}]+)\}/)
  if (hlMatch) {
    highlightLines = hlMatch[1]
      .split(',')
      .map(s => {
        const t = s.trim()
        return t.includes('-') ? t.replace('-', ',') : t
      })
      .join(' ')
    lang = lang.replace(hlMatch[0], '').trim()
  }

  return { lang, title, highlightLines }
}

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  const {
    terminal = 'carbon',
    theme = 'dracula',
    lineNumbers = false,
  } = pluginOptions

  visit(markdownAST, 'code', node => {
    const { lang, title, highlightLines } = parseCodeInfo(node.lang || '')

    const attrs = [
      lang ? `language="${lang}"` : '',
      terminal ? `terminal="${terminal}"` : '',
      theme ? `theme="${theme}"` : '',
      lineNumbers ? 'line-numbers="true"' : '',
      highlightLines ? `highlight-lines="${highlightLines}"` : '',
    ]
      .filter(Boolean)
      .join(' ')

    const deckgoEl = `
      <deckgo-highlight-code ${attrs}>
        <code slot="code">${escapeHtml(node.value || '')}</code>
      </deckgo-highlight-code>
    `

    let headerHtml = ''
    if (lang || title) {
      const label = title || lang
      headerHtml = `
        <div class="code-block-header">
          <span class="code-block-title">${escapeHtml(label)}</span>
          <button class="code-copy-btn" aria-label="코드 복사"><svg class="ico ico-code-copy" viewBox="0 0 640 640"><path d="M352 528H128c-8.8 0-16-7.2-16-16V288c0-8.8 7.2-16 16-16h48v-48h-48c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h224c35.3 0 64-28.7 64-64v-48h-48v48c0 8.8-7.2 16-16 16m-64-160c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm-64-16c0 35.3 28.7 64 64 64h224c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H288c-35.3 0-64 28.7-64 64z"/></svg></button>
        </div>
      `
    }

    node.type = 'html'
    node.children = undefined
    node.value = `<div class="code-block">${headerHtml}${deckgoEl}</div>`
  })

  return markdownAST
}
