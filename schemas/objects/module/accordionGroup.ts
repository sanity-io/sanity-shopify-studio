import {defineField} from 'sanity'

export default defineField({
  name: 'accordionGroup',
  title: 'Groups',
  type: 'array',
  of: [
    {
      type: 'accordionObject',
    },
  ],
})
