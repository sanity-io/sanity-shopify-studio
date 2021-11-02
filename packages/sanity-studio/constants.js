// Currency code (ISO 4217) to use when displaying prices in the studio
// https://en.wikipedia.org/wiki/ISO_4217
export const DEFAULT_CURRENCY_CODE = 'USD'

// Document ids which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_IDS = ['home', 'settings']

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_TYPES = ['media.tag']

// References to include in 'internal' links
export const PAGE_REFERENCES = [
  { type: 'article.editorial' },
  { type: 'article.info' },
  { type: 'home' },
  { type: 'product' }
]

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = '2021-06-07'

// The ID of your Shopify storefront, which is the first part of your .myshopify.com URL
export const SHOPIFY_STORE_ID = 'sanity-dev-store'
