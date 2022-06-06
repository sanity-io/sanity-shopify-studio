import { StackCompactIcon } from '@sanity/icons'
import pluralize from 'pluralize'
import blocksToText from '../../../utils/blocksToText'

export default {
  name: 'module.accordion',
  title: 'Accordion',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    // Groups
    {
      name: 'groups',
      title: 'Groups',
      type: 'array',
      of: [
        {
          name: 'group',
          title: 'Group',
          type: 'object',
          icon: false,
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [
                {
                  lists: [],
                  marks: {
                    annotations: [
                      // Email
                      {
                        name: 'annotationLinkEmail',
                        type: 'annotationLinkEmail'
                      },
                      // Internal link
                      {
                        name: 'annotationLinkInternal',
                        type: 'annotationLinkInternal'
                      },
                      // URL
                      {
                        name: 'annotationLinkExternal',
                        type: 'annotationLinkExternal'
                      }
                    ],
                    decorators: [
                      {
                        title: 'Italic',
                        value: 'em'
                      },
                      {
                        title: 'Strong',
                        value: 'strong'
                      }
                    ]
                  },
                  // Regular styles
                  styles: [],
                  // Paragraphs
                  type: 'block'
                }
              ],
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              body: 'body',
              title: 'title'
            },
            prepare(selection) {
              const { body, title } = selection
              return {
                subtitle: body && blocksToText(body),
                title
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      groupCount: 'groups.length',
      url: 'url'
    },
    prepare(selection) {
      const { groupCount } = selection
      return {
        subtitle: 'Accordion',
        title: groupCount ? pluralize('group', groupCount, true) : 'No groups'
      }
    }
  }
}
