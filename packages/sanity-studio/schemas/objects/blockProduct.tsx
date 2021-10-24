import React from 'react'
import { TagIcon } from '@sanity/icons'
import { SHOPIFY_PRODUCT_DOCUMENT_TYPE } from '../../constants'

const ImagePreview = (props: { url: string }) => {
  const { url } = props
  if (!url) {
    return null
  }

  return <img src={`${url}&width=400`} />
}

export default {
  name: 'blockProduct',
  title: 'Image',
  type: 'object',
  icon: TagIcon,
  fields: [
    {
      name: 'shopifyProduct',
      title: 'Shopify product',
      type: 'reference',
      weak: true,
      to: [{ type: SHOPIFY_PRODUCT_DOCUMENT_TYPE }],
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
  ],
  preview: {
    select: {
      productImageUrl: 'shopifyProduct.previewImageUrl',
      productTitle: 'shopifyProduct.title',
    },
    prepare(selection) {
      const { productImageUrl, productTitle } = selection

      return {
        media: <ImagePreview url={productImageUrl} />,
        title: productTitle,
      }
    },
  },
}
