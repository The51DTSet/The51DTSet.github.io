import React, { type FC } from 'react'

import { icons } from 'constants/icons'

interface IconProps {
  name: keyof typeof icons
  className: string
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const icon = icons[name]
  return (
    <svg
      className={className}
      viewBox={'viewBox' in icon ? icon.viewBox : undefined}
    >
      <path d={icon.path} />
    </svg>
  )
}

export { Icon }
