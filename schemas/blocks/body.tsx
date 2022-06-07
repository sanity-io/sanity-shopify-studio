import React from 'react'

export default {
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    {
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      marks: {
        annotations: [
          // Product
          {
            name: 'annotationProduct',
            type: 'annotationProduct'
          },
          // Email
          {
            name: 'annotationLinkEmail',
            type: 'annotationLinkEmail'
          },
          // Internal link
          {
            name: 'annotationLinkInternal',
            type: 'annotationLinkInternal'
          },
          // URL
          {
            name: 'annotationLinkExternal',
            type: 'annotationLinkExternal'
          }
        ],
        decorators: [
          {
            title: 'Italic',
            value: 'em'
          },
          {
            title: 'Strong',
            value: 'strong'
          }
        ]
      },
      // Regular styles
      styles: [
        {
          blockEditor: {
            render: ({ children }) => (
              <div style={{ fontSize: '1.25rem', lineHeight: 1.25 }}>{children}</div>
            )
          },
          title: 'Heading',
          value: 'h2'
        }
      ],
      // Paragraphs
      type: 'block'
    },
    // Custom blocks
    {
      name: 'blockAccordion',
      type: 'module.accordion'
    },
    {
      name: 'blockCallout',
      type: 'module.callout'
    },
    {
      name: 'blockGrid',
      type: 'module.grid'
    },
    {
      name: 'blockImages',
      type: 'module.images'
    },
    {
      name: 'blockProducts',
      type: 'module.products'
    }
  ]
}
