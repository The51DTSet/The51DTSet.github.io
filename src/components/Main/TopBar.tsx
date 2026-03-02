import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
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
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="title">Title</div>
      <button
        type="button"
        className="btn-search"
        aria-label="검색"
        onClick={toggleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="ico-search" />
        <FontAwesomeIcon icon={faXmark} className="ico-close" />
      </button>
      <PostSearch />
    </div>
  )
}

export default TabBar
