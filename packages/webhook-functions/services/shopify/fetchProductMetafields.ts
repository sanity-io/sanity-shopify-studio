const LABEL = '[services::shopify::fetchProductMetafields]'

/**
 * Fetch Shopify Product metafields
 *
 * @param productId Shopify Product ID
 * @returns
 */
const fetchProductMetafields = async (productId: number) => {
  console.log(`${LABEL} productId: ${productId}`)

  const shopifyResponse = await fetch(
    `${process.env.SHOPIFY_ADMIN_API_ENDPOINT}/products/${productId}/metafields.json`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_PASSWORD
      },
      method: 'GET'
    }
  )

  const data = await shopifyResponse.json()

  console.log(`${LABEL} Completed!`)
  console.log('data?.metafields', data?.metafields)

  return data?.metafields
}

export default fetchProductMetafields
