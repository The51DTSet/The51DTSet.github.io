import React, { FunctionComponent, ReactNode, useState } from 'react'
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
  const [tocOpen, setTocOpen] = useState(false)

  const classList = [
    hasSidebar ? 'has-sidebar' : '',
    sidebarOpen ? 'open-sidebar' : '',
    searchOpen ? 'open-search' : '',
    tocOpen ? 'open-toc' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        searchOpen,
        tocOpen,
        toggleSidebar: () => setSidebarOpen(v => !v),
        toggleSearch: () => setSearchOpen(v => !v),
        closeSidebar: () => setSidebarOpen(false),
        toggleToc: () => setTocOpen(v => !v),
      }}
    >
      <div id="wrap" className={classList}>
        {children}
        <div className="aside-mask" onClick={() => setSidebarOpen(false)}></div>
      </div>
    </LayoutContext.Provider>
  )
}

export default Template
