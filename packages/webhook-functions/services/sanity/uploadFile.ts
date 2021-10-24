import { SanityAssetDocument } from '@sanity/client'
import { sanityClient } from '../../lib/sanity'

const LABEL = '[services::sanity::uploadFile]'

const uploadFile = async (file: Buffer): Promise<SanityAssetDocument> => {
  console.log(`${LABEL} Uploading file...`)

  const sanityFile: SanityAssetDocument = await sanityClient.assets.upload(
    'file',
    file
  )

  console.log(`${LABEL} File uploaded`)

  return sanityFile
}

export default uploadFile
