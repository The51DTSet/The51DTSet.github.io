import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { PostPageItemType } from 'types/PostItem.types'
import Template from 'components/Common/Template'
import Seo from 'components/Common/Seo'
import PostHead from 'components/Post/PostHead'
import PostContent from 'components/Post/PostContent'
import CommentWidget from 'components/Post/CommentWidget'
import PostToc from 'components/Post/PostToc'
import PostAuthor from 'components/Post/PostAuthor'

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: {
    href: string
  }
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const {
    node: {
      html,
      tableOfContents,
      frontmatter: {
        title,
        date,
        categories,
        author,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = edges[0]

  return (
    <Template>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <div id="container">
        <div id="contents">
          <div className="contents-left">
            {author && author.length > 0 && (
              <PostAuthor authorIds={author} />
            )}
            <PostContent html={html} />
            <CommentWidget />
          </div>
          <div className="contents-right">
            <PostToc tableOfContents={tableOfContents} />
          </div>
        </div>
      </div>
    </Template>
  )
}

export default PostTemplate

export const Head = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}: PostTemplateProps) => {
  const {
    node: {
      frontmatter: {
        title,
        summary,
        thumbnail: { publicURL },
      },
    },
  } = edges[0]
  return (
    <Seo
      title={title}
      description={summary}
      url={location.href}
      image={publicURL}
    />
  )
}

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          tableOfContents(maxDepth: 4)
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD")
            categories
            author
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`
