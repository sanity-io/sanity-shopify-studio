import { CopyIcon } from '@sanity/icons'
import React from 'react'
import ProductPreview from '../../components/ProductPreview'

export default {
  // HACK: Required to hide 'create new' button in desk structure
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: 'productVariant',
  title: 'Product variant',
  type: 'document',
  icon: CopyIcon,
  fields: [
    // Shopify status
    {
      name: 'shopifyStatus',
      type: 'shopifyStatus'
    },
    // Product variant sync
    {
      name: 'store',
      title: 'Shopify',
      description: 'Synced data from Shopify',
      type: 'shopifyProductVariant'
    }
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      isEnabled: 'store.isEnabled',
      previewImageUrl: 'store.previewImageUrl',
      sku: 'store.sku',
      status: 'store.status',
      title: 'store.title'
    },
    prepare(selection) {
      const { isDeleted, isEnabled, previewImageUrl, sku, status, title } = selection

      return {
        media: (
          <ProductPreview
            isActive={status === 'active'}
            isDeleted={isDeleted}
            isEnabled={isEnabled}
            url={previewImageUrl}
          />
        ),
        subtitle: sku,
        title
      }
    }
  }
}
