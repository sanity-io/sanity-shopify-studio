import S from '@sanity/desk-tool/structure-builder'

// prettier-ignore
export const colorThemes = S.listItem()
  .title('Color themes')
  .schemaType('colorTheme')
  .child(
    S.documentTypeList('colorTheme')
  )
