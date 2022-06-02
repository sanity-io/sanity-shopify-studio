import { BulbOutlineIcon } from '@sanity/icons'

export default {
  name: 'module.callout',
  title: 'Callout',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    // Text
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 2,
      validation: Rule => [
        Rule.required(),
        Rule.max(70).warning(`Callout length shouldn't be more than 70 characters.`)
      ]
    },
    // Link
    {
      name: 'links',
      title: 'Link',
      type: 'array',
      of: [{ type: 'linkInternal' }, { type: 'linkExternal' }],
      validation: Rule => Rule.max(1)
    }
  ],
  preview: {
    select: {
      text: 'text',
      url: 'url'
    },
    prepare(selection) {
      const { text, url } = selection
      return {
        subtitle: 'Callout',
        title: text
      }
    }
  }
}
