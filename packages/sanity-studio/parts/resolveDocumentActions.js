// Default document actions
import defaultResolve, {
  CreateAction,
  DeleteAction,
  DuplicateAction,
  PublishAction,
  UnpublishAction,
} from 'part:@sanity/base/document-actions'
import deleteProductAndVariants from '../documentActions/deleteProductAndVariants'
import shopifyLink from '../documentActions/shopifyLink'
import {
  SHOPIFY_PRODUCT_DOCUMENT_TYPE,
  SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
} from '../constants'

export default function resolveDocumentActions(props) {
  return [
    // Start with Sanity's default actions
    ...defaultResolve(props)
      // Filter out actions by document type
      .filter(action => {
        if (props.type === SHOPIFY_PRODUCT_DOCUMENT_TYPE) {
          // Disable: creation, deletion, duplication
          if (
            [
              CreateAction,
              // DeleteAction,
              DuplicateAction,
            ].includes(action)
          ) {
            return false
          }
        }

        if (props.type === SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE) {
          // Disable: creation, deletion, duplication, unpublishing
          if (
            [
              CreateAction,
              DeleteAction,
              DuplicateAction,
              UnpublishAction,
            ].includes(action)
          ) {
            return false
          }
        }

        return true
      })
      // Override any built-in actions with our own
      .map(action => {
        // Products: replace default delete action
        if (
          props.type === SHOPIFY_PRODUCT_DOCUMENT_TYPE &&
          action === DeleteAction
        ) {
          return deleteProductAndVariants
        }

        return action
      }),
    // Add our own custom actions
    shopifyLink,
  ]
}
