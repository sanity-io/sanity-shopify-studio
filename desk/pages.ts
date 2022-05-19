import S from '@sanity/desk-tool/structure-builder'
import { DocumentsIcon } from '@sanity/icons'

// prettier-ignore
export const pages = S.listItem()
  .title('Pages')
  .icon(DocumentsIcon)
  .schemaType('page')
  .child(
    S.documentTypeList('page')
  )