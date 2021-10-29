// Default document actions
import defaultResolve, {
  CreateAction,
  DeleteAction,
  DuplicateAction,
  UnpublishAction
} from 'part:@sanity/base/document-actions'
import deleteProductAndVariants from '../documentActions/deleteProductAndVariants'
import shopifyLink from '../documentActions/shopifyLink'

export default function resolveDocumentActions(props) {
  return [
    // Start with Sanity's default actions
    ...defaultResolve(props)
      // Filter out actions by document type
      .filter(action => {
        if (props.type === 'product') {
          // Disable: creation, deletion, duplication
          if (
            [
              CreateAction,
              // DeleteAction,
              DuplicateAction
            ].includes(action)
          ) {
            return false
          }
        }

        if (props.type === 'productVariant') {
          // Disable: creation, duplication, unpublishing
          if ([CreateAction, DuplicateAction, UnpublishAction].includes(action)) {
            return false
          }

          // Disable delete button if variant has been marked for deletion
          if (action === DeleteAction) {
            if (props?.published?.store?.isDeleted) {
              return true
            }
            return false
          }
        }

        return true
      })
      // Override any built-in actions with our own
      .map(action => {
        // Products: replace default delete action
        if (props.type === 'product' && action === DeleteAction) {
          return deleteProductAndVariants
        }

        return action
      }),
    // Add our own custom actions
    shopifyLink
  ]
}
