const TITLE = 'Home'

export default {
  name: 'home',
  title: TITLE,
  type: 'document',
  fields: [
    // Featured products
    {
      name: 'featuredProducts',
      title: 'Featured products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
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
          type: 'image',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        // media: icon,
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
}
