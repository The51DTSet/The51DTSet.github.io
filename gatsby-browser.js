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

const COPY_ICON = `<svg class="ico ico-code-copy" viewBox="0 0 640 640"><path d="M352 528H128c-8.8 0-16-7.2-16-16V288c0-8.8 7.2-16 16-16h48v-48h-48c-35.3 0-64 28.7-64 64v224c0 35.3 28.7 64 64 64h224c35.3 0 64-28.7 64-64v-48h-48v48c0 8.8-7.2 16-16 16m-64-160c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm-64-16c0 35.3 28.7 64 64 64h224c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H288c-35.3 0-64 28.7-64 64z"/></svg>`

const CHECK_ICON = `<svg class="ico ico-code-check" viewBox="0 0 640 640"><path d="M530.8 134.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>`

export const onClientEntry = () => {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.code-copy-btn')
    if (!btn) return

    const codeEl = btn
      .closest('.code-block')
      ?.querySelector('code[slot="code"]')
    if (!codeEl) return

    const text = codeEl.textContent
    const showCopied = () => {
      const prev = btn.innerHTML
      btn.innerHTML = CHECK_ICON
      setTimeout(() => {
        btn.innerHTML = prev
      }, 2000)
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(showCopied)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      showCopied()
    }
  })
}
