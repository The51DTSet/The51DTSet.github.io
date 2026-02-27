import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'

// prettier-ignore
const defaultStyle = css`
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

#___gatsby {
  width: 100%;
}

body, html {
  width: 100%;
  min-height: 100%;
  color: #222;
  background-color: #fff;
}

html {
  font-size: 10px;
}

body {
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.437;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: grayscale;
}

body, div, h1, h2, h3, h4, h5, h6, span, object, iframe,
p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i, a,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend, input, textarea, select,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary, button,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  color: inherit;
  font-family: 'Pretendard', Lato, 'Microsoft Yahei', sans-serif;;
  letter-spacing: -0.024em;
  vertical-align: baseline;
  background: transparent;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, main, section, summary {
  display: block;
}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

legend,
caption {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  padding: 0;
  margin: -1px;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
}

ol, ul, li {
  list-style: none;
}

em, address, caption, cite, code {
  font-weight: 400;
  font-style: normal;
}

font {
  font-size: inherit;
}

img {
  width: 100%;
  height: auto;
  vertical-align: top;
}

a {
  display: inline-block;
  text-decoration: none;
}

a:focus,
a:active,
a:hover {
  text-decoration: none;
}

:focus:not(:focus-visible) {
  outline: 0;
}

button {
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}

button:hover {
  color: inherit;
}

button[disabled] {
  opacity: 0.4;
}

label {
  cursor: pointer;
}

input, button, select, optgroup, textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  border: 0;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
}

textarea {
  resize: none;
}

.blind {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  padding: 0;
  margin: -1px;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
}

:root {
  --bg-primary: #3a6bff;
  --bg-sub: #f3f3f3;

  --fc-primary: #3a6bff;
  --fc-default: #222;
  --fc-sub: #757575;
  --fc-sub2: #aaa;

  --bc-primary: #3a6bff;
  --bc-default: #ddd;
  --bc-sub: #eee;
}
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
