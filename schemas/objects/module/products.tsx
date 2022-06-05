import { TagIcon } from '@sanity/icons'
import pluralize from 'pluralize'

export default {
  name: 'module.products',
  title: 'Products',
  type: 'object',
  icon: TagIcon,
  fields: [
    // Modules (products)
    {
      name: 'modules',
      title: 'Products',
      type: 'array',
      of: [{ type: 'module.product' }],
      validation: Rule => Rule.required().max(2)
    },
    // Layout
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'card',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          {
            title: 'Cards (large)',
            value: 'card'
          },
          {
            title: 'Pills (small)',
            value: 'pill'
          }
        ]
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      productCount: 'modules.length'
    },
    prepare(selection) {
      const { productCount } = selection
      return {
        subtitle: 'Products',
        title: productCount ? pluralize('product', productCount, true) : 'No products'
      }
    }
  }
}
