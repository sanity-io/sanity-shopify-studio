import { JoystickIcon } from '@sanity/icons'

const TITLE = 'Navigation'

export default {
  name: 'navigation',
  title: TITLE,
  type: 'document',
  icon: JoystickIcon,
  fields: [
    // Header
    {
      name: 'header',
      title: 'Header',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Announcements
        {
          name: 'announcements',
          title: 'Announcements',
          type: 'array',
          description: 'Maximum of 3 items',
          of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
          validation: Rule => Rule.max(3),
        },
      ],
    },
    // Menu
    {
      name: 'menu',
      title: 'Menu',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Links
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
        },
      ],
    },
    // Footer
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Links
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
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
                    type: 'annotationLinkEmail',
                  },
                  // Internal link
                  {
                    title: 'Internal page',
                    name: 'annotationLinkInternal',
                    type: 'annotationLinkInternal',
                  },
                  // URL
                  {
                    title: 'URL',
                    name: 'annotationLinkExternal',
                    type: 'annotationLinkExternal',
                  },
                ],
                decorators: [],
              },
              // Block styles
              styles: [{ title: 'Normal', value: 'normal' }],
              type: 'block',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
}
