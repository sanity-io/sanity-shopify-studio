import S from '@sanity/desk-tool/structure-builder'
import { BookIcon, DocumentIcon, DocumentsIcon, InfoOutlineIcon } from '@sanity/icons'

// prettier-ignore
export const articles = S.listItem()
  .title('Articles')
  .icon(DocumentsIcon)
  .child(
    S.list()
      .title('Articles')
      .items([
        S.listItem()
          .title('Editorial')
          .icon(BookIcon)
          .child(
            S.documentTypeList('article.editorial')
          ),
        S.listItem()
          .title('Info')
          .icon(InfoOutlineIcon)
          .child(
            S.documentTypeList('article.info')
          ),
      ])
  )
