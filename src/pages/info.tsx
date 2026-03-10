import React, { FunctionComponent } from 'react'
import Aside from 'components/Main/Aside'
import TopBar from 'components/Main/TopBar'
import Template from 'templates/index-template'
import Seo from 'components/Common/Seo'
import Footer from 'components/Common/Footer'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { PostListItemType } from 'types/PostItem.types'
import { graphql } from 'gatsby'
import PostRecent from 'components/Main/PostRecent'
import PostTags from 'components/Main/PostTags'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
    ogImage: {
      publicURL: string
    }
  }
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
    },
  },
}) {
  return (
    <Template hasSidebar>
      <Aside logoImage={gatsbyImageData} edges={edges} search={search} />
      <div id="container">
        <TopBar />
        <div id="contents">
          <div className="contents-left">dddddddd</div>
          <div className="contents-right">
            <PostRecent edges={edges} />
            <PostTags edges={edges} selectedTag="" />
          </div>
        </div>
        <Footer />
      </div>
    </Template>
  )
}

export default IndexPage

export const Head = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    ogImage: { publicURL },
  },
}: IndexPageProps) => (
  <Seo
    title={title}
    description={description}
    url={siteUrl}
    image={publicURL}
  />
)

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
            gitLastModified(formatString: "MMM D, YYYY")
          }
          frontmatter {
            title
            summary
            date(formatString: "MMM D, YYYY")
            categories
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
    ogImage: file(name: { eq: "og-image" }) {
      publicURL
    }
  }
`
