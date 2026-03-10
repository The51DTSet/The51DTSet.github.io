import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { useGatsbyPluginFusejs } from 'react-use-fusejs'
import { useLayout } from 'contexts/LayoutContext'
import PostList from 'components/Main/PostList'
import { PostListItemType } from 'types/PostItem.types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

type SearchResultItem = {
  id: string
  title: string
  body: string
  slug: string
  date: string
  categories: string[]
  summary: string
  thumbnail: IGatsbyImageData | null
}

export function Search() {
  const { searchOpen } = useLayout()
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

  const posts: PostListItemType[] = result.map(({ item }) => ({
    node: {
      id: item.id,
      fields: { slug: item.slug, gitLastModified: null },
      frontmatter: {
        title: item.title,
        date: item.date,
        categories: item.categories,
        summary: item.summary,
        thumbnail: item.thumbnail
          ? {
              childImageSharp: { gatsbyImageData: item.thumbnail },
              publicURL: '',
            }
          : undefined,
      },
    },
  }))

  return (
    <div
      className={`search-wrapper${searchOpen ? ' open-search' : ''}`}
      id="search"
    >
      <div className="inner">
        <div className="cont">
          <div className="form-group">
            <div className="input-item search-type">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="ico" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                id="search-input"
                aria-label="search"
                autoComplete="off"
                placeholder="Search"
                className="input"
              />
            </div>
          </div>
        </div>
        {query && result.length > 0 && (
          <div className="cont scroll-y">
            <PostList
              selectedCategory="All"
              selectedTag=""
              posts={posts}
              type="search-type"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
