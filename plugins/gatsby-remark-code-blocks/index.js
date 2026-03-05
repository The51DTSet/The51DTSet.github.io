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
 * lang 문자열에서 :title=파일명, {1,3-5} 하이라이트 라인을 파싱합니다.
 * 예: javascript:title=파일명.js{1,3-5}
 */
function parseCodeInfo(rawLang) {
  let lang = rawLang || '';
  let title = '';
  let highlightLines = '';

  // :title=파일명 파싱 (콜론 이후, { 또는 끝까지)
  const titleMatch = lang.match(/:title=([^{}\s]+)/);
  if (titleMatch) {
    title = titleMatch[1].trim();
    lang = lang.replace(titleMatch[0], '').trim();
  }

  // {1,3-5} 하이라이트 라인 파싱
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

  return { lang, title, highlightLines };
}

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  const {
    terminal = 'carbon',
    theme = 'dracula',
    lineNumbers = false,
  } = pluginOptions;

  visit(markdownAST, 'code', node => {
    const { lang, title, highlightLines } = parseCodeInfo(node.lang || '');

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

    let headerHtml = '';
    if (lang || title) {
      const label = title || lang;
      headerHtml =
        `<div class="code-block-header">` +
        `<span class="code-block-title">${escapeHtml(label)}</span>` +
        `<button class="code-copy-btn" aria-label="코드 복사">복사</button>` +
        `</div>`;
    }

    node.type = 'html';
    node.children = undefined;
    node.value = `<div class="code-block">${headerHtml}${deckgoEl}</div>`;
  });

  return markdownAST;
};
