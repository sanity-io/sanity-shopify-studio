import { PackageIcon } from '@sanity/icons'
import pluralize from 'pluralize'
import React from 'react'
import ShopifyIcon from '../../components/icons/Shopify'
import CollectionHiddenInput from '../../components/inputs/CollectionHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'

const GROUPS = [
  {
    name: 'theme',
    title: 'Theme'
  },
  {
    default: true,
    name: 'editorial',
    title: 'Editorial'
  },
  {
    name: 'shopifySync',
    title: 'Shopify sync',
    icon: ShopifyIcon
  },
  {
    name: 'seo',
    title: 'SEO'
  }
]

export default {
  // Required to hide 'create new' button in desk structure
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    // Product hidden status
    {
      name: 'hidden',
      type: 'string',
      inputComponent: CollectionHiddenInput,
      group: GROUPS.map(group => group.name),
      hidden: ({ parent }) => {
        const isDeleted = parent?.store?.isDeleted
        return !isDeleted
      }
    },
    // Title (proxy)
    {
      name: 'titleProxy',
      title: 'Title',
      type: 'proxyString',
      options: { field: 'store.title' }
    },
    // Slug (proxy)
    {
      name: 'slugProxy',
      title: 'Slug',
      type: 'proxyString',
      options: { field: 'store.slug.current' }
    },
    // Color theme
    {
      name: 'colorTheme',
      title: 'Color theme',
      type: 'reference',
      to: [{ type: 'colorTheme' }],
      group: 'theme',
      validation: Rule => Rule.required()
    },
    // Vector
    {
      name: 'vector',
      title: 'Vector artwork',
      type: 'image',
      description: 'Displayed in collection links using color theme',
      options: {
        accept: 'image/svg+xml'
      },
      group: 'theme',
      validation: Rule =>
        Rule.custom(image => {
          if (!image) {
            return true
          }
          const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/
          const format = image.asset._ref.match(pattern)[3]
          if (format !== 'svg') {
            return 'Image must be an SVG'
          }
          return true
        })
    },
    // Show hero
    {
      name: 'showHero',
      title: 'Show hero',
      type: 'boolean',
      description: 'If disabled, page title will be displayed instead',
      group: 'editorial'
    },
    // Hero
    {
      name: 'hero',
      title: 'Hero',
      type: 'hero.collection',
      hidden: ({ document }) => !document?.showHero,
      group: 'editorial'
    },
    // Modules
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      description: 'Editorial modules to associate with this collection',
      of: [
        { type: 'module.callout' },
        { type: 'module.callToAction' },
        { type: 'module.image' },
        { type: 'module.instagram' }
      ],
      group: 'editorial'
    },
    // Shopify collection
    {
      name: 'store',
      title: 'Shopify',
      type: 'shopifyCollection',
      description: 'Collection data from Shopify (read-only)',
      group: 'shopifySync'
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.standard',
      group: 'seo'
    }
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title (A-Z)',
      by: [{ field: 'store.title', direction: 'asc' }]
    },
    {
      name: 'titleAsc',
      title: 'Title (Z-A)',
      by: [{ field: 'store.title', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      imageUrl: 'store.imageUrl',
      isDeleted: 'store.isDeleted',
      ruleCount: 'store.rules.length',
      title: 'store.title'
    },
    prepare(selection) {
      const { imageUrl, isDeleted, ruleCount, title } = selection
      return {
        media: <ShopifyDocumentStatus isDeleted={isDeleted} type="collection" url={imageUrl} />,
        subtitle: ruleCount > 0 ? `Automated (${pluralize('rule', ruleCount, true)})` : 'Manual',
        title
      }
    }
  }
}
