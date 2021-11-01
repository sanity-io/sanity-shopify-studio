import { EnvelopeIcon } from '@sanity/icons'
import React from 'react'

export default {
  title: 'Email',
  name: 'annotationLinkEmail',
  type: 'object',
  blockEditor: {
    icon: () => <EnvelopeIcon />,
    render: ({ children }) => (
      <span>
        {children}
        <EnvelopeIcon style={{ marginLeft: '0.2em', verticalAlign: 'text-bottom' }} />
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
