import { ImageIcon } from '@sanity/icons'
import pluralize from 'pluralize'

export default {
  icon: ImageIcon,
  name: 'imageWithProductHotspots',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      options: { hotspot: true },
      type: 'image',
      validation: Rule => Rule.required()
    },
    {
      name: 'showHotspots',
      title: 'Show product hotspots',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'productHotspots',
      title: 'Product hotspots',
      type: 'productHotspots',
      hidden: ({ parent }) => !parent.showHotspots
    }
  ],
  preview: {
    select: {
      fileName: 'image.asset.originalFilename',
      hotspotCount: 'productHotspots.length',
      image: 'image',
      showHotspots: 'showHotspots'
    },
    prepare(selection) {
      const { fileName, hotspotCount, image, showHotspots } = selection
      return {
        media: image,
        subtitle:
          showHotspots && hotspotCount > 0
            ? `${pluralize('hotspot', hotspotCount, true)}`
            : undefined,
        title: fileName
      }
    }
  }
}
