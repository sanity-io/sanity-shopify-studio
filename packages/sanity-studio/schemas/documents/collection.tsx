import { PackageIcon } from '@sanity/icons'
import pluralize from 'pluralize'

export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: PackageIcon,
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    // Slug
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    // Image
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.required()
    },
    // Products
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Product',
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ],
      validation: Rule => Rule.unique()
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      image: 'image',
      productCount: 'products.length',
      title: 'title'
    },
    prepare(selection) {
      const { image, productCount, title } = selection
      return {
        media: image,
        subtitle: pluralize('product', productCount, true),
        title
      }
    }
  }
}
