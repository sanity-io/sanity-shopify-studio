import pluralize from 'pluralize'

export default {
  name: 'customProductOption.size',
  title: 'Size',
  type: 'object',
  icon: false,
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shopify product option name (case sensitive)',
      validation: Rule => Rule.required()
    },
    // Sizes
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [
        {
          name: 'size',
          title: 'Size',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Shopify product option value (case sensitive)',
              validation: Rule => Rule.required()
            },
            {
              name: 'width',
              title: 'Width',
              type: 'number',
              description: 'In mm',
              validation: Rule => Rule.required().precision(2)
            },
            {
              name: 'height',
              title: 'Height',
              type: 'number',
              description: 'In mm',
              validation: Rule => Rule.required().precision(2)
            }
          ],
          preview: {
            select: {
              height: 'height',
              title: 'title',
              width: 'width'
            },
            prepare(selection) {
              const { height, title, width } = selection
              return {
                subtitle: `${width || '??'}cm x ${height || '??'}cm`,
                title
              }
            }
          }
        }
      ],
      validation: Rule =>
        Rule.custom(options => {
          // Each size must have a unique title
          const uniqueTitles = new Set(options.map(option => option.title))
          if (options.length > uniqueTitles.size) {
            return 'Each product option must have a unique title'
          }
          return true
        })
    }
  ],
  preview: {
    select: {
      sizeCount: 'sizes.length',
      title: 'title'
    },
    prepare(selection) {
      const { sizeCount, title } = selection
      return {
        subtitle: sizeCount ? pluralize('size', sizeCount, true) : 'No sizes',
        title
      }
    }
  }
}
