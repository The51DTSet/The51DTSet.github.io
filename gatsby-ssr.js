/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require('react')
const { config } = require('@fortawesome/fontawesome-svg-core')
config.autoAddCss = false

// SVG 아이콘이 JS로 삽입되기 전 크게 보이는 현상(FOUC) 방지
// webpack이 fs를 처리하지 못하므로 핵심 규칙만 인라인으로 주입
const FA_CRITICAL_CSS =
  '.svg-inline--fa{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;width:1.25em}'

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })
  setHeadComponents([
    React.createElement('style', {
      key: 'fa-svg-fouc',
      dangerouslySetInnerHTML: { __html: FA_CRITICAL_CSS },
    }),
  ])
}
