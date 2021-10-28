# Sanity + Shopify starter

**Webhook functions**

---

**Document schemas**  
[`product`](../sanity-studio/schemas/documents/product.tsx)  
[`productVariant`](../sanity-studio/schemas/documents/productVariant.tsx)

---

**Action on Shopify product create / update**  
[`/services/sanity/syncShopifyProductAndVariants.ts`](./services/sanity/syncShopifyProductAndVariants.ts)

_Transactions are applied on both published and draft documents._

- Determine the current Product ID based on the incoming webhook payload
- Fetch the [product listing on Shopify Admin API](https://shopify.dev/api/admin-rest/2021-10/resources/productlisting#[get]/admin/api/2021-10/product_listings/{product_listing_id}.json) to determine whether it's available on the current sales channel (requires Shopify Admin API password)
  - if request yields a 404, it's either not enabled on the current sales channel (or is a draft)
- Get price ranges across all variants
- Create a map of all product variant images
- Map through product response and create individual `productVariant` objects
  - We store product-specific status fields (e.g. `isDeleted`, `isEnabled` and `status`) on individual product variants too, purely for editor ergonomics (this could possibly be omitted)
- Create `product` document for upcoming transaction
  - Create a nested `store` object
    - Transform and store all data from Storefront API in here (in the studio, all data scoped within this object will be read-only)
    - Also store weak references to an array of `productVariant` documents
- Create Sanity transaction
- For this Product ID
  - Fetch published and draft documents from Sanity dataset
  - If document doesn't exist, create new `product` in transaction
  - If document already exists (either published or draft)
    - patch new values for `store` and override all previous
- Create new `productVariant` in transactions
- Commit transaction

> TL;DR
>
> - Create / patch products and product variants in Sanity
> - Product variants are weakly referenced to products
> - Update both published documents and drafts

---

**Action on Shopify product delete**  
[`/services/sanity/markShopifyProductAndVariants.ts`](./services/sanity/markShopifyProductAndVariants.ts)

> TL;DR
>
> - Set `isDeleted` flag on deleted product and linked variants
> - Update both published documents and drafts
