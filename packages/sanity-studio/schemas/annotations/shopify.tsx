import { TagIcon } from '@sanity/icons'
import React from 'react'

export default {
  title: 'Product',
  name: 'annotationShopify',
  type: 'object',
  blockEditor: {
    icon: () => <TagIcon />
  },
  fields: [
    // Product
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }]
    },
    // Quantity
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(10)
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
            value: 'addToCart'
          },
          {
            title: 'Buy now',
            value: 'buyNow'
          }
        ]
      },
      validation: Rule => Rule.required()
    }
  ]
}
