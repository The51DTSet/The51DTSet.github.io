import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faCalendar,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { useGatsbyPluginFusejs } from 'react-use-fusejs'

type SearchResultItem = {
  id: string
  title: string
  body: string
  slug: string
  date: string
  categories: string[]
  summary: string
  thumbnail: string
}

export function Search() {
  const data = useStaticQuery(graphql`
    {
      fusejs {
        index
        data
      }
    }
  `)

  const [query, setQuery] = React.useState('')
  const result = useGatsbyPluginFusejs(query, data.fusejs) as Array<{
    item: SearchResultItem
  }>

  return (
    <div className="search-wrapper" id="search">
      <div className="inner">
        <div className="input-item">
          <div className="btn-submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            id="search-input"
            type="search"
            aria-label="search"
            autoComplete="off"
            placeholder="Search"
          />
        </div>
        {query && result.length > 0 && (
          <ul className="search-result-list">
            {result.map(({ item }) => (
              <li key={item.id} className="search-result-item">
                <Link to={item.slug} className="search-result-link">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="search-result-thumbnail"
                    />
                  )}
                  <div className="search-result-text">
                    <p className="search-result-title">{item.title}</p>
                    {item.summary && (
                      <p className="search-result-summary">{item.summary}</p>
                    )}
                    <div className="search-result-info">
                      {item.date && (
                        <span className="search-result-date">
                          <FontAwesomeIcon icon={faCalendar} />
                          {item.date}
                        </span>
                      )}
                      {item.categories?.length > 0 && (
                        <span className="search-result-categories">
                          <FontAwesomeIcon icon={faFolderOpen} />
                          {item.categories.join(' / ')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Search
