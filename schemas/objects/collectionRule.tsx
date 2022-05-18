import { FilterIcon } from '@sanity/icons'

export default {
  title: 'Collection rule',
  name: 'collectionRule',
  type: 'object',
  icon: FilterIcon,
  readOnly: true,
  fields: [
    // Column
    {
      title: 'Column',
      name: 'column',
      type: 'string'
    },
    // Values
    {
      title: 'Relation',
      name: 'relation',
      type: 'string'
    },
    // Condition
    {
      title: 'Condition',
      name: 'condition',
      type: 'string'
    }
  ],
  preview: {
    select: {
      condition: 'condition',
      name: 'column',
      relation: 'relation'
    },
    prepare(selection) {
      const { condition, name, relation } = selection

      return {
        subtitle: `${relation} ${condition}`,
        title: name
      }
    }
  }
}
