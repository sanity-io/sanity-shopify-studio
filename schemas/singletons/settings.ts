import {CogIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

const TITLE = 'Settings'
interface ProductOptions {
  title: string
}

export default defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
    },
    {
      name: 'productOptions',
      title: 'Product options',
    },
    {
      name: 'notFoundPage',
      title: '404 page',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Menu
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'menuSettings',
    }),
    // Footer
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footerSettings',
    }),
    // Custom product options
    defineField({
      name: 'customProductOptions',
      title: 'Custom product options',
      type: 'array',
      group: 'productOptions',
      of: [
        {
          name: 'customProductOption.color',
          type: 'customProductOption.color',
        },
        {
          name: 'customProductOption.size',
          type: 'customProductOption.size',
        },
      ],
      validation: (Rule) =>
        Rule.custom((options: ProductOptions[] | undefined) => {
          // Each product option type must have a unique title
          if (options) {
            const uniqueTitles = new Set(options.map((option) => option.title))
            if (options.length > uniqueTitles.size) {
              return 'Each product option type must have a unique title'
            }
          }
          return true
        }),
    }),
    // Not found page
    defineField({
      name: 'notFoundPage',
      title: '404 page',
      type: 'notFoundPage',
      group: 'notFoundPage',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      description: 'Defaults for every page',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Site title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          validation: (Rule) =>
            Rule.max(150).warning('Longer descriptions may be truncated by search engines'),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
