/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `The51X DT Center Set Team | BLOG`,
    sitename: `The51X DT`,  // 모바일에서 표시되는 topbar 타이틀
    description: `The51X DT Center Set Team BLOG`,
    author: `@The51XDTSet`,
    siteUrl: `https://The51DTSet.github.io`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-emotion`,
    'gatsby-plugin-sitemap',
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-plugin-fusejs`,
      options: {
        query: `
          {
            allMarkdownRemark {
              nodes {
                id
                rawMarkdownBody
                fields {
                  slug
                }
                frontmatter {
                  title
                  date(formatString: "MMM D, YYYY")
                  categories
                  summary
                  thumbnail {
                    publicURL
                    childImageSharp {
                      gatsbyImageData(width: 768, height: 400)
                    }
                  }
                }
              }
            }
          }
        `,
        keys: ['title', 'body'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map(node => ({
            id: node.id,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            slug: node.fields.slug,
            date: node.frontmatter.date,
            categories: node.frontmatter.categories,
            summary: node.frontmatter.summary,
            thumbnail: node.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData ?? null,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://The51DTSet.github.io',
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          quality: 100,
          placeholder: 'blurred',
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-code-titles`, // 코드블럭 파일명 표시 (prismjs 보다 먼저 와야 함)
          },
          {
            resolve: `gatsby-remark-prismjs`, // 코드블럭 꾸미기
            options: {
              classPrefix: 'language-',
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`, // md파일 헤딩 링크
            options: {
              className: `anchor custom-class`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h1`, `h2`, `h3`, `h4`],
            },
          },
          {
            resolve: `${__dirname}/plugins/gatsby-remark-block-attrs`,
          },
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
  ],
}
