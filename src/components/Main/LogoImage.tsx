import React, { FunctionComponent } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

type LogoImageProps = {
  logoImage: IGatsbyImageData
}

const LogoImage: FunctionComponent<LogoImageProps> = function ({ logoImage }) {
  return (
    <div>
      <GatsbyImage image={logoImage} className="logo-image" alt="Logo Image" />
    </div>
  )
}

export default LogoImage
