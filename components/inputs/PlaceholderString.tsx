import {StringInputProps, useFormValue, SanityDocument} from 'sanity'
import get from 'lodash.get'

const PlaceholderStringInput = (props: StringInputProps) => {
  const {schemaType} = props

  const path = schemaType?.options?.field
  const doc = useFormValue([]) as SanityDocument

  const proxyValue = get(doc, path) as string

  return props.renderDefault({
    ...props,
    elementProps: {placeholder: proxyValue, ...props.elementProps},
  })
}

export default PlaceholderStringInput
