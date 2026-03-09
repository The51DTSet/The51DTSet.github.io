import React, { FunctionComponent } from 'react'
import BreadCrumb from 'components/Common/BreadCrumb'
import PostSearch from 'components/Common/PostSearch'
import { useLayout } from 'contexts/LayoutContext'
import { useStaticQuery, graphql } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'

const TabBar: FunctionComponent = function () {
  const { toggleSidebar, toggleSearch } = useLayout()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          sitename
        }
      }
    }
  `)

  return (
    <div id="topbar">
      <BreadCrumb />
      <button
        type="button"
        className="btn-menu"
        aria-label="메뉴 열기"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} className='ico' />
      </button>
      <div className="topbar-title">{site.siteMetadata.sitename}</div>
      <button
        type="button"
        className="btn-search"
        aria-label="검색"
        onClick={toggleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="ico ico-search" />
        <FontAwesomeIcon icon={faXmark} className='ico ico-close' />
      </button>
      <PostSearch />
    </div>
  )
}

export default TabBar
