/**
 * Custom document action
 *
 * Learn more: https://www.sanity.io/docs/document-actions
 */
import { EarthGlobeIcon } from '@sanity/icons'
import { collectionUrl, productUrl, productVariantUrl } from '../utils/shopifyUrls'
import { getShopifyStoreId } from '../utils/getShopifyStoreId'
import { useEffect, useState } from 'react'

type Props = {
  published: Record<string, any> // Sanity Document
  type: string
}

export default (props: Props) => {
  const { published, type } = props

  const [storeId, setStoreId] = useState()

  const isShopifyDocument = ['collection', 'product', 'productVariant'].includes(type)

  useEffect(() => {
    getShopifyStoreId().then(id => {
      setStoreId(id)
    })
  }, [])

  // Hide action if:
  // - Shopify store ID is not set
  // - No published document was found
  // - Document type is not a Shopify document (collection, product or product variant)
  // - Document has been deleted from Shopify
  if (!storeId || !published || !isShopifyDocument || published?.store?.isDeleted) {
    return null
  }

  let url
  if (type === 'collection') {
    url = collectionUrl(storeId, published?.store?.id)
  }
  if (type === 'product') {
    url = productUrl(storeId, published?.store?.id)
  }
  if (type === 'productVariant') {
    url = productVariantUrl(storeId, published?.store?.productId, published?.store?.id)
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
