import {defineField} from 'sanity'

export default defineField({
  name: 'customProductOption.height',
  title: 'Height',
  type: 'number',
  description: 'In mm',
  validation: (Rule) => Rule.required().precision(2),
})
