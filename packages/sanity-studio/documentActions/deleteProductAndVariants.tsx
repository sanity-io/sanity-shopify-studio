import { TrashIcon } from '@sanity/icons'
import { Stack, Text } from '@sanity/ui'
import { useRouter } from '@sanity/base/router'
import sanityClient from 'part:@sanity/base/client'
import React, { useState } from 'react'
import { SANITY_API_VERSION } from '../constants'

type Props = {
  draft?: Record<string, any> // Sanity Document
  onComplete: () => void
  published?: Record<string, any> // Sanity Document
  type: string
}

const deleteProductAndVariants = (props: Props) => {
  const { draft, onComplete, published } = props

  const [dialogOpen, setDialogOpen] = useState(false)

  const router = useRouter()

  return {
    color: 'danger',
    dialog: dialogOpen && {
      header: 'Delete current product and associated variants?',
      message: (
        <Stack space={4}>
          <Text>
            Delete the current product and all associated variants in Sanity.
          </Text>
          <Text weight="medium">No content on Shopify will be deleted.</Text>
        </Stack>
      ),
      onCancel: onComplete,
      onConfirm: async () => {
        const productId = published?.shopify?.id

        // Find product variant documents with matching Shopify Product ID
        let productVariantIds: string[] = []
        if (productId) {
          productVariantIds = await sanityClient
            .withConfig({ apiVersion: SANITY_API_VERSION })
            .fetch(
              `*[
            _type == "shopify.productVariant"
            && shopify.productId == $productId
          ]._id`,
              { productId: productId }
            )
        }

        // Delete current document (including draft)
        const transaction = sanityClient.transaction()
        if (published?._id) {
          transaction.delete(published._id)
        }
        if (draft?._id) {
          transaction.delete(draft._id)
        }

        // Delete all product variants with matching IDs
        productVariantIds?.forEach(documentId => {
          if (documentId) {
            transaction.delete(documentId)
            transaction.delete(`drafts.${documentId}`)
          }
        })

        try {
          await transaction.commit()
          // Navigate back to products root
          router.navigateUrl('/desk/products')
        } catch (err) {
          // TODO: handle error / display notification
          console.log('Unable to complete transaction', err)
        } finally {
          // Signal that the action is complete
          onComplete()
        }
      },
      type: 'confirm',
    },
    icon: TrashIcon,
    label: 'Delete product and variants',
    onHandle: () => setDialogOpen(true),
  }
}

export default deleteProductAndVariants