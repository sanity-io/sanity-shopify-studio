import { print } from 'graphql'
import gql from 'graphql-tag'
import { encode } from 'shopify-gid'
import { ProductProviderFragment } from './fragments'

const LABEL = '[services::shopify::fetchProduct]'

/**
 * Fetch Product from Shopify Storefront API
 *
 * @param id Shopify Product ID
 * @returns Product object
 */
const fetchProduct = async (id: number) => {
  console.log(`${LABEL} id: ${id}`)

  const shopifyResponse = await fetch(process.env.SHOPIFY_GRAPHQL_ENDPOINT, {
    body: JSON.stringify({
      query: print(
        gql`
          query (
            $id: ID!
            $numProductMedia: Int
            $numProductMetafields: Int
            $numProductVariants: Int
            $numProductVariantMetafields: Int
            $numProductSellingPlanGroups: Int
            $numProductSellingPlans: Int
            $numProductVariantSellingPlanAllocations: Int
          ) {
            product(id: $id) {
              id
              ...ProductProviderFragment
            }
          }

          ${ProductProviderFragment}
        `
      ),
      variables: {
        id: encode('Product', id),
        numProductMedia: 1,
        numProductMetafields: 0,
        numProductSellingPlanGroups: 10,
        numProductSellingPlans: 10,
        numProductVariants: 250,
        numProductVariantMetafields: 10,
        numProductVariantSellingPlanAllocations: 10
      }
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    },
    method: 'POST'
  })
  const shopifyData = await shopifyResponse.json()
  console.log(`${LABEL} Completed!`)

  return shopifyData
}

export default fetchProduct
