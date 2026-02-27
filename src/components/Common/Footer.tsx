import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
  font-size: 1.2rem;
  color: #555;
  text-align: center;

  @media (max-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const Footer: FunctionComponent = function () {
  return <FooterWrapper>© 2026 The51DTSet</FooterWrapper>
}

export default Footer
