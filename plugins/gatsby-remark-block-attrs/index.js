'use strict';

const visit = require('unist-util-visit');

// 블록 레벨에서 "다음 형제 paragraph" 패턴을 적용하지 않을 타입
const BLOCK_SKIP_TYPES = new Set([
  'root', 'yaml', 'toml', 'html', 'text', 'inlineCode',
  'definition', 'footnoteDefinition', 'break', 'image',
  'link', 'emphasis', 'strong',
]);

/**
 * "{: .class1 .class2 key="value"}" 파싱
 * → { classes: ['class1', 'class2'], attrs: { key: 'value' } }
 */
function parseAttrs(text) {
  const match = text.trim().match(/^\{:\s*([^}]+)\}$/);
  if (!match) return null;

  const raw = match[1].trim();
  const classes = [];
  const attrs = {};

  const tokens = raw.match(/\.\w[\w-]*|\w[\w-]*=(?:"[^"]*"|'[^']*'|\S+)/g) || [];
  for (const token of tokens) {
    if (token.startsWith('.')) {
      classes.push(token.slice(1));
    } else {
      const eqIdx = token.indexOf('=');
      const key = token.slice(0, eqIdx);
      let val = token.slice(eqIdx + 1);
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      attrs[key] = val;
    }
  }

  if (classes.length === 0 && Object.keys(attrs).length === 0) return null;
  return { classes, attrs };
}

/**
 * paragraph가 순수한 attr paragraph인지 확인.
 * 텍스트 노드만 있고, 전체 내용이 {: ...} 패턴이어야 한다.
 */
function getBlockAttrText(node) {
  if (node.type !== 'paragraph') return null;
  const children = node.children || [];
  // 텍스트 노드 외 다른 노드(link, strong 등)가 있으면 attr paragraph가 아님
  if (children.some(c => c.type !== 'text')) return null;
  const text = children.map(c => c.value).join('').trim();
  return parseAttrs(text) ? text : null;
}

function applyAttrs(node, parsed) {
  if (!node.data) node.data = {};
  if (!node.data.hProperties) node.data.hProperties = {};

  if (parsed.classes.length > 0) {
    const prev = node.data.hProperties.className;
    node.data.hProperties.className = Array.isArray(prev)
      ? [...prev, ...parsed.classes]
      : prev
        ? [prev, ...parsed.classes]
        : parsed.classes;
  }

  for (const [key, val] of Object.entries(parsed.attrs)) {
    node.data.hProperties[key] = val;
  }
}

module.exports = ({ markdownAST }) => {
  const removeTargets = new Set();

  // ── 1. 블록 레벨: 노드 다음 형제가 순수 attr paragraph 인 경우 ──
  visit(markdownAST, (node, index, parent) => {
    if (!parent || index === null || index === undefined) return;
    if (BLOCK_SKIP_TYPES.has(node.type)) return;

    const next = parent.children[index + 1];
    if (!next) return;

    const text = getBlockAttrText(next);
    if (!text) return;

    const parsed = parseAttrs(text);
    if (!parsed) return;

    applyAttrs(node, parsed);
    removeTargets.add(next);
  });

  // ── 2. 인라인: paragraph 마지막 자식이 {: ...} 텍스트인 경우 ──
  // 이미 handler 1이 소유한 attr paragraph는 건너뜀
  visit(markdownAST, 'paragraph', paragraphNode => {
    // handler 1에서 제거 예정인 attr paragraph 자체는 처리하지 않음
    if (removeTargets.has(paragraphNode)) return;

    const children = paragraphNode.children || [];
    if (children.length === 0) return;

    const last = children[children.length - 1];
    if (last.type !== 'text') return;

    const parsed = parseAttrs(last.value.trim());
    if (!parsed) return;

    // 직전 형제가 link/image 이면 그 요소에, 아니면 paragraph에 적용
    const prev = children.length >= 2 ? children[children.length - 2] : null;
    if (prev && (prev.type === 'link' || prev.type === 'image')) {
      applyAttrs(prev, parsed);
    } else {
      applyAttrs(paragraphNode, parsed);
    }

    children.pop();
  });

  // ── 일괄 제거 ──
  visit(markdownAST, (node, index, parent) => {
    if (!parent || index === null || index === undefined) return;
    if (removeTargets.has(node)) {
      parent.children.splice(index, 1);
      return [visit.SKIP, index];
    }
  });

  return markdownAST;
};
