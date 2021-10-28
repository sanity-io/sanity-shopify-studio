import { BasketIcon, CopyIcon, InfoOutlineIcon } from '@sanity/icons'
import S from '@sanity/desk-tool/structure-builder'

// prettier-ignore
export const products = S.listItem()
  .title('Products')
  .schemaType('product')
  .icon(BasketIcon)
  .child(
    S.documentTypeList('product')
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
                  .schemaType('product')
                  .documentId(id)
              ),
            // Product variants
            S.listItem()
              .title('Variants')
              .icon(CopyIcon)
              .child(
                S.documentList()
                  .title('Variants')
                  .schemaType('productVariant')
                  .filter(
                    `
                      _type == "productVariant"
                      && store.productId == $productId
                    `
                  )
                  .params({
                    productId: Number(id.replace('shopifyProduct-', '')),
                  })
              ),
          ])
      )
  )
