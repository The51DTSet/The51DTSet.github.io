import React, { FunctionComponent } from 'react'
import BreadCrumb from 'components/Common/BreadCrumb'
import PostSearch from 'components/Common/PostSearch'
import { useLayout } from 'contexts/LayoutContext'

const TabBar: FunctionComponent = function () {
  const { toggleSidebar, toggleSearch } = useLayout()

  return (
    <div id="topbar">
      <BreadCrumb />
      <button
        type="button"
        className="btn-menu"
        aria-label="메뉴 열기"
        onClick={toggleSidebar}
      >
        <i className="ico fa-solid fa-bars"></i>
      </button>
      <div className="topbar-title">The51X DT</div>
      <button
        type="button"
        className="btn-search"
        aria-label="검색"
        onClick={toggleSearch}
      >
        <i className="ico ico-search fa-solid fa-magnifying-glass"></i>
        <i className="ico ico-close fa-solid fa-xmark"></i>
      </button>
      <PostSearch />
    </div>
  )
}

export default TabBar
