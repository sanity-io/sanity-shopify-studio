import { hues } from '@sanity/color'
import { TagIcon } from '@sanity/icons'
import React from 'react'

export default {
  title: 'Product (inline)',
  name: 'blockInlineProduct',
  type: 'object',
  icon: TagIcon,
  fields: [
    // Product
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: Rule => Rule.required()
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
  ],
  preview: {
    select: {
      productTitle: 'product.store.title'
    },
    component(props) {
      // Selected object values are accessible via `props.value`
      return (
        <span style={{ color: hues.blue[500].hex }}>
          <TagIcon style={{ verticalAlign: 'text-bottom' }} />
          {props?.value?.productTitle || 'Select product'}
        </span>
      )
    }
  }
}
