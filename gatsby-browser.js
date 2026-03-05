/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it

import 'prismjs/themes/prism-tomorrow.css'
import './src/assets/styles/index.scss'

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
deckDeckGoHighlightElement()

const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`

export const onClientEntry = () => {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.code-copy-btn')
    if (!btn) return

    const codeEl = btn
      .closest('.code-block')
      ?.querySelector('code[slot="code"]')
    if (!codeEl) return

    navigator.clipboard.writeText(codeEl.textContent).then(() => {
      const prev = btn.textContent
      btn.textContent = '복사됨'
      setTimeout(() => {
        btn.textContent = prev
      }, 2000)
    })
  })
}
