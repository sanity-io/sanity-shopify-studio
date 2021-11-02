import { hues } from '@sanity/color'
import { LinkIcon, TagIcon } from '@sanity/icons'
import React from 'react'

export default {
  title: 'Inline Product link',
  name: 'blockInlineLinkProduct',
  type: 'object',
  icon: LinkIcon,
  fields: [
    // Product
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
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
