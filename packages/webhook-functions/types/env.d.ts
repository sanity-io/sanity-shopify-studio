declare namespace NodeJS {
  export interface ProcessEnv {
    SANITY_ADMIN_AUTH_TOKEN: string
    SANITY_DATASET: string
    SANITY_PROJECT_ID: string
    SHOPIFY_ADMIN_API_ENDPOINT: string
    SHOPIFY_ADMIN_API_PASSWORD: string
    SHOPIFY_WEBHOOK_SHARED_SECRET: string
  }
}
