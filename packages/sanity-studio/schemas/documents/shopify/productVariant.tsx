import { CopyIcon } from '@sanity/icons'
import React from 'react'
import ProductPreview from '../../../components/ProductPreview'
import { SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE } from '../../../constants'

export default {
  // HACK: Required to hide 'create new' button in desk structure
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
  title: 'Shopify product variant',
  type: 'document',
  icon: CopyIcon,
  fields: [
    // Shopify status
    {
      name: 'shopifyStatus',
      type: 'shopifyStatus'
    },
    // Shopify product variant sync
    {
      name: 'shopify',
      title: 'Shopify',
      description: 'Synced data from Shopify',
      type: 'shopifyProductVariantSync'
    }
  ],
  preview: {
    select: {
      isDeleted: 'shopify.isDeleted',
      isEnabled: 'shopify.isEnabled',
      previewImageUrl: 'shopify.previewImageUrl',
      sku: 'shopify.sku',
      status: 'shopify.status',
      title: 'shopify.title'
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
