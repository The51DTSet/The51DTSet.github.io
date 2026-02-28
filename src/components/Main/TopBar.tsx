import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons'
import BreadCrumb from 'components/Common/BreadCrumb'
import PostSearch from 'components/Common/PostSearch'

const handleMenuClick = () => {
  document.getElementById('wrap')?.classList.toggle('open-sidebar')
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
      <button type="button" className="btn-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <PostSearch />
    </div>
  )
}

export default TabBar
