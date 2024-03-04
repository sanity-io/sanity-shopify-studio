import {defineField, defineType} from 'sanity'

// Icons
import {MdPersonOff} from 'react-icons/md'

// Utils
import {validateSlug} from '../../utils/validateSlug'

export default defineType({
  name: 'blogAuthor',
  title: 'Blog Author',
  type: 'document',
  groups: [
    {
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
      default: true,
    },
  ],
  fields: [
    // Name
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      group: 'seo',
      // @ts-ignore - TODO - fix this TS error
      validation: (Rule) => Rule.required(),
    }),
    // Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'seo',
      options: {
        source: 'title',
        isUnique: () => true,
      },
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
    }),
    // Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'seo',
    }),
    // Location
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'editorial',
    }),
    // Occupation
    defineField({
      name: 'occupation',
      title: 'Occupation',
      type: 'string',
      group: 'editorial',
    }),
    // Biography
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      group: 'editorial',
    }),
    // Links
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto'],
            }),
        },
      ],
      group: 'editorial',
    }),
    // Body
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body',
      group: 'editorial',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'location',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title,
        media: media ? media : MdPersonOff,
      }
    },
  },
})
