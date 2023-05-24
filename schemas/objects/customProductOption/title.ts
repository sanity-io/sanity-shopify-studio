import {defineField} from 'sanity'

export default defineField({
  name: 'customProductOption.title',
  title: 'Title',
  type: 'string',
  description: 'Shopify product option value (case sensitive)',
  validation: (Rule) => Rule.required(),
})
