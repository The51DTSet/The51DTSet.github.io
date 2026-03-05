import { IGatsbyImageData } from 'gatsby-plugin-image'

export type PostFrontmatterType = {
  title: string
  date: string
  categories: string[]
  tags?: string[]
  summary: string
  author?: string[]
  thumbnail?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
    publicURL: string
  }
}

export type PostListItemType = {
  node: {
    id: string
    fields: {
      slug: string
      gitLastModified?: string | null
    }
    frontmatter: PostFrontmatterType
  }
}

export type PostPageItemType = {
  node: {
    html: string
    tableOfContents: string
    fields: {
      gitLastModified?: string | null
    }
    frontmatter: PostFrontmatterType
  }
}
