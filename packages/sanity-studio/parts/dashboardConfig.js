export default {
  widgets: [
    {
      name: 'sanity-shopify-intro',
      layout: {
        width: 'large',
        height: 'small'
      }
    },
    /*
    {
      name: 'sanity-tutorials'
    },
    {
      name: 'project-info'
    },
    */
    {
      name: 'document-list',
      options: {
        title: 'Recently updated products',
        types: ['product'],
        order: '_updatedAt desc',
        showCreateButton: false
      }
    },
    {
      name: 'document-list',
      options: {
        title: 'Recently updated variants',
        types: ['productVariant'],
        order: '_updatedAt desc',
        showCreateButton: false
      }
    }
  ]
}
