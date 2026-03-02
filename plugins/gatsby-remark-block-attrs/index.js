'use strict';

const visit = require('unist-util-visit');

// 블록 속성을 적용할 수 없는 노드 타입
const SKIP_TYPES = new Set([
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
]);

/**
 * paragraph 노드의 텍스트 내용을 추출합니다.
 */
function getNodeText(node) {
  return (node.children || [])
    .filter(c => c.type === 'text')
    .map(c => c.value)
    .join('')
    .trim();
}

/**
 * "{: .class1 .class2}" 패턴을 파싱합니다.
 * → ['class1', 'class2']
 */
function parseClasses(text) {
  const match = text.match(/^\{:\s*((?:\.\w[\w-]*\s*)+)\}$/);
  if (!match) return null;
  return match[1].trim().split(/\s+/).map(c => c.slice(1));
}

module.exports = ({ markdownAST }) => {
  const removeTargets = [];

  visit(markdownAST, (node, index, parent) => {
    // parent·index가 없는 노드(root 등)나 처리 불필요 타입 건너뜀
    if (!parent || index === null || index === undefined) return;
    if (SKIP_TYPES.has(node.type)) return;

    const nextSibling = parent.children[index + 1];
    if (!nextSibling || nextSibling.type !== 'paragraph') return;

    const text = getNodeText(nextSibling);
    const classes = parseClasses(text);
    if (!classes || classes.length === 0) return;

    // remark-rehype가 HTML 변환 시 className으로 반영
    if (!node.data) node.data = {};
    if (!node.data.hProperties) node.data.hProperties = {};

    const prev = node.data.hProperties.className;
    node.data.hProperties.className = Array.isArray(prev)
      ? [...prev, ...classes]
      : prev
        ? [prev, ...classes]
        : classes;

    // {: .class} 단락을 제거 목록에 추가
    removeTargets.push({ parent, node: nextSibling });
  });

  // visit 완료 후 일괄 제거
  for (const { parent, node } of removeTargets) {
    const i = parent.children.indexOf(node);
    if (i !== -1) parent.children.splice(i, 1);
  }

  return markdownAST;
};
