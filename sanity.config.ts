import {defineConfig, isDev} from 'sanity'

import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {structure} from './structure'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'

const devOnlyPlugins = [visionTool()]
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const title = `Sanity + Shopify demo`

const setEnv = () => {
  switch (process.env.SANITY_STUDIO_BUILD_CONFIG) {
    case 'development':
      return {
        title: `${title} (dev)`,
        dataset: 'development',
      }
    case 'production':
      return {
        title,
        dataset: 'production',
      }
    default:
      return {
        title,
        dataset: 'production',
      }
  }
}

export default defineConfig({
  name: 'default',
  projectId,
  ...setEnv(),

  plugins: [
    structureTool({structure}),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },
})
