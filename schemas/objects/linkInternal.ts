import { LinkIcon } from '@sanity/icons'
import { PAGE_REFERENCES } from '../../constants'
import { getPriceRange } from '../../utils/getPriceRange'

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
      validation: Rule => Rule.required()
    },
    // Reference
    {
      name: 'reference',
      type: 'reference',
      weak: true,
      validation: Rule => Rule.required(),
      to: PAGE_REFERENCES
    }
  ],
  preview: {
    select: {
      referenceProductTitle: 'reference.store.title',
      referenceProductPriceRange: 'reference.store.priceRange',
      referenceTitle: 'reference.title',
      referenceType: 'reference._type',
      title: 'title'
    },
    prepare(selection) {
      const {
        referenceProductPriceRange,
        referenceProductTitle,
        referenceTitle,
        referenceType,
        title
      } = selection

      let subtitle = [`→ ${referenceTitle || referenceProductTitle}`]
      if (referenceType === 'product' && referenceProductPriceRange) {
        subtitle.push(`(${getPriceRange(referenceProductPriceRange)})`)
      }

      return {
        // media: image,
        subtitle: subtitle.join(' '),
        title
      }
    }
  }
}
