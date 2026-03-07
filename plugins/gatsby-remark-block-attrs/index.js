'use strict'

const visit = require('unist-util-visit')

// 블록 레벨에서 "다음 형제 paragraph" 패턴을 적용하지 않을 타입
const BLOCK_SKIP_TYPES = new Set([
  'root',
  'yaml',
  'toml',
  'html',
  'text',
  'inlineCode',
  'definition',
  'footnoteDefinition',
  'break',
  'image',
  'link',
  'emphasis',
  'strong',
])

/**
 * "{: .class1 .class2 key="value"}" 파싱
 * → { classes: ['class1', 'class2'], attrs: { key: 'value' } }
 */
function parseAttrs(text) {
  const match = text.trim().match(/^\{:\s*([^}]+)\}$/)
  if (!match) return null

  const raw = match[1].trim()
  const classes = []
  const attrs = {}

  const tokens = raw.match(/\.\w[\w-]*|\w[\w-]*=(?:"[^"]*"|'[^']*'|\S+)/g) || []
  for (const token of tokens) {
    if (token.startsWith('.')) {
      classes.push(token.slice(1))
    } else {
      const eqIdx = token.indexOf('=')
      const key = token.slice(0, eqIdx)
      let val = token.slice(eqIdx + 1)
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      attrs[key] = val
    }
  }

  if (classes.length === 0 && Object.keys(attrs).length === 0) return null
  return { classes, attrs }
}

/**
 * paragraph가 순수한 attr paragraph인지 확인.
 * 텍스트 노드만 있고, 전체 내용이 {: ...} 패턴이어야 한다.
 */
function getBlockAttrText(node) {
  if (node.type !== 'paragraph') return null
  const children = node.children || []
  // 텍스트 노드 외 다른 노드(link, strong 등)가 있으면 attr paragraph가 아님
  if (children.some(c => c.type !== 'text')) return null
  const text = children
    .map(c => c.value)
    .join('')
    .trim()
  return parseAttrs(text) ? text : null
}

function applyAttrs(node, parsed) {
  if (!node.data) node.data = {}
  if (!node.data.hProperties) node.data.hProperties = {}

  if (parsed.classes.length > 0) {
    const prev = node.data.hProperties.className
    node.data.hProperties.className = Array.isArray(prev)
      ? [...prev, ...parsed.classes]
      : prev
        ? [prev, ...parsed.classes]
        : parsed.classes
  }

  for (const [key, val] of Object.entries(parsed.attrs)) {
    node.data.hProperties[key] = val
  }
}

module.exports = ({ markdownAST }) => {
  const removeTargets = new Set()

  // ── 1. 블록 레벨: 노드 다음 형제가 순수 attr paragraph 인 경우 ──
  visit(markdownAST, (node, index, parent) => {
    if (!parent || index === null || index === undefined) return
    if (BLOCK_SKIP_TYPES.has(node.type)) return

    const next = parent.children[index + 1]
    if (!next) return

    const text = getBlockAttrText(next)
    if (!text) return

    const parsed = parseAttrs(text)
    if (!parsed) return

    applyAttrs(node, parsed)
    removeTargets.add(next)
  })

  // ── 2. 인라인: text 노드 내 {: ...} 패턴을 직전 형제에 적용 ──
  // 위치 무관 — 중간/끝 어디서든 동작
  visit(markdownAST, 'paragraph', paragraphNode => {
    if (removeTargets.has(paragraphNode)) return

    const children = paragraphNode.children || []
    const emptyIndices = []

    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.type !== 'text') continue

      // text 노드 값 전체에서 {: ...} 패턴을 모두 찾아 처리
      let value = child.value
      let changed = false

      value = value.replace(/\{:\s*[^}]+\}/g, (match, offset) => {
        const parsed = parseAttrs(match)
        if (!parsed) return match

        // 패턴 바로 앞에 텍스트가 없으면 직전 형제 노드에 적용
        const textBefore = value.slice(0, offset).replace(/\{:\s*[^}]+\}/g, '')
        const prev = i > 0 ? children[i - 1] : null
        const INLINE_TYPES = [
          'strong',
          'emphasis',
          'link',
          'image',
          'inlineCode',
        ]

        if (!textBefore.trim() && prev && INLINE_TYPES.includes(prev.type)) {
          applyAttrs(prev, parsed)
        } else {
          applyAttrs(paragraphNode, parsed)
        }

        changed = true
        return ''
      })

      if (changed) {
        child.value = value
        if (!child.value) emptyIndices.push(i)
      }
    }

    // 빈 text 노드 제거 (역순)
    for (let i = emptyIndices.length - 1; i >= 0; i--) {
      children.splice(emptyIndices[i], 1)
    }
  })

  // ── 일괄 제거 ──
  visit(markdownAST, (node, index, parent) => {
    if (!parent || index === null || index === undefined) return
    if (removeTargets.has(node)) {
      parent.children.splice(index, 1)
      return [visit.SKIP, index]
    }
  })

  return markdownAST
}
