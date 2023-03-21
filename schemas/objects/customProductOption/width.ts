import {defineField} from 'sanity'

export default defineField({
  name: 'customProductOption.width',
  title: 'Width',
  type: 'number',
  description: 'In mm',
  validation: (Rule) => Rule.required().precision(2),
})
