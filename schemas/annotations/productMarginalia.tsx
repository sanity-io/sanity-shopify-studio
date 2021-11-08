/**
 * Annotations are ways of marking up text in the block content editor.
 *
 * Read more: https://www.sanity.io/docs/customization#f924645007e1
 */
import { hues } from '@sanity/color'
import { MasterDetailIcon } from '@sanity/icons'
import React from 'react'

export default {
  title: 'Product (marginalia)',
  name: 'annotationProductMarginalia',
  type: 'object',
  blockEditor: {
    icon: () => <MasterDetailIcon />,
    render: ({ children }) => (
      <span style={{ color: hues.blue[500].hex }}>
        <MasterDetailIcon style={{ marginRight: '0.2em', verticalAlign: 'text-bottom' }} />
        {children}
      </span>
    )
  },
  initialValue: {
    action: 'addToCart',
    quantity: 1
  },
  fieldsets: [
    {
      name: 'callToAction',
      title: 'Call to action',
      options: {
        columns: 2
      }
    }
  ],
  fields: [
    // Product
    {
      name: 'productWithVariant',
      title: 'Product + Variant',
      type: 'productWithVariant',
      validation: Rule => Rule.required()
    },
    // Quantity
    {
      fieldset: 'callToAction',
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(10)
    },
    // Action
    {
      fieldset: 'callToAction',
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
