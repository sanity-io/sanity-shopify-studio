import { PackageIcon } from '@sanity/icons'
import React from 'react'
import CollectionMedia from '../../../components/media/Collection'

export default {
  name: 'module.collection',
  title: 'Collection',
  type: 'object',
  icon: PackageIcon,
  fields: [
    {
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      weak: true,
      to: [{ type: 'collection' }],
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      collectionTitle: 'collection.store.title',
      imageUrl: 'collection.store.imageUrl',
      isDeleted: 'collection.store.isDeleted'
    },
    prepare(selection) {
      const { collectionTitle, imageUrl, isDeleted } = selection
      return {
        media: <CollectionMedia isDeleted={isDeleted} url={imageUrl} />,
        subtitle: 'Collection',
        title: collectionTitle
      }
    }
  }
}
