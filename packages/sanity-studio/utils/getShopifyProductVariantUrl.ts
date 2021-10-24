export const getShopifyProductVariantUrl = (
  productId: number,
  productVariantId: number
) => {
  return `https://${process.env.SANITY_STUDIO_SHOPIFY_STORE_ID}.myshopify.com/admin/products/${productId}/variants/${productVariantId}`
}
