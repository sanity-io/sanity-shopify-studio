import { ImageIcon } from '@sanity/icons'

export default {
  name: 'hero.home',
  title: 'Home hero',
  type: 'object',
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3
    },
    // Link
    {
      name: 'links',
      title: 'Link',
      type: 'array',
      of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
      validation: Rule => Rule.max(1)
    },
    // Content
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      validation: Rule => Rule.max(1),
      of: [
        {
          name: 'productWithVariant',
          title: 'Product with variant',
          type: 'productWithVariant'
        },
        {
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }
  ]
}
