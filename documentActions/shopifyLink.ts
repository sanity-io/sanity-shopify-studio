/**
 * Custom document action
 *
 * Learn more: https://www.sanity.io/docs/document-actions
 */
import { EarthGlobeIcon } from '@sanity/icons'
import { collectionUrl, productUrl, productVariantUrl } from '../utils/shopifyUrls'

type Props = {
  published: Record<string, any> // Sanity Document
  type: string
}

export default (props: Props) => {
  const { published, type } = props

  const isShopifyDocument = ['collection', 'product', 'productVariant'].includes(type)

  // Hide action if:
  // - No published document was found
  // - Document type is not a Shopify document (collection, product or product variant)
  // - Document has been deleted from Shopify
  if (!published || !isShopifyDocument || published?.store?.isDeleted) {
    return null
  }

  let url
  if (type === 'collection') {
    url = collectionUrl(published?.store?.id)
  }
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
