import {LockIcon} from '@sanity/icons'
import {Box, Text, TextInput, Tooltip} from '@sanity/ui'
import {StringInputProps, useFormValue, SanityDocument} from 'sanity'
import get from 'lodash.get'

const ProxyString = (props: StringInputProps) => {
  const {schemaType} = props

  const path = schemaType?.options?.field
  const doc = useFormValue([]) as SanityDocument

  const proxyValue = get(doc, path) as string

  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Text muted size={1}>
            This value is set in Shopify (<code>{path}</code>)
          </Text>
        </Box>
      }
      portal
    >
      <TextInput iconRight={LockIcon} readOnly={true} value={proxyValue} />
    </Tooltip>
  )
}

export default ProxyString
