import PQueue from 'p-queue'

import { sanityClient } from '../../lib/sanity'

const LABEL = '[services::sanity::deleteUnusedFiles]'

const deleteUnusedFiles = async () => {
  console.log(`${LABEL} Deleting unused files...`)

  // Fetch all `sanity.fileAsset` documents with no references
  const query = `*[_type == "sanity.fileAsset" && count(*[references(^._id)]) == 0] { _id }`

  const sanityResult: { _id: string }[] = await sanityClient.fetch(query)

  // Use a promise queue to delete files individually
  const queue = new PQueue({
    concurrency: 4,
    interval: 1000 / 25,
  })

  await queue.addAll(
    sanityResult.map(file => () => sanityClient.delete(file._id))
  )

  console.log(`${LABEL} Completed!`)
}

export default deleteUnusedFiles
