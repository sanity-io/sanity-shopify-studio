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
          // Product (marginalia)
          {
            name: 'annotationProductMarginalia',
            type: 'annotationProductMarginalia'
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
      // Inline blocks
      of: [{ type: 'blockInlineProduct' }],
      styles: [{ title: 'Quote', value: 'blockquote' }],
      type: 'block'
    },
    // Custom blocks
    {
      name: 'blockImage',
      title: 'Image',
      type: 'blockImage'
    },
    {
      name: 'blockProduct',
      title: 'Product',
      type: 'blockProduct'
    }
  ]
}
