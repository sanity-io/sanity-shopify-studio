import {defineType} from 'sanity'

export default defineType({
  name: 'metafields',
  title: 'Metafields',
  type: 'array',
  of: [
    {
      type: 'productMetafield',
    },
  ],
})
