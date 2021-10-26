import { IceCreamIcon, SunIcon } from '@sanity/icons'
import React from 'react'
import ColorPreview from '../../components/ProductOptionValuePreview'
import { productOptionValueFields, productOptionValueFieldList } from '../../productOptionGroups'

const LAYOUT_OPTIONS: {
  title: string
  value: string
}[] = [
  {
    title: 'Swatch (color)',
    value: 'swatchColor'
  },
  {
    title: 'Swatch (image)',
    value: 'swatchImage'
  },
  {
    title: 'Grid',
    value: 'grid'
  }
]

export default {
  title: 'Product option',
  name: 'productOption',
  type: 'object',
  icon: IceCreamIcon,
  fieldsets: [
    {
      name: 'customize',
      title: 'Customize values',
      options: {
        collapsed: true,
        collapsible: true
      }
    }
  ],
  fields: [
    // Name
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description: 'This can be updated in Shopify',
      readOnly: true
    },
    // Layout
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      description: 'Product options will be displayed in a select element by default',
      options: {
        list: LAYOUT_OPTIONS
      }
    },
    // Custom fields
    {
      fieldset: 'customize',
      name: 'productOptionFields',
      title: 'Enable additional fields',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        list: productOptionValueFieldList()
      }
    },
    // Values
    {
      title: 'Values',
      name: 'values',
      type: 'array',
      options: {
        // FIXME: remove this non-standard option which extends `/parts/customArrayFunctions`
        creatable: false,
        sortable: false
      },
      of: [
        {
          name: 'value',
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              readOnly: true
            },
            ...productOptionValueFields()
          ],
          preview: {
            select: {
              color: 'color.hex',
              image: 'image',
              value: 'value'
            },
            prepare(selection) {
              const { color, image, value } = selection

              let media = <SunIcon />
              if (color) {
                media = <ColorPreview color={color} />
              }
              if (image) {
                media = image
              }

              return {
                media,
                title: value
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      layout: 'layout',
      name: 'name'
    },
    prepare(selection) {
      const { layout, name } = selection

      const layoutTitle = LAYOUT_OPTIONS.find(v => v?.value === layout)?.title

      return {
        subtitle: layoutTitle,
        title: name
      }
    }
  }
}
