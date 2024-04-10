import {defineField, defineType} from 'sanity'
import {SlPicture} from 'react-icons/sl'

// Utils
import {validateSlug} from '../../utils/validateSlug'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {
      name: 'editorial',
      title: 'Editorial',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Name
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      group: 'seo',
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
      group: 'editorial',
      options: {
        hotspot: true,
      },
    }),
    // Published Date
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      group: 'editorial',
      validation: (Rule) => Rule.required(),
    }),
    // Author
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      options: {
        disableNew: true,
      },
      to: [
        {
          type: 'blogAuthor',
        },
      ],
      group: 'editorial',
    }),
    // Categories
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          options: {
            disableNew: true,
          },
          type: 'reference',
          to: [
            {
              type: 'blogCategory',
            },
          ],
        },
      ],
      group: 'editorial',
      validation: (Rule) => Rule.required().unique(),
    }),
    // Body
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body',
      group: 'editorial',
    }),
  ],
  orderings: [
    {
      title: 'Title (A-Z)',
      name: 'title',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Title (Z-A)',
      name: 'title',
      by: [{field: 'title', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      categories: 'categories',
    },
    prepare(selection) {
      const {title, media, categories} = selection
      return {
        title,
        media: media ? media : SlPicture,
        subtitle: categories ? categories[0]?.title : 'no categories set',
      }
    },
  },
})
