import React from 'react'
import { IntentLink } from '@sanity/base/router'
import { CogIcon } from '@sanity/icons'

export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  // TODO: clean this up further with sanity-ui?
  description: (
    <>
      Empty fields will fallback to global values defined in{' '}
      <IntentLink intent="edit" params={{ id: 'settings' }} style={{ marginLeft: '0.2em' }}>
        <CogIcon />
        <span style={{ marginLeft: '0.3em' }}>Settings</span>
      </IntentLink>
    </>
  ),
  options: {
    collapsed: false,
    collapsible: true
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => [Rule.max(50).warning('Longer titles may be truncated by search engines')]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      rows: 2,
      validation: Rule =>
        Rule.max(150).warning('Longer descriptions may be truncated by search engines')
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Used for both search engine results and social cards.'
    }
  ]
}
