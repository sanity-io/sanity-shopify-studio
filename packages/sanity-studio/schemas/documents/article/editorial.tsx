import { BookIcon } from '@sanity/icons'
import React from 'react'
import { validateSlug } from '../../../utils/validateSlug'

export default {
  name: 'article.editorial',
  title: 'Article (editorial)',
  type: 'document',
  icon: BookIcon,
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
              // Product
              {
                name: 'annotationProduct',
                type: 'annotationProduct'
              },
              // Product (marginalia)
              {
                name: 'annotationProductMarginalia',
                type: 'annotationProductMarginalia'
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
          // Inline blocks
          of: [{ type: 'blockInlineLinkProduct' }],
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
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.standard'
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
