import { TagIcon } from '@sanity/icons'
import React from 'react'
import { SHOPIFY_PRODUCT_DOCUMENT_TYPE } from '../../constants'

export default {
  title: 'Product',
  name: 'annotationShopify',
  type: 'object',
  blockEditor: {
    icon: () => <TagIcon />,
  },
  fields: [
    // Product
    {
      title: 'Shopify product',
      name: 'shopifyProduct',
      type: 'reference',
      to: [{ type: SHOPIFY_PRODUCT_DOCUMENT_TYPE }],
    },
    // Quantity
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(10),
    },
    // Action
    {
      name: 'action',
      title: 'Action',
      type: 'string',
      options: {
        list: [
          {
            title: 'Add to cart',
            value: 'addToCart',
          },
          {
            title: 'Buy now',
            value: 'buyNow',
          },
        ],
      },
      validation: Rule => Rule.required(),
    },
  ],
}
