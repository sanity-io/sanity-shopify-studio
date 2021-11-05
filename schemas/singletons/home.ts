import { HomeIcon } from '@sanity/icons'

const TITLE = 'Home'

export default {
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  fields: [
    // Intro
    {
      name: 'intro',
      title: 'Intro',
      type: 'body'
    },
    // Featured collections
    {
      name: 'featuredCollections',
      title: 'Featured collections',
      type: 'array',
      of: [
        {
          title: 'Collection',
          type: 'reference',
          to: [{ type: 'collection' }]
        }
      ],
      validation: Rule => Rule.max(2).unique()
    },
    // Gallery
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image'
        }
      ]
    },
    // Featured products
    {
      name: 'featuredProducts',
      title: 'Featured products',
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
      type: 'seo.singleton'
    }
  ],
  preview: {
    prepare() {
      return {
        // media: icon,
        subtitle: 'Index',
        title: TITLE
      }
    }
  }
}
