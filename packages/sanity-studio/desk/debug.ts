import S from '@sanity/desk-tool/structure-builder'
import { RobotIcon } from '@sanity/icons'
import { SHOPIFY_PRODUCT_DOCUMENT_TYPE, SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE } from '../constants'

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
            .schemaType(SHOPIFY_PRODUCT_DOCUMENT_TYPE)
            .child(
              S.documentTypeList(SHOPIFY_PRODUCT_DOCUMENT_TYPE)
                .defaultOrdering([{ field: 'shopify.title', direction: 'asc'}])
            ),
          // Product variants (loose)
          S.listItem()
            .title('All Product Variants')
            .schemaType(SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE)
            .child(
              S.documentTypeList(SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE)
                .defaultOrdering([{ field: 'shopify.title', direction: 'asc'}])
            ),
        ]
      )
  )
