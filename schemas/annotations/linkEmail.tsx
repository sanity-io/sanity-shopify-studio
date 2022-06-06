/**
 * Annotations are ways of marking up text in the block content editor.
 *
 * Read more: https://www.sanity.io/docs/customization#f924645007e1
 */
import { EnvelopeIcon } from '@sanity/icons'
import React from 'react'

export default {
  title: 'Email link',
  name: 'annotationLinkEmail',
  type: 'object',
  blockEditor: {
    icon: () => <EnvelopeIcon />,
    render: ({ children }) => (
      <span>
        <EnvelopeIcon
          style={{
            marginLeft: '0.05em',
            marginRight: '0.1em',
            width: '0.75em'
          }}
        />
        {children}
      </span>
    )
  },
  fields: [
    // Email
    {
      title: 'Email',
      name: 'email',
      type: 'email'
    }
  ]
}
