export const collectionUrl = (storeId: string, collectionId: number) => {
  return `https://${storeId}/admin/collections/${collectionId}`
}

export const productUrl = (storeId: string, productId: number) => {
  return `https://${storeId}/admin/products/${productId}`
}

export const productVariantUrl = (storeId: string, productId: number, productVariantId: number) => {
  return `https://${storeId}/admin/products/${productId}/variants/${productVariantId}`
}
