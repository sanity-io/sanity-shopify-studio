import { sanityClient } from '../../lib/sanity'

const LABEL = '[services::sanity::deleteDocument]'

const deleteDocument = async (id: string) => {
  console.log(`${LABEL} id: ${id}`)

  await sanityClient.transaction().delete(id).delete(`drafts.${id}`).commit()

  console.log(`${LABEL} Completed!`)
}

export default deleteDocument
