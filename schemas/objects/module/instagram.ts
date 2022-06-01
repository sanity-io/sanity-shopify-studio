import { UserIcon } from '@sanity/icons'

export default {
  name: 'module.instagram',
  title: 'Instagram',
  type: 'object',
  icon: UserIcon,
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: Rule =>
        Rule.custom(url => {
          const pattern = /(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*/g
          const isValid = url.match(pattern)
          return isValid ? true : 'Not a valid Instagram post URL'
        })
    }
  ],
  preview: {
    select: {
      url: 'url'
    },
    prepare(selection) {
      const { url } = selection
      return {
        subtitle: 'Instagram',
        title: url
      }
    }
  }
}
