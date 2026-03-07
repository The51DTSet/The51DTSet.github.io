/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const path = require('path')
const { spawn } = require('child_process')
const { createFilePath } = require(`gatsby-source-filesystem`)

function getGitLastModified(filePath) {
  return new Promise(resolve => {
    const proc = spawn('git', ['log', '-1', '--format=%aI', '--', filePath], {
      cwd: __dirname,
    })
    let output = ''
    proc.stdout.on('data', data => {
      output += data.toString()
    })
    proc.on('close', code => {
      const dateStr = output.trim()
      resolve(code === 0 && dateStr ? dateStr : null)
    })
    proc.on('error', () => resolve(null))
  })
}

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions, stage }) => {
  const output = getConfig().output || {}

  const config = {
    output,
    resolve: {
      alias: {
        templates: path.resolve(__dirname, 'src/templates'),
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        contexts: path.resolve(__dirname, 'src/contexts'),
        constants: path.resolve(__dirname, 'src/constants'),
      },
    },
  }

  if (stage === 'develop') {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
  }

  actions.setWebpackConfig(config)
}

// Declare gitLastModified as a Date type so formatString works in GraphQL
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemarkFields {
      slug: String
      gitLastModified: Date @dateformat
    }
  `)
}

// Generate a Slug Each Post Data
exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const rawSlug = createFilePath({ node, getNode })
    // 날짜 접두사 제거: /posts/javascript/2026-03-05--제목/ → /posts/javascript/제목/
    const slug = rawSlug.replace(/\/\d{4}-\d{2}-\d{2}--/, '/')
    createNodeField({ node, name: 'slug', value: slug })

    // Auto-detect last modified date from git history (non-blocking)
    const parent = getNode(node.parent)
    let gitLastModified = null

    if (parent && parent.absolutePath) {
      gitLastModified = await getGitLastModified(parent.absolutePath)
    }

    createNodeField({ node, name: 'gitLastModified', value: gitLastModified })
  }
}

// Generate Post Page Through Markdown Data
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // Get All Markdown File For Paging
  const queryAllMarkdownData = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Handling GraphQL Query Error
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`)
    return
  }

  // Import Post Template Component
  const PostTemplateComponent = path.resolve(
    __dirname,
    'src/templates/post-template.tsx',
  )

  // Page Generating Function
  const generatePostPage = ({
    node: {
      fields: { slug },
    },
  }) => {
    const pageOptions = {
      path: slug,
      component: PostTemplateComponent,
      context: { slug },
    }

    createPage(pageOptions)
  }

  // Generate Post Page And Passing Slug Props for Query
  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage)
}
