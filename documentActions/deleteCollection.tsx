/**
 * Custom document action
 *
 * Learn more: https://www.sanity.io/docs/document-actions
 */
import { useRouter } from '@sanity/base/router'
import { TrashIcon } from '@sanity/icons'
import { Stack, Text, useToast } from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'
import React, { useState } from 'react'

type Props = {
  draft?: Record<string, any> // Sanity Document
  onComplete: () => void
  published?: Record<string, any> // Sanity Document
  type: string
}

const deleteCollection = (props: Props) => {
  const { draft, onComplete, published } = props

  const [dialogOpen, setDialogOpen] = useState(false)

  const router = useRouter()
  const toast = useToast()

  return {
    color: 'danger',
    dialog: dialogOpen && {
      color: 'danger',
      header: 'Delete current collection?',
      message: (
        <Stack space={4}>
          <Text>Delete the current collection in your dataset.</Text>
          <Text weight="medium">No content on Shopify will be deleted.</Text>
        </Stack>
      ),
      onCancel: onComplete,
      onConfirm: async () => {
        // Delete current document (including draft)
        const transaction = sanityClient.transaction()
        if (published?._id) {
          transaction.delete(published._id)
        }
        if (draft?._id) {
          transaction.delete(draft._id)
        }

        try {
          await transaction.commit()
          // Navigate back to collections root
          router.navigateUrl('/desk/collections')
        } catch (err) {
          toast.push({
            status: 'error',
            title: err?.message
          })
        } finally {
          // Signal that the action is complete
          onComplete()
        }
      },
      type: 'confirm'
    },
    icon: TrashIcon,
    label: 'Delete',
    onHandle: () => setDialogOpen(true),
    shortcut: 'Ctrl+Alt+D'
  }
}

export default deleteCollection
