'use strict';

const visit = require('unist-util-visit');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * lang 문자열에서 {1,3-5} 하이라이트 라인을 파싱하고 제거합니다.
 */
function parseHighlightLines(rawLang) {
  let lang = rawLang;
  let highlightLines = '';

  const hlMatch = lang.match(/\{([^}]+)\}/);
  if (hlMatch) {
    highlightLines = hlMatch[1]
      .split(',')
      .map(s => {
        const t = s.trim();
        return t.includes('-') ? t.replace('-', ',') : t;
      })
      .join(' ');
    lang = lang.replace(hlMatch[0], '').trim();
  }

  return { lang, highlightLines };
}

/**
 * 다음 형제 paragraph 노드에서 {: file="filename"} 구문을 파싱합니다.
 * 매칭되면 filename 문자열, 아니면 빈 문자열을 반환합니다.
 */
function getFilenameFromNextSibling(nextSibling) {
  if (!nextSibling || nextSibling.type !== 'paragraph') return '';

  const text = (nextSibling.children || [])
    .filter(c => c.type === 'text')
    .map(c => c.value)
    .join('')
    .trim();

  // {: file="filename"} 또는 {: file='filename'}
  const match = text.match(/^\{:\s*file=["']([^"']+)["']\s*\}$/);
  return match ? match[1] : '';
}

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  const {
    terminal = 'carbon',
    theme = 'dracula',
    lineNumbers = false,
  } = pluginOptions;

  // 제거할 {: file="..."} 단락 노드를 수집 (visit 중 splice 금지)
  const removeTargets = []; // { parent, siblingNode }

  visit(markdownAST, 'code', (node, index, parent) => {
    const { lang, highlightLines } = parseHighlightLines(node.lang || '');

    // 코드 블록 바로 다음 형제에서 {: file="..."} 파싱
    const nextSibling = parent?.children?.[index + 1];
    const filename = getFilenameFromNextSibling(nextSibling);

    if (filename && parent) {
      removeTargets.push({ parent, siblingNode: nextSibling });
    }

    // deckgo-highlight-code 속성 조립
    const attrs = [
      lang ? `language="${lang}"` : '',
      terminal ? `terminal="${terminal}"` : '',
      theme ? `theme="${theme}"` : '',
      lineNumbers ? 'line-numbers="true"' : '',
      highlightLines ? `highlight-lines="${highlightLines}"` : '',
    ]
      .filter(Boolean)
      .join(' ');

    const deckgoEl =
      `<deckgo-highlight-code ${attrs}>` +
      `<code slot="code">${escapeHtml(node.value || '')}</code>` +
      `</deckgo-highlight-code>`;

    // 언어 또는 파일명이 있을 때만 헤더 추가
    let headerHtml = '';
    if (lang || filename) {
      const langBadge = lang
        ? `<span class="code-lang">${escapeHtml(lang)}</span>`
        : '';
      const filenameBadge = filename
        ? `<span class="code-filename">${escapeHtml(filename)}</span>`
        : '';
      headerHtml = `<div class="code-block-header">${langBadge}${filenameBadge}</div>`;
    }

    node.type = 'html';
    node.children = undefined;
    node.value = `<div class="code-block">${headerHtml}${deckgoEl}</div>`;
  });

  // {: file="..."} 단락 노드를 AST에서 제거
  for (const { parent, siblingNode } of removeTargets) {
    const idx = parent.children.indexOf(siblingNode);
    if (idx !== -1) {
      parent.children.splice(idx, 1);
    }
  }

  return markdownAST;
};
