import { sanityClient } from '../../lib/sanity'

const markDeletedProductAndVariants = async (productId: number) => {
  // Fetch all product variant documents with matching Shopify Product ID
  const productVariants: string[] = await sanityClient.fetch(
    `*[
      _type == "productVariant"
      && store.productId == $productId
    ]._id`,
    { productId: productId }
  )

  const documentId = `shopifyProduct-${productId}`
  const draftDocumentId = `drafts.${documentId}`

  // Check for draft
  const draft = await sanityClient.getDocument(draftDocumentId)

  const transaction = sanityClient.transaction()
  // Mark product as deleted
  transaction.patch(documentId, patch => patch.set({ 'store.isDeleted': true }))
  if (draft) {
    transaction.patch(draftDocumentId, patch => patch.set({ 'store.isDeleted': true }))
  }

  // Mark all product variants as deleted
  productVariants.forEach(documentId =>
    transaction.patch(documentId, patch => patch.set({ 'store.isDeleted': true }))
  )

  await transaction.commit()
}

export default markDeletedProductAndVariants
