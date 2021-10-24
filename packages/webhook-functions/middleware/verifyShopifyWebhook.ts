import crypto from 'crypto'
import { NextApiResponse } from 'next'
import timingSafeCompare from 'tsscmp'
import { NextApiRequestWithRawBody } from '../types'

/**
 * Verify Shopify webhook:
 * - get passed HMAC in request header
 * - generate HMAC based off shared secret and body
 * - compare both hashes with `crypto.timingSafeEqual`
 *
 * @param req Next.js API request with raw body
 * @param res Next.js API response
 * @param next Middleware function
 * @returns
 */
const verifyShopifyWebhook = (
  req: NextApiRequestWithRawBody,
  res: NextApiResponse,
  next: () => void
) => {
  const { headers, rawBody } = req

  // Get HMAC header from Shopify
  const hmac = String(headers['x-shopify-hmac-sha256'])

  // Create HMAC from our secret key and (raw) body
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SHARED_SECRET)
    .update(rawBody || '')
    .digest('base64')

  if (!timingSafeCompare(hash, hmac)) {
    return res.status(200).send('Invalid credentials')
  }

  next()
}

export default verifyShopifyWebhook
