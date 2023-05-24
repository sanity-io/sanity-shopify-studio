import {defineField} from 'sanity'

export default defineField({
  name: 'customProductOption.sizeObject',
  title: 'Size',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'customProductOption.title',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'customProductOption.width',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'customProductOption.height',
    }),
  ],
  preview: {
    select: {
      height: 'height',
      title: 'title',
      width: 'width',
    },
    prepare(selection) {
      const {height, title, width} = selection
      return {
        subtitle: `${width || '??'}cm x ${height || '??'}cm`,
        title,
      }
    },
  },
})
