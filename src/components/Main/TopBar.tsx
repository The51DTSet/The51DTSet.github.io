import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import BreadCrumb from 'components/Common/BreadCrumb'
import PostSearch from 'components/Common/PostSearch'

const handleMenuClick = () => {
  document.getElementById('wrap')?.classList.toggle('open-sidebar')
  // document.getElementById('aside')?.classList.toggle('open-sidebar')
}

const handleSearchClick = () => {
  document.getElementById('wrap')?.classList.toggle('open-search')
  document.getElementById('search')?.classList.toggle('open-search')
  // document.getElementById('aside')?.classList.toggle('open-sidebar')
}

const TabBar: FunctionComponent = function () {
  return (
    <div id="topbar">
      <BreadCrumb />
      <button type="button" className="btn-menu" onClick={handleMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="title">Title</div>
      <button type="button" className="btn-search" onClick={handleSearchClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="ico-search" />
        <FontAwesomeIcon icon={faXmark} className="ico-close" />
      </button>
      <PostSearch />
    </div>
  )
}

export default TabBar
