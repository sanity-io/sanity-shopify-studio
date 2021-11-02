import { SHOPIFY_STORE_ID } from '../constants'

export const productUrl = (productId: number) => {
  return `https://${SHOPIFY_STORE_ID}.myshopify.com/admin/products/${productId}`
}

export const productVariantUrl = (productId: number, productVariantId: number) => {
  return `https://${SHOPIFY_STORE_ID}.myshopify.com/admin/products/${productId}/variants/${productVariantId}`
}
