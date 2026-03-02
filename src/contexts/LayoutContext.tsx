import { createContext, useContext } from 'react'

type LayoutContextType = {
  sidebarOpen: boolean
  searchOpen: boolean
  toggleSidebar: () => void
  toggleSearch: () => void
}

export const LayoutContext = createContext<LayoutContextType>({
  sidebarOpen: false,
  searchOpen: false,
  toggleSidebar: () => {},
  toggleSearch: () => {},
})

export const useLayout = () => useContext(LayoutContext)
