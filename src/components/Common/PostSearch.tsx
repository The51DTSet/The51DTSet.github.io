import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const PostSearch: FunctionComponent = function () {
  return (
    <div className="search-wrapper">
      <div className="input-item">
        <div className="btn-submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          id="search-input"
          type="search"
          aria-label="search"
          autoComplete="off"
          placeholder="Search"
        />
      </div>
    </div>
  )
}

export default PostSearch
