export default {
  name: 'shopifyProductVariant',
  title: 'Shopify',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true
  },
  fieldsets: [
    {
      name: 'options',
      title: 'Options',
      options: {
        columns: 3
      }
    },
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
    // Product status
    {
      fieldset: 'status',
      name: 'status',
      title: 'Product status',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['active', 'archived', 'draft']
      },
      validation: Rule => Rule.required()
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
    // SKU
    {
      name: 'sku',
      title: 'SKU',
      type: 'string'
    },
    // ID
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      description: 'Shopify Product Variant ID'
    },
    // GID
    {
      name: 'gid',
      title: 'GID',
      type: 'string',
      description: 'Shopify Product Variant GID'
    },
    // Product ID
    {
      name: 'productId',
      title: 'Product ID',
      type: 'number'
    },
    // Product GID
    {
      name: 'productGid',
      title: 'Product GID',
      type: 'string'
    },
    // Price
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    // Compare at price
    {
      name: 'compareAtPrice',
      title: 'Compare at price',
      type: 'number'
    },
    // Inventory
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'object',
      options: {
        columns: 3
      },
      fields: [
        // Quantity
        {
          name: 'quantity',
          title: 'Quantity',
          type: 'number'
        },
        // Management
        {
          name: 'management',
          title: 'Management',
          type: 'string'
        },
        // Policy
        {
          name: 'policy',
          title: 'Policy',
          type: 'string'
        }
      ]
    },
    // Option 1
    {
      fieldset: 'options',
      name: 'option1',
      title: 'Option 1',
      type: 'string'
    },
    // Option 2
    {
      fieldset: 'options',
      name: 'option2',
      title: 'Option 2',
      type: 'string'
    },
    // Option 3
    {
      fieldset: 'options',
      name: 'option3',
      title: 'Option 3',
      type: 'string'
    },
    // Preview Image URL
    {
      name: 'previewImageUrl',
      title: 'Preview Image URL',
      type: 'string',
      description: 'Image displayed in both cart and checkout'
    }
  ],
  readOnly: true
}
