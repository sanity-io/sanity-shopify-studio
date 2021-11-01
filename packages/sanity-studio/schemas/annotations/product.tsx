/**
 * Annotations are ways of marking up text in the block content editor.
 *
 * Read more: https://www.sanity.io/docs/customization#f924645007e1
 */
import { TagIcon } from '@sanity/icons'
import React from 'react'

export default {
  title: 'Product (inline link)',
  name: 'annotationProduct',
  type: 'object',
  blockEditor: {
    icon: () => <TagIcon />,
    render: ({ children }) => (
      <span>
        {children}
        <TagIcon style={{ marginLeft: '0.2em', verticalAlign: 'text-bottom' }} />
      </span>
    )
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
