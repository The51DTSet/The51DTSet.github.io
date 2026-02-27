import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

type LogoImageProps = {
  logoImage: IGatsbyImageData
}

const LogoImageWrapper = styled(GatsbyImage)`
  flex: 0 0 3rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  filter: invert(1);

  @media (max-width: 768px) {
    flex: 0 0 2rem;
    width: 2rem;
    height: 2rem;
  }
`

const LogoImage: FunctionComponent<LogoImageProps> = function ({ logoImage }) {
  return <LogoImageWrapper image={logoImage} alt="Logo Image" />
}

export default LogoImage
