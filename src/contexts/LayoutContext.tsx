import { createContext, useContext } from 'react'

type LayoutContextType = {
  sidebarOpen: boolean
  searchOpen: boolean
  toggleSidebar: () => void
  toggleSearch: () => void
  closeSidebar: () => void
}

export const LayoutContext = createContext<LayoutContextType>({
  sidebarOpen: false,
  searchOpen: false,
  toggleSidebar: () => {},
  toggleSearch: () => {},
  closeSidebar: () => {},
})

export const useLayout = () => useContext(LayoutContext)
