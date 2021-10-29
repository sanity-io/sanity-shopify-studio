import { DocumentIcon } from '@sanity/icons'
import { validateSlug } from '../../../utils/validateSlug'

export default {
  icon: DocumentIcon,
  name: 'article.editorial',
  title: 'Article (editorial)',
  type: 'document',
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title displayed in browser tab / search engine results',
      validation: Rule => Rule.required()
    },
    // Slug
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: validateSlug
    },
    // Body
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            annotations: [
              // Shopify
              {
                name: 'annotationShopify',
                type: 'annotationShopify'
              },
              // Shopify (margin)
              {
                name: 'annotationShopifyMargin',
                type: 'annotationShopifyMargin'
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
          styles: [{ title: 'Quote', value: 'blockquote' }],
          type: 'block'
        },
        // Custom blocks
        {
          name: 'blockImage',
          title: 'Image',
          type: 'blockImage'
        },
        {
          name: 'blockProduct',
          title: 'Product',
          type: 'blockProduct'
        }
      ]
    }
  ],
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
