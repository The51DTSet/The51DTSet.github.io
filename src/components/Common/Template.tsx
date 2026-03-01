import React, { FunctionComponent, ReactNode } from 'react'
import Footer from 'components/Common/Footer'

type TemplateProps = {
  hasSidebar?: boolean
  children: ReactNode
}

const Template: FunctionComponent<TemplateProps> = function ({
  hasSidebar = false,
  children,
}) {
  return (
    <div id="wrap" className={`${hasSidebar ? 'has-sidebar' : ''}`}>
      {children}
      <Footer />
    </div>
  )
}

export default Template
