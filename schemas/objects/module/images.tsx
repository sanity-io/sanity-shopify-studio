import { ImageIcon } from '@sanity/icons'
import pluralize from 'pluralize'

export default {
  name: 'module.images',
  title: 'Images',
  type: 'object',
  icon: ImageIcon,
  fields: [
    // Modules (Images)
    {
      name: 'modules',
      title: 'Images',
      type: 'array',
      of: [{ type: 'module.image' }],
      validation: Rule => Rule.required().max(2)
    },
    // Full width
    {
      name: 'fullWidth',
      title: 'Full width',
      type: 'boolean',
      description: 'Display single image at full width (on larger breakpoints)',
      initialValue: false,
      hidden: ({ parent }) => parent?.modules.length > 1
    }
  ],
  preview: {
    select: {
      imageCount: 'modules.length'
    },
    prepare(selection) {
      const { imageCount } = selection
      return {
        subtitle: 'Images',
        title: imageCount ? pluralize('image', imageCount, true) : 'No images'
      }
    }
  }
}
