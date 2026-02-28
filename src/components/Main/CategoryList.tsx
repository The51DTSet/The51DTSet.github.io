import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

export type CategoryListProps = {
  selectedCategory: string
  categoryList: {
    // 프로퍼티 이름은 문자열, 프로퍼티 값은 숫자임을 나타내는 타입 표기 방법
    [key: string]: number
  }
}

const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  const { pathname, search } = useLocation()

  return (
    <div className="post-list">
      <ul>
        <li>
          <Link
            to="/"
            key="home"
            className={`post-link ${pathname === '/' && !search ? 'on' : ''}`}
          >
            HOME
          </Link>
        </li>
        {Object.entries(categoryList).map(([name, count]) => (
          <li key={name}>
            <Link
              to={`/?category=${name}`}
              className={`post-link ${name === selectedCategory ? 'on' : ''}`}
            >
              {name} <span>{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
