import { CogIcon, PackageIcon } from '@sanity/icons'

const TITLE = 'Settings'

export default {
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  fields: [
    // Menu
    {
      name: 'menu',
      title: 'Menu',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        // Links
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              name: 'collectionGroup',
              title: 'Collection group',
              type: 'object',
              icon: PackageIcon,
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'collectionLinks',
                  title: 'Collection links',
                  type: 'array',
                  validation: Rule => Rule.unique().max(4),
                  of: [
                    {
                      name: 'collection',
                      type: 'reference',
                      weak: true,
                      to: [{ type: 'collection' }]
                    }
                  ]
                },
                {
                  name: 'collectionProducts',
                  title: 'Collection products',
                  type: 'reference',
                  description: 'Products from this collection will be listed',
                  weak: true,
                  to: [{ type: 'collection' }]
                }
              ]
            },
            { type: 'linkInternal' },
            { type: 'linkExternal' }
          ]
        }
      ]
    },
    // Footer
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        // Links
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [{ type: 'linkInternal' }, { type: 'linkExternal' }]
        },
        // Text
        {
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [
            {
              lists: [],
              marks: {
                annotations: [
                  // Email
                  {
                    title: 'Email',
                    name: 'annotationLinkEmail',
                    type: 'annotationLinkEmail'
                  },
                  // Internal link
                  {
                    title: 'Internal page',
                    name: 'annotationLinkInternal',
                    type: 'annotationLinkInternal'
                  },
                  // URL
                  {
                    title: 'URL',
                    name: 'annotationLinkExternal',
                    type: 'annotationLinkExternal'
                  }
                ],
                decorators: []
              },
              // Block styles
              styles: [{ title: 'Normal', value: 'normal' }],
              type: 'block'
            }
          ]
        }
      ]
    },
    // Custom product options
    {
      name: 'customProductOptions',
      title: 'Custom product options',
      type: 'array',
      of: [
        {
          name: 'customProductOption.color',
          type: 'customProductOption.color'
        },
        {
          name: 'customProductOption.size',
          type: 'customProductOption.size'
        }
      ],
      validation: Rule =>
        Rule.custom(options => {
          // Each product option type must have a unique title
          const uniqueTitles = new Set(options.map(option => option.title))
          if (options.length > uniqueTitles.size) {
            return 'Each product option type must have a unique title'
          }
          return true
        })
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        {
          name: 'title',
          title: 'Site title',
          type: 'string',
          description: 'Displayed on all pages',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Fallback displayed on pages with no SEO image defined'
        }
      ],
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    prepare() {
      return {
        title: TITLE
      }
    }
  }
}
