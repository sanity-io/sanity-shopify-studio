const LABEL = '[services::shopify::fetchProductListingStatus]'

/**
 * Fetch Shopify Product listing status code.
 * This is just a simple way to determine if a product is available on the current sales channel.
 *
 * @param productId Shopify Product ID
 * @returns {number} A HTTP Status code
 */
const fetchProductListing = async (productId: number) => {
  console.log(`${LABEL} productId: ${productId}`)

  const shopifyResponse = await fetch(
    `${process.env.SHOPIFY_ADMIN_API_ENDPOINT}/product_listings/${productId}.json`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }
  )

  console.log(`${LABEL} Completed!`)

  return shopifyResponse.status
}

export default fetchProductListing
