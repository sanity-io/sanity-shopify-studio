import { TagIcon } from '@sanity/icons'
import pluralize from 'pluralize'
import React from 'react'
import ProductHidden from '../../components/ProductHidden'
import ProductPreview from '../../components/ProductPreview'
import { getPriceRange } from '../../utils/getPriceRange'

export default {
  // HACK: Required to hide 'create new' button in desk structure
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    // Product hidden status
    {
      name: 'hidden',
      type: 'string',
      inputComponent: ProductHidden,
      hidden: ({ parent }) => {
        const isActive = parent?.store?.status === 'active'
        const isEnabled = parent?.store?.isEnabled
        const isDeleted = parent?.store?.isDeleted

        return isActive && !isDeleted && isEnabled
      }
    },
    // Images
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    // Sections
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          name: 'section',
          title: 'Section',
          type: 'object',
          fields: [
            // Title
            {
              name: 'title',
              title: 'Title',
              type: 'string',
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
                  marks: { decorators: [] },
                  styles: [],
                  type: 'block'
                }
              ]
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
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
                title: 'Product',
                name: 'annotationShopify',
                type: 'annotationShopify'
              },
              // Shopify (margin)
              {
                title: 'Product',
                name: 'annotationShopifyMargin',
                type: 'annotationShopifyMargin'
              },
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
            decorators: [
              {
                title: 'Strong',
                value: 'strong'
              }
            ]
          },
          styles: [],
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
    // Shopify product
    {
      name: 'store',
      title: 'Shopify',
      type: 'shopifyProduct',
      description: 'Synced data from Shopify'
    }
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      isEnabled: 'store.isEnabled',
      optionCount: 'store.options.length',
      previewImageUrl: 'store.previewImageUrl',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'store.title',
      variantCount: 'store.variants.length'
    },
    prepare(selection) {
      const {
        isDeleted,
        isEnabled,
        optionCount,
        previewImageUrl,
        priceRange,
        status,
        title,
        variantCount
      } = selection

      let description = [
        pluralize('variant', variantCount, true),
        pluralize('option', optionCount, true)
      ]

      let subtitle = getPriceRange(priceRange)
      if (status !== 'active' || !isEnabled) {
        subtitle = '(Unavailable in Shopify)'
      }
      if (isDeleted) {
        subtitle = '(Deleted from Shopify)'
      }

      return {
        media: (
          <ProductPreview
            isActive={status === 'active'}
            isDeleted={isDeleted}
            isEnabled={isEnabled}
            url={previewImageUrl}
          />
        ),
        description: description.join(' / '),
        subtitle,
        title
      }
    }
  }
}
