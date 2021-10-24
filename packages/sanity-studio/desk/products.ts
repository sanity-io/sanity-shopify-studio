import { BasketIcon, CopyIcon, InfoOutlineIcon } from '@sanity/icons'
import S from '@sanity/desk-tool/structure-builder'
import {
  SHOPIFY_PRODUCT_DOCUMENT_TYPE,
  SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
} from '../constants'

// prettier-ignore
export const products = S.listItem()
  .title('Products')
  .schemaType(SHOPIFY_PRODUCT_DOCUMENT_TYPE)
  .icon(BasketIcon)
  .child(
    S.documentTypeList(SHOPIFY_PRODUCT_DOCUMENT_TYPE)
      .defaultOrdering([{ field: 'shopify.title', direction: 'asc' }])
      // .defaultLayout('detail')
      .child(async id =>
        S.list()
          .title('Product')
          .items([
            // Details
            S.listItem()
              .title('Details')
              .icon(InfoOutlineIcon)
              .child(
                S.document()
                  .schemaType(SHOPIFY_PRODUCT_DOCUMENT_TYPE)
                  .documentId(id)
              ),
            // Product variants
            S.listItem()
              .title('Variants')
              .icon(CopyIcon)
              .child(
                S.documentList()
                  .title('Variants')
                  .schemaType(SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE)
                  .filter(
                    `
                      _type == "${SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE}"
                      && shopify.productId == $productId
                    `
                  )
                  .params({
                    productId: Number(id.replace('shopifyProduct-', '')),
                  })
              ),
          ])
      )
  )
