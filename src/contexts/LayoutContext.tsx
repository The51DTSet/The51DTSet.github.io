import { createContext, useContext } from 'react'

type LayoutContextType = {
  sidebarOpen: boolean
  searchOpen: boolean
  tocOpen: boolean
  toggleSidebar: () => void
  toggleSearch: () => void
  closeSidebar: () => void
  toggleToc: () => void
}

export const LayoutContext = createContext<LayoutContextType>({
  sidebarOpen: false,
  searchOpen: false,
  tocOpen: false,
  toggleSidebar: () => {},
  toggleSearch: () => {},
  closeSidebar: () => {},
  toggleToc: () => {},
})

export const useLayout = () => useContext(LayoutContext)
