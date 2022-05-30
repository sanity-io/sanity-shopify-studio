import { ImageIcon } from '@sanity/icons'

export default {
  name: 'hero.collection',
  title: 'Collection hero',
  type: 'object',
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3
    },
    // Description
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    // Module
    {
      name: 'module',
      title: 'Module',
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
          name: 'imageWithOptions',
          title: 'Image',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: {
              fileName: 'image.asset.originalFilename',
              image: 'image'
            },
            prepare(selection) {
              const { fileName, image } = selection
              return {
                media: image,
                title: fileName
              }
            }
          }
        }
      ]
    }
  ]
}
