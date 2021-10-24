// Usual restrictions of conditional fields apply
export const PRODUCT_OPTION_VALUE_FIELDS = [
  {
    name: 'color',
    title: 'Color',
    type: 'color',
  },
  {
    name: 'image',
    title: 'Image',
    type: 'image',
  },
  {
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 2,
  },
]

export const productOptionValueFields = () => {
  return PRODUCT_OPTION_VALUE_FIELDS.map(field => ({
    ...field,
    hidden: ({ document, parent }) => {
      // Find product option fields defined in parent scope
      let parentProductOptionFields
      for (let option of document?.options) {
        const index = option?.values.findIndex(
          value => value._key === parent._key
        )
        if (index >= 0) {
          parentProductOptionFields = option?.productOptionFields
          break
        }
      }

      return !parentProductOptionFields?.includes(field.name)
    },
  }))
}

export const productOptionValueFieldList = () => {
  return PRODUCT_OPTION_VALUE_FIELDS.map(v => ({
    title: v.title,
    value: v.name,
  }))
}
