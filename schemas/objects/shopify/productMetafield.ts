import {defineField, defineType} from 'sanity'
import {SunIcon} from '@sanity/icons'

export default defineType({
  title: 'Product metafield',
  name: 'productMetafield',
  type: 'object',
  icon: SunIcon,
  readOnly: true,
  fields: [
    // Name
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    // Value
    defineField({
      title: 'Value',
      name: 'value',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      const {name} = selection
      return {
        title: name,
      }
    },
  },
})
