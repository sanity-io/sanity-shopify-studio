import { SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE } from '../../constants'

export default {
  name: 'shopifyProductSync',
  title: 'Shopify',
  description: 'Synced data from Shopify',
  type: 'object',
  options: {
    collapsed: true,
    collapsible: true
  },
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
    }
  ],
  fields: [
    // Enabled (on sales channel)
    {
      fieldset: 'status',
      name: 'isEnabled',
      title: 'Enabled on sales channel?',
      type: 'boolean',
      readOnly: true
    },
    // Deleted
    {
      fieldset: 'status',
      name: 'isDeleted',
      title: 'Deleted from Shopify?',
      type: 'boolean',
      readOnly: true
    },
    // Created at
    {
      fieldset: 'status',
      name: 'createdAt',
      readOnly: true,
      title: 'Created at',
      type: 'string'
    },
    // Updated at
    {
      fieldset: 'status',
      name: 'updatedAt',
      readOnly: true,
      title: 'Last updated at',
      type: 'string'
    },
    // Product status
    {
      fieldset: 'status',
      name: 'status',
      readOnly: true,
      title: 'Product status',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['active', 'archived', 'draft']
      },
      validation: Rule => Rule.required()
    },
    // Title
    {
      name: 'title',
      readOnly: true,
      title: 'Title',
      type: 'string',
      description: 'Title displayed in both cart and checkout',
      validation: Rule => Rule.required()
    },
    // Product ID
    {
      name: 'id',
      readOnly: true,
      title: 'ID',
      type: 'number',
      description: 'Shopify Product ID',
      validation: Rule => Rule.required()
    },
    // Slug
    {
      title: 'Slug',
      description: 'Shopify Product handle',
      name: 'slug',
      type: 'slug',
      readOnly: true
    },
    // Product Type
    {
      fieldset: 'organization',
      name: 'productType',
      readOnly: true,
      title: 'Product type',
      type: 'string'
    },
    // Tags
    {
      fieldset: 'organization',
      name: 'tags',
      readOnly: true,
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
          type: 'number',
          readOnly: true,
          validation: Rule => Rule.required()
        },
        {
          name: 'maxVariantPrice',
          title: 'Max variant price',
          type: 'number',
          readOnly: true,
          validation: Rule => Rule.required()
        }
      ]
    },
    // Compare at price range
    {
      name: 'compareAtPriceRange',
      title: 'Compare at price range',
      type: 'object',
      options: {
        columns: 2
      },
      fields: [
        {
          name: 'minVariantPrice',
          title: 'Min variant price',
          type: 'number',
          readOnly: true,
          validation: Rule => Rule.required()
        },
        {
          name: 'maxVariantPrice',
          title: 'Max variant price',
          type: 'number',
          readOnly: true,
          validation: Rule => Rule.required()
        }
      ]
    },
    // Preview Image URL
    {
      name: 'previewImageUrl',
      readOnly: true,
      title: 'Preview Image URL',
      type: 'string',
      description: 'Image displayed in both cart and checkout'
    },
    // Provider
    {
      name: 'provider',
      title: 'Provider value (TEMPORARY)',
      description: 'Serialized string of Product GraphQL response',
      type: 'string',
      readOnly: true
    },
    // Variants
    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          title: 'Variant',
          type: 'reference',
          weak: true,
          to: [{ type: SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE }]
        }
      ],
      hidden: true,
      readOnly: true
    }
  ]
}
