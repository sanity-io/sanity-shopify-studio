import React from 'react'
import HotspotArray from 'sanity-plugin-hotspot-array'
import ProductTooltip from '../../components/hotspots/ProductTooltip'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'

export default {
  name: 'productHotspots',
  title: 'Hotspots',
  type: 'array',
  of: [
    {
      name: 'spot',
      type: 'object',
      fieldsets: [{ name: 'position', options: { columns: 2 } }],
      fields: [
        {
          name: 'productWithVariant',
          title: 'Product + Variant',
          type: 'productWithVariant'
        },
        {
          name: 'x',
          type: 'number',
          readOnly: true,
          fieldset: 'position',
          initialValue: 50,
          validation: Rule => Rule.required().min(0).max(100)
        },
        {
          name: 'y',
          type: 'number',
          readOnly: true,
          fieldset: 'position',
          initialValue: 50,
          validation: Rule => Rule.required().min(0).max(100)
        }
      ],
      preview: {
        select: {
          isDeleted: 'productWithVariant.product.store.isDeleted',
          previewImageUrl: 'productWithVariant.product.store.previewImageUrl',
          productTitle: 'productWithVariant.product.store.title',
          status: 'productWithVariant.product.store.status',
          variantPreviewImageUrl: 'productWithVariant.variant.store.previewImageUrl',
          x: 'x',
          y: 'y'
        },
        prepare(selection) {
          const { isDeleted, previewImageUrl, productTitle, status, variantPreviewImageUrl, x, y } =
            selection
          return {
            media: (
              <ShopifyDocumentStatus
                isActive={status === 'active'}
                isDeleted={isDeleted}
                type="product"
                url={variantPreviewImageUrl || previewImageUrl}
              />
            ),
            title: productTitle,
            subtitle: x && y ? `[${x}%, ${y}%]` : `No position set`
          }
        }
      }
    }
  ],
  inputComponent: HotspotArray,
  options: {
    hotspotImagePath: 'image',
    hotspotTooltip: ProductTooltip,
    imageHotspotPathRoot: 'parent'
  }
}
