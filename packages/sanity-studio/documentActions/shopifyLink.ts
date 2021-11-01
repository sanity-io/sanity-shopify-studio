/**
 * Custom document action
 *
 * Learn more: https://www.sanity.io/docs/document-actions
 */
import { EarthGlobeIcon } from '@sanity/icons'
import { productUrl, productVariantUrl } from '../utils/shopifyUrls'

type Props = {
  published: Record<string, any> // Sanity Document
  type: string
}

export default (props: Props) => {
  const { published, type } = props

  const isProductOrProductVariant = ['product', 'productVariant'].includes(type)

  // Return early if:
  // - Env var is not set
  // - No published document was found
  // - Document type is not a product or product variant
  // - Product has been deleted from Shopify
  if (
    !process.env.SANITY_STUDIO_SHOPIFY_STORE_ID ||
    !published ||
    !isProductOrProductVariant ||
    published?.store?.isDeleted
  ) {
    return null
  }

  let url
  if (type === 'product') {
    url = productUrl(published?.store?.id)
  }
  if (type === 'productVariant') {
    url = productVariantUrl(published?.store?.productId, published?.store?.id)
  }

  if (!url) {
    return null
  }

  return {
    label: 'Edit in Shopify',
    icon: EarthGlobeIcon,
    onHandle: () => {
      window.open(url)
    },
    shortcut: 'Ctrl+Alt+E'
  }
}
