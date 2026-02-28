import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

const BreadCrumb: FunctionComponent = function () {
  return (
    <div className="breadcrumb-wrapper">
      <ul>
        <li>
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default BreadCrumb
