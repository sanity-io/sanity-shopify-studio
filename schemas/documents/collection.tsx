import { PackageIcon } from '@sanity/icons'
import pluralize from 'pluralize'
import React from 'react'
import CollectionHiddenInput from '../../components/inputs/CollectionHidden'
import CollectionMedia from '../../components/media/Collection'

const GROUPS = [
  {
    default: true,
    name: 'editorial',
    title: 'Editorial'
  },
  {
    name: 'shopifySync',
    title: 'Shopify sync'
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
    // Description
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'editorial'
    },
    // Image
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
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
    },
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
        media: <CollectionMedia isDeleted={isDeleted} url={imageUrl} />,
        subtitle: ruleCount > 0 ? `Automated (${pluralize('rule', ruleCount, true)})` : 'Manual',
        title
      }
    }
  }
}
