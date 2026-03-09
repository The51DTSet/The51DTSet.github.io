import { createContext, useContext } from 'react'

type LayoutContextType = {
  sidebarOpen: boolean
  searchOpen: boolean
  tocOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  toggleSearch: () => void
  closeSearch: () => void
  toggleToc: () => void
  closeToc: () => void
}

export const LayoutContext = createContext<LayoutContextType>({
  sidebarOpen: false,
  searchOpen: false,
  tocOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
  toggleSearch: () => {},
  closeSearch: () => {},
  toggleToc: () => {},
  closeToc: () => {},
})

export const useLayout = () => useContext(LayoutContext)
