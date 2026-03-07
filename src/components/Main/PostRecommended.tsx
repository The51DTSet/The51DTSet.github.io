import React, { FunctionComponent, useMemo } from 'react'
import { Link } from 'gatsby'
import { PostListItemType } from 'types/PostItem.types'

type PostRecommendedProps = {
  edges: PostListItemType[]
}

const PostRecommended: FunctionComponent<PostRecommendedProps> = function ({
  edges,
}) {
  const recommended = useMemo(() => {
    return [...edges]
      .sort((a, b) => {
        const aDate = a.node.fields.gitLastModified || a.node.frontmatter.date
        const bDate = b.node.fields.gitLastModified || b.node.frontmatter.date
        return bDate.localeCompare(aDate)
      })
      .slice(0, 5)
  }, [edges])

  return (
    <div className="cont-wrap post-recommended">
      <div className="cont-ttl">
        <h3>Recently Updated</h3>
      </div>
      <div className="cont-box">
        <div className="post-recommended">
          {recommended.map(
            ({
              node: {
                id,
                fields: { slug },
                frontmatter: { title },
              },
            }) => (
              <Link key={id} to={slug} className="post-recommended-item">
                {title}
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default PostRecommended
