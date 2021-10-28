import S from '@sanity/desk-tool/structure-builder'
import { RobotIcon } from '@sanity/icons'

// prettier-ignore
export const debug = S.listItem()
  .title('Debug')
  .icon(RobotIcon)
  .child(
    S.list()
      .title('Debug')
      .items(
        [
          // Products
          S.listItem()
            .title('All Products')
            .schemaType('product')
            .child(
              S.documentTypeList('product')
                .defaultOrdering([{ field: 'store.title', direction: 'asc'}])
            ),
          // Product variants (loose)
          S.listItem()
            .title('All Product Variants')
            .schemaType('productVariant')
            .child(
              S.documentTypeList('productVariant')
                .defaultOrdering([{ field: 'store.title', direction: 'asc'}])
            ),
        ]
      )
  )
