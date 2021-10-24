import { EnvelopeIcon } from '@sanity/icons'
import React from 'react'

export default {
  title: 'Email',
  name: 'annotationLinkEmail',
  type: 'object',
  blockEditor: {
    icon: () => <EnvelopeIcon strokeWidth="8" />,
  },
  fields: [
    // Email
    {
      title: 'Email',
      name: 'email',
      type: 'email',
    },
  ],
}
