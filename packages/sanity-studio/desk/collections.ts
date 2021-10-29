import S from '@sanity/desk-tool/structure-builder'
import { PackageIcon } from '@sanity/icons'

// prettier-ignore
export const collections = S.listItem()
  .title('Collections')
  .schemaType('collection')
  .icon(PackageIcon)
  .child(
    S.documentTypeList('collection')
  )
