import React, { FunctionComponent } from 'react'
import BreadCrumb from 'components/Common/BreadCrumb'
import PostSearch from 'components/Common/PostSearch'
import { useLayout } from 'contexts/LayoutContext'

import { Icon } from 'components/Common/icon'

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
        <Icon name="menu" className="ico ico-menu" />
      </button>
      <div className="title">Title</div>
      <button
        type="button"
        className="btn-search"
        aria-label="검색"
        onClick={toggleSearch}
      >
        <Icon name="search" className="ico ico-search" />
        <Icon name="searchClose" className="ico ico-close" />
      </button>
      <PostSearch />
    </div>
  )
}

export default TabBar
