import { DEFAULT_CURRENCY_CODE } from '../../constants'
import { SHOPIFY_PRODUCT_DOCUMENT_TYPE } from '../../constants'
import { validateSlug } from '../../utils/validateSlug'
/*
import { image } from '../fields/image'
import { pageShared } from '../fields/pageShared'
import { portableText } from '../fields/portableText'
import { references } from '../fields/references'
import { slug } from '../fields/slug'
*/

export default {
  // HACK: Required to hide 'create new' button in desk structure
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    // Slug
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: validateSlug,
    },
    // Shopify Product
    {
      name: 'shopify',
      title: 'Shopify product',
      type: 'reference',
      weak: true,
      to: [{ type: SHOPIFY_PRODUCT_DOCUMENT_TYPE }],
    },
    // Product option galery
    {
      name: 'productOptionGallery',
      title: 'Product option gallery',
      description: 'TODO: map product options to image galleries',
      type: 'string',
    },
    // Variant image
    {
      name: 'variantImages',
      title: 'Variant images',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        {
          name: 'fallbackImage',
          title: 'Fallback image',
          description:
            'Image to display if selected variant has no image mapped',
          type: 'image',
        },
        // TODO: custom component
        {
          name: 'images',
          title: 'Mapped images',
          description: 'TODO: map product variants to images',
          type: 'string',
        },
      ],
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
          options: { hotspot: true },
        },
      ],
      validation: Rule => Rule.required(),
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
              validation: Rule => Rule.required(),
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
                  type: 'block',
                },
              ],
            },
          ],
        },
      ],
      validation: Rule => Rule.max(3),
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
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            annotations: [
              // Shopify
              {
                title: 'Product',
                name: 'annotationShopify',
                type: 'annotationShopify',
              },
              // Shopify (margin)
              {
                title: 'Product',
                name: 'annotationShopifyMargin',
                type: 'annotationShopifyMargin',
              },
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
            decorators: [
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        },
        // Custom blocks
        {
          name: 'blockImage',
          title: 'Image',
          type: 'blockImage',
        },
        {
          name: 'blockProduct',
          title: 'Product',
          type: 'blockProduct',
        },
      ],
    },
  ],
  preview: {
    select: {
      image: 'image',
      shopifyPriceRange: 'shopify.priceRange',
      shopifyTitle: 'shopify.title',
      title: 'title',
    },
    prepare(selection) {
      const { image, title, shopifyPriceRange, shopifyTitle } = selection

      let subtitle = []
      if (shopifyTitle) {
        subtitle.push(`→ ${shopifyTitle}`)
      }
      if (shopifyPriceRange) {
        const hasPriceRange =
          shopifyPriceRange?.minVariantPrice?.amount !==
          shopifyPriceRange?.maxVariantPrice?.amount

        subtitle.push(
          `(${hasPriceRange ? 'From ' : ''}${new Intl.NumberFormat('en', {
            currency: DEFAULT_CURRENCY_CODE,
            style: 'currency',
          }).format(shopifyPriceRange?.minVariantPrice)})`
        )
      }

      return {
        media: image,
        subtitle: subtitle.join(' '),
        title,
      }
    },
  },
}
