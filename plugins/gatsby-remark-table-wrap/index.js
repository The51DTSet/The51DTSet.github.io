'use strict'

const visit = require('unist-util-visit')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'table', (node, index, parent) => {
    if (!parent || index === null || index === undefined) return

    const wrapper = {
      type: 'tableWrapper',
      children: [node],
      data: {
        hName: 'div',
        hProperties: { className: ['table-wrap'] },
      },
    }

    parent.children.splice(index, 1, wrapper)
    return [visit.SKIP, index + 1]
  })

  return markdownAST
}
