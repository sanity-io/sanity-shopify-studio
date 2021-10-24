import { HomeIcon } from '@sanity/icons'
import S from '@sanity/desk-tool/structure-builder'

// prettier-ignore
export const home = S.listItem()
  .title('Home')
  .schemaType('home')
  .icon(HomeIcon)
  .child(
    S.editor()
      .title('Home')
      .schemaType('home')
      .documentId('home')
  )
