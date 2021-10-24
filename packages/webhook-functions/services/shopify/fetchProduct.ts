import { print } from 'graphql'
import gql from 'graphql-tag'
import { encode } from 'shopify-gid'

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
          query ($id: ID!) {
            product(id: $id) {
              id
              compareAtPriceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              title
              variants(first: 250) {
                edges {
                  node {
                    availableForSale
                    compareAtPriceV2 {
                      amount
                      currencyCode
                    }
                    id
                    image {
                      originalSrc
                      altText
                      id
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                    title
                  }
                }
              }
            }
          }
        `
      ),
      variables: {
        id: encode('Product', id),
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    method: 'POST',
  })
  const shopifyData = await shopifyResponse.json()
  console.log(`${LABEL} Completed!`)

  return shopifyData
}

export default fetchProduct
