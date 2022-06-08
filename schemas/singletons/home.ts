import { HomeIcon } from '@sanity/icons'

const TITLE = 'Home'

export default {
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial'
    },
    {
      name: 'seo',
      title: 'SEO'
    }
  ],
  fields: [
    // Hero
    {
      name: 'hero',
      title: 'Hero',
      type: 'hero.home',
      group: 'editorial'
    },
    // Modules
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        { type: 'module.callout' },
        { type: 'module.callToAction' },
        { type: 'module.collection' },
        { type: 'module.image' },
        { type: 'module.instagram' },
        { type: 'module.product' }
      ],
      group: 'editorial'
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.singleton',
      group: 'seo'
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
