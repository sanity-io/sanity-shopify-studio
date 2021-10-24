import { LinkIcon } from '@sanity/icons'
import { PAGE_REFERENCES } from '../../constants'

export default {
  title: 'Internal Link',
  name: 'linkInternal',
  type: 'object',
  icon: LinkIcon,
  fields: [
    // Title
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    // Reference
    {
      name: 'reference',
      type: 'reference',
      weak: true,
      validation: Rule => Rule.required(),
      to: PAGE_REFERENCES,
    },
  ],
  preview: {
    select: {
      referenceTitle: 'reference.title',
      title: 'title',
    },
    prepare(selection) {
      const { referenceTitle, title } = selection

      let subtitle = []
      if (referenceTitle) {
        subtitle.push(`→ ${referenceTitle}`)
      }

      return {
        // media: image,
        subtitle: subtitle.join(' '),
        title,
      }
    },
  },
}
