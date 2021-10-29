import S from '@sanity/desk-tool/structure-builder'
import { debug } from './desk/debug'
import { home } from './desk/home'
import { navigation } from './desk/navigation'
import { pages } from './desk/pages'
import { products } from './desk/products'

// If you add document types to desk structure manually, you can add them to this array to prevent duplicates in the root pane
const DOCUMENT_TYPES_IN_STRUCTURE = ['page', 'product', 'productVariant', 'home', 'navigation', 'media.tag']
export default () => {
  // prettier-ignore
  return (
    S.list()
      .title('Content')
      .items([
        home,
        pages,
        S.divider(),
        products,
        S.divider(),
        debug,
        S.divider(),
        navigation,
        // Automatically add new document types to the root pane
        ...S.documentTypeListItems().filter(listItem => !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem.getId()))
      ])
  )
}
