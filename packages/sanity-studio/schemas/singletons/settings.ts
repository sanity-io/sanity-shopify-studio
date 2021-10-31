import { CogIcon } from '@sanity/icons'

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
          of: [{ type: 'linkInternal' }, { type: 'linkExternal' }]
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
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description:
        'Home page metadata. Also used as a fallback for other documents with undefined SEO values.',
      options: {
        collapsed: true,
        collapsible: true
      }
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
