import client from '@sanity/client'
import { SANITY_API_VERSION } from '../constants'

export const sanityClient = client({
  apiVersion: SANITY_API_VERSION,
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_ADMIN_AUTH_TOKEN, // admin token has write access
  useCdn: false
})
