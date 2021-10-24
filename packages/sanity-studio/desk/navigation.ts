import { JoystickIcon } from '@sanity/icons'
import S from '@sanity/desk-tool/structure-builder'

// prettier-ignore
export const navigation = S.listItem()
  .title('Navigation')
  .schemaType('navigation')
  .icon(JoystickIcon)
  .child(
    S.editor()
      .title('Navigation')
      .schemaType('navigation')
      .documentId('navigation')
  )
