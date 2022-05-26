import { DocumentIcon } from '@sanity/icons'
import { validateSlug } from '../../utils/validateSlug'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
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
      type: 'slug',
      options: { source: 'title' },
      validation: validateSlug
    },
    // Color theme
    {
      name: 'colorTheme',
      title: 'Color theme',
      type: 'reference',
      to: [{ type: 'colorTheme' }],
      group: 'editorial'
    },
    // Show hero
    {
      name: 'showHero',
      title: 'Show hero',
      type: 'boolean',
      description: 'If disabled, page title will be displayed instead',
      group: 'editorial'
    },
    // Hero
    {
      name: 'hero',
      title: 'Hero',
      type: 'pageHero',
      hidden: ({ document }) => !document?.showHero,
      group: 'editorial'
    },
    // Body
    {
      name: 'body',
      title: 'Body',
      type: 'body',
      group: 'editorial'
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.standard',
      group: 'seo'
    }
  ],
  initialValue: {
    showHero: false
  },
  preview: {
    select: {
      active: 'active',
      thumbnail: 'thumbnail',
      title: 'title'
    },
    prepare(selection) {
      const { thumbnail, title } = selection

      return {
        media: thumbnail,
        title
      }
    }
  }
}
