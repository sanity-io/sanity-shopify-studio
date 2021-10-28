import { EarthGlobeIcon } from '@sanity/icons'
import { getShopifyProductUrl } from '../utils/getShopifyProductUrl'
import { getShopifyProductVariantUrl } from '../utils/getShopifyProductVariantUrl'

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

  let label
  let url
  if (type === 'product') {
    label = 'Edit product in Shopify'
    url = getShopifyProductUrl(published?.store?.id)
  }
  if (type === 'productVariant') {
    label = 'Edit variant in Shopify'
    url = getShopifyProductVariantUrl(published?.store?.productId, published?.store?.id)
  }

  if (!label && !url) {
    return null
  }

  return {
    label,
    icon: EarthGlobeIcon,
    onHandle: () => {
      window.open(url)
    },
    shortcut: 'Ctrl+Alt+E'
  }
}
