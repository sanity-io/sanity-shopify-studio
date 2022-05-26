export default {
  name: 'shopifyProduct',
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
    },
    {
      name: 'organization',
      title: 'Organization',
      options: {
        columns: 2
      }
    },
    {
      name: 'variants',
      title: 'Variants',
      options: {
        collapsed: true,
        collapsible: true
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
      }
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
      type: 'string',
      description: 'Title displayed in both cart and checkout'
    },
    // Product ID
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      description: 'Shopify Product ID'
    },
    // Product ID
    {
      name: 'gid',
      title: 'GID',
      type: 'string',
      description: 'Shopify Product GID'
    },
    // Slug
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Shopify Product handle'
    },
    // Description
    {
      name: 'descriptionHtml',
      title: 'HTML Description',
      type: 'text',
      rows: 5
    },
    // Product Type
    {
      fieldset: 'organization',
      name: 'productType',
      title: 'Product type',
      type: 'string'
    },
    // Vendor
    {
      fieldset: 'organization',
      name: 'vendor',
      title: 'Vendor',
      type: 'string'
    },
    // Tags
    {
      fieldset: 'organization',
      name: 'tags',
      title: 'Tags',
      type: 'string'
    },
    // Price range
    {
      name: 'priceRange',
      title: 'Price range',
      type: 'object',
      options: {
        columns: 2
      },
      fields: [
        {
          name: 'minVariantPrice',
          title: 'Min variant price',
          type: 'number'
        },
        {
          name: 'maxVariantPrice',
          title: 'Max variant price',
          type: 'number'
        }
      ]
    },
    // Preview Image URL
    {
      name: 'previewImageUrl',
      title: 'Preview Image URL',
      type: 'string',
      description: 'Image displayed in both cart and checkout'
    },
    // Options
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [
        {
          name: 'option',
          title: 'Option',
          type: 'productOption'
        }
      ]
    },
    // Variants
    {
      fieldset: 'variants',
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          title: 'Variant',
          type: 'reference',
          weak: true,
          to: [{ type: 'productVariant' }]
        }
      ]
    }
  ]
}
