import React, { FunctionComponent, ReactNode, useState } from 'react'
import Footer from 'components/Common/Footer'
import { LayoutContext } from 'contexts/LayoutContext'

type TemplateProps = {
  hasSidebar?: boolean
  children: ReactNode
}

const Template: FunctionComponent<TemplateProps> = function ({
  hasSidebar = false,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const classList = [
    hasSidebar ? 'has-sidebar' : '',
    sidebarOpen ? 'open-sidebar' : '',
    searchOpen ? 'open-search' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        searchOpen,
        toggleSidebar: () => setSidebarOpen(v => !v),
        toggleSearch: () => setSearchOpen(v => !v),
      }}
    >
      <div id="wrap" className={classList}>
        {children}
        <Footer />
      </div>
    </LayoutContext.Provider>
  )
}

export default Template
