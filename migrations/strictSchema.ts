import {getCliClient} from 'sanity/cli'
import type {SanityDocumentLike, Path} from 'sanity'
import type {Transaction, PatchBuilder, PatchOperations} from '@sanity/client'
import {extractWithPath} from '@sanity/mutator'

/*
 * This migration will do two things:
 *
 * Firstly, it will migrate the `_type` of certain blocks in Portable Text so that they're named in line with other usage of the modules.
 * For example, the `blockAccordion` type will be named `module.accordion` instead. This also adds GraphQL support for these types.
 * See more on strict schema types here: https://www.sanity.io/docs/graphql#33ec7103289a
 *
 * This is a breaking change for the schema, so you'll need to update your frontend to match.
 * For an example change to a GRQO query, please see:
 * https://github.com/sanity-io/hydrogen-sanity-demo/blob/main/app/queries/sanity/fragments/portableText/portableText.ts
 *
 * Secondly, it change the name of the custom product options from "color" and "size" to "colorObject" and "sizeObject".
 * As well as adding support for GraphQL, this fixes a schema warning error in v3 of the Sanity Studio.
 *
 * To run this migration:
 * 1. Take a backup of your dataset with:
 * `npx sanity@latest dataset export`
 *
 * 2. Copy this file to the root of your Sanity Studio project
 *
 * 3. If necessary, update the DOCUMENT_TYPES constant below to match the schema types you want to migrate.
 * This should be anywhere that the `body` portable text field is used - in the template this is the `page` and `product` types.
 * You can also update the BLOCK_TYPES constant to match the block types you want to migrate.
 *
 * 4. Run the script (replace <schema-type> with the name of your schema type):
 * npx sanity@latest exec ./migrations/strictSchema.ts --with-user-token
 *
 * 5. This script will exit if any of the mutations fail due to a revision mismatch (which means the document was
 * edited between fetch => update). It can safely be re-run multiple times until it eventually runs out of documents to migrate.
 *
 */

const DOCUMENT_TYPES = ['product', 'page']
const BLOCK_TYPES = [
  {from: 'blockAccordion', to: 'module.accordion'},
  {from: 'group', to: 'accordionGroup'},
  {from: 'blockCallout', to: 'module.callout'},
  {from: 'blockGrid', to: 'module.grid'},
  {from: 'item', to: 'gridItem'},
  {from: 'blockImages', to: 'module.images'},
  {from: 'blockInstagram', to: 'module.instagram'},
  {from: 'blockProducts', to: 'module.products'},
]

type Patch = {
  id: string
  patch: PatchBuilder | PatchOperations
}

// This will use the client configured in ./sanity.cli.ts
const client = getCliClient()

// Get the settings document(s) from the dataset. We might have a draft, which will need patching too.
// We make the change to the structure in the GROQ query, so we don't need to do any transformation.
// We also fetch the _id and _rev, so we can use that to patch the document(s) later.
const fetchSettings = () =>
  client.fetch(
    `*[_type == 'settings'] {
      _id,
      _rev,
      customProductOptions[] {
        ...,
        _type == 'customProductOption.color' => {
          ...,
          colors[] {
            ...,
            '_type': 'customProductOption.colorObject',
          }
        },
        _type == 'customProductOption.size' => {
          ...,
          sizes[] {
            ...,
            '_type': 'customProductOption.sizeObject',
          }
        }
      }
    }`
  )

// Create a transaction from the patches
const createTransaction = (patches: Patch[]) =>
  patches.reduce((tx: Transaction, patch) => tx.patch(patch.id, patch.patch), client.transaction())

// Commit the transaction
const commitTransaction = (tx: Transaction) => tx.commit()

// Build the patches to apply to the settings document(s)
const buildSettingsPatches = (docs: SanityDocumentLike[]) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: {customProductOptions: doc.customProductOptions},
      // this will cause the migration to fail if any of the
      // documents have been modified since the original fetch.
      ifRevisionID: doc._rev,
    },
  }))

// Migrate the settings documents by getting the documents, building the patches, creating a transaction and committing it.
const migrateSettings = async () => {
  const documents = await fetchSettings()
  const patches = buildSettingsPatches(documents)

  if (patches.length === 0) {
    // eslint-disable-next-line no-console
    console.debug('🚨 No settings documents to migrate!')
    return null
  }

  //eslint-disable-next-line no-console
  console.debug(`⏳ Migrating ${patches.length} settings documents...`)
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  console.debug(`✅ Settings migrated`)

  return
}

// Get the documents with Portable Text fields from the dataset. We'll need to patch the body fields with the relevant updates.
const fetchDocuments = () =>
  client.fetch(
    `*[_type in $types] {
      _id,
      _rev,
      "blockTypes": array::unique(body[]._type),
      body
    } [
      ${BLOCK_TYPES.map((block) => `"${block.from}" in blockTypes`).join(' || ')}
    ][0..100]`,
    {types: DOCUMENT_TYPES}
  )

function convertPath(pathArr: Path) {
  return pathArr
    .map((part) => {
      if (Number.isInteger(part)) {
        return `[${part}]`
      }
      return `.${part}`
    })
    .join('')
    .substring(1)
}

// Build the patches to apply to the documents
const buildPatches = (docs: SanityDocumentLike[]) =>
  docs.flatMap((doc: SanityDocumentLike) => {
    return BLOCK_TYPES.flatMap((blockType) => {
      const matches = extractWithPath(`..[_type=="${blockType.from}"]`, doc)

      return matches.flatMap((match) => {
        const block = match.value
        if (typeof block !== 'object') {
          return
        }

        const path = convertPath(match.path)
        const newBlock = {...block, _type: blockType.to}

        return {
          id: doc._id,
          patch: {
            set: {[path]: newBlock},
            // this will cause the migration to fail if any of the
            // documents have been modified since the original fetch.
            ifRevisionID: doc._rev,
          },
        }
      })
    }).filter((item) => item !== undefined)
  })

const migrateDocumentBatch = async (): Promise<Function | null> => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)

  if (patches.length === 0) {
    // eslint-disable-next-line no-console
    console.debug('✅ No more documents to migrate')
    return null
  }
  // eslint-disable-next-line no-console
  console.debug(
    `⏳ Migrating batch:\n%s`,
    patches.map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  )

  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  return migrateDocumentBatch()
}

const runMigration = async () => {
  // eslint-disable-next-line no-console
  console.debug('🚀 Starting migration...')
  await migrateSettings()
  await migrateDocumentBatch()
  // eslint-disable-next-line no-console
  console.debug('👋 Migration complete!')
}

runMigration().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
