import {defineField} from 'sanity'

export default defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    {
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
      },
      // Paragraphs
      type: 'block',
    },
    // Custom blocks
    {
      type: 'module.accordion',
    },
    {
      type: 'module.callout',
    },
    {
      type: 'module.grid',
    },
    {
      type: 'module.images',
    },
    {
      type: 'module.instagram',
    },
    {
      type: 'module.products',
    },
  ],
})
