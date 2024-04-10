import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

import {HiOutlineDocumentText} from 'react-icons/hi'
import {MdOutlineArticle, MdOutlineCategory, MdPerson2} from 'react-icons/md'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Blog')
    .schemaType('blogPost')
    .icon(HiOutlineDocumentText)
    .child(
      S.list()
        .title('Blog')
        .items([
          // Posts
          S.listItem()
            .title('Posts')
            .icon(MdOutlineArticle)
            .child(
              S.documentTypeList('blogPost')
                .defaultOrdering([{field: 'title', direction: 'asc'}])
                .child((documentId) =>
                  S.document().documentId(documentId).schemaType('blogPost').views([S.view.form()])
                )
            ),
          // Categories
          S.listItem()
            .title('Categories')
            .icon(MdOutlineCategory)
            .schemaType('blogCategory')
            .child(
              S.documentTypeList('blogCategory')
                .defaultOrdering([{field: 'title', direction: 'asc'}])
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('blogCategory')
                    .views([S.view.form()])
                )
            ),
          // Authors
          S.listItem()
            .title('Authors')
            .icon(MdPerson2)
            .schemaType('blogAuthor')
            .child(
              S.documentTypeList('blogAuthor')
                .defaultOrdering([{field: 'title', direction: 'asc'}])
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('blogAuthor')
                    .views([S.view.form()])
                )
            ),
        ])
    )
)
