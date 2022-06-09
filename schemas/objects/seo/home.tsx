export default {
  name: 'seo.home',
  title: 'SEO',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.max(50).warning('Longer titles may be truncated by search engines')
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: Rule =>
        Rule.max(150).warning('Longer descriptions may be truncated by search engines')
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    }
  ],
  validation: Rule => Rule.required()
}
