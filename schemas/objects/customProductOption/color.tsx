import pluralize from 'pluralize'
import React from 'react'

const ColorPreview = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 'inherit',
        display: 'flex',
        height: '100%',
        width: '100%'
      }}
    />
  )
}

export default {
  name: 'customProductOption.color',
  title: 'Color',
  type: 'object',
  icon: false,
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shopify product option name (case sensitive)',
      validation: Rule => Rule.required()
    },
    // Colors
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          name: 'color',
          title: 'Color',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Shopify product option value (case sensitive)',
              validation: Rule => Rule.required()
            },
            {
              name: 'color',
              title: 'Color',
              type: 'color',
              options: {
                disableAlpha: true
              },
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              colorHex: 'color.hex',
              title: 'title'
            },
            prepare(selection) {
              const { colorHex, title } = selection
              return {
                media: <ColorPreview color={colorHex} />,
                subtitle: colorHex,
                title
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      colorCount: 'colors.length',
      title: 'title'
    },
    prepare(selection) {
      const { colorCount, title } = selection
      return {
        subtitle: colorCount ? pluralize('color', colorCount, true) : 'No colors',
        title
      }
    }
  }
}
