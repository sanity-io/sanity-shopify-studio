import { EarthGlobeIcon } from '@sanity/icons'
import { SHOPIFY_PRODUCT_DOCUMENT_TYPE, SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE } from '../constants'
import { getShopifyProductUrl } from '../utils/getShopifyProductUrl'
import { getShopifyProductVariantUrl } from '../utils/getShopifyProductVariantUrl'

type Props = {
  published: Record<string, any> // Sanity Document
  type: string
}

export default (props: Props) => {
  const { published, type } = props

  const isProductOrProductVariant = [
    SHOPIFY_PRODUCT_DOCUMENT_TYPE,
    SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE
  ].includes(type)

  // Return early if:
  // - Env var is not set
  // - No published document was found
  // - Document type is not a product or product variant
  // - Product has been deleted from Shopify
  if (
    !process.env.SANITY_STUDIO_SHOPIFY_STORE_ID ||
    !published ||
    !isProductOrProductVariant ||
    published?.shopify?.isDeleted
  ) {
    return null
  }

  let label
  let url
  if (type === SHOPIFY_PRODUCT_DOCUMENT_TYPE) {
    label = 'Edit product in Shopify'
    url = getShopifyProductUrl(published?.shopify?.id)
  }
  if (type === SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE) {
    label = 'Edit variant in Shopify'
    url = getShopifyProductVariantUrl(published?.shopify?.productId, published?.shopify?.id)
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
