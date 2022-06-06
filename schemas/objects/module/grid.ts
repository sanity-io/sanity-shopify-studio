import { ThLargeIcon } from '@sanity/icons'
import pluralize from 'pluralize'
import blocksToText from '../../../utils/blocksToText'

export default {
  name: 'module.grid',
  title: 'Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    // Items
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            // Title
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            // Image
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required()
            },
            // Body
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [
                {
                  lists: [],
                  marks: {
                    annotations: [
                      // Product
                      {
                        name: 'annotationProduct',
                        type: 'annotationProduct'
                      },
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
              image: 'image',
              title: 'title'
            },
            prepare(selection) {
              const { body, image, title } = selection
              return {
                media: image,
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
      itemCount: 'items.length',
      url: 'url'
    },
    prepare(selection) {
      const { itemCount } = selection
      return {
        subtitle: 'Grid',
        title: itemCount ? pluralize('item', itemCount, true) : 'No items'
      }
    }
  }
}
