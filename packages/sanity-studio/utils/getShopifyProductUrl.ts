export const getShopifyProductUrl = (productId: number) => {
  return `https://${process.env.SANITY_STUDIO_SHOPIFY_STORE_ID}.myshopify.com/admin/products/${productId}`
}
