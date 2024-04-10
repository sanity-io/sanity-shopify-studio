import {defineField, defineType} from 'sanity'

// Utils
import {validateSlug} from '../../utils/validateSlug'

export default defineType({
  name: 'blogCategory',
  title: 'Blog Categories',
  type: 'document',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
      preview: {
        select: {
          title: 'Image',
          media: 'userLandscape',
        },
      },
    }),
    // Body
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      slug: 'slug',
    },
    prepare(selection) {
      const {title, media, slug = ''} = selection
      return {
        title,
        media,
        subtitle: slug === '' ? `Slug is missing` : `Slug: /${slug.current}`,
      }
    },
  },
})
