export default {
  name: 'shopifyCollection',
  title: 'Shopify',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true
  },
  readOnly: true,
  fieldsets: [
    {
      name: 'status',
      title: 'Status',
      options: {
        columns: 2
      }
    }
  ],
  fields: [
    // Created at
    {
      fieldset: 'status',
      name: 'createdAt',
      title: 'Created at',
      type: 'string'
    },
    // Updated at
    {
      fieldset: 'status',
      name: 'updatedAt',
      title: 'Last updated at',
      type: 'string'
    },
    // Deleted
    {
      fieldset: 'status',
      name: 'isDeleted',
      title: 'Deleted from Shopify?',
      type: 'boolean'
    },
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    // Collection ID
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      description: 'Shopify Collection ID'
    },
    // GID
    {
      name: 'gid',
      title: 'GID',
      type: 'string',
      description: 'Shopify Collection GID'
    },
    // Slug
    {
      name: 'slug',
      title: 'Slug',
      description: 'Shopify Collection handle',
      type: 'slug'
    },
    // Description
    {
      name: 'descriptionHtml',
      title: 'HTML Description',
      type: 'text',
      rows: 5
    },
    // Image URL
    {
      name: 'imageUrl',
      title: 'Image URL',
      type: 'string'
    },
    // Rules
    {
      name: 'rules',
      title: 'Rules',
      type: 'array',
      description: 'Include Shopify products that satisfy these conditions',
      of: [
        {
          name: 'rule',
          title: 'Rule',
          type: 'collectionRule'
        }
      ]
    },
    // Disjunctive rules
    {
      name: 'disjunctive',
      title: 'Disjunctive rules?',
      description: 'Require any condition if true, otherwise require all conditions',
      type: 'boolean'
    },
    // Sort order
    {
      name: 'sortOrder',
      title: 'Sort order',
      type: 'string'
    }
  ]
}
