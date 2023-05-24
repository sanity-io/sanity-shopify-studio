import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'g2b4qblu',
    dataset: process.env.SANITY_STUDIO_PROJECT_DATASET || 'production',
  },
})
