import { withDocument } from 'part:@sanity/form-builder'
import { FormField } from '@sanity/base/components'
import { LockIcon } from '@sanity/icons'
import { Box, Text, TextInput, Tooltip } from '@sanity/ui'
import get from 'lodash.get'
import React, { forwardRef } from 'react'
// import { SanityDocument } from '@sanity/client'

// TODO: type correctly
type Props = any

const ProxyString = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    compareValue, // Value to check for "edited" functionality
    document,
    markers,
    onFocus,
    onBlur,
    placeholder,
    presence,
    type
  } = props

  const path = type?.options?.field
  const proxyValue = get(document, type?.options?.field)
  console.log('type?.options', type?.options)
  console.log('proxyValue', proxyValue)

  return (
    <FormField
      compareValue={compareValue}
      description={type?.description}
      markers={markers}
      presence={presence}
      title={type?.title}
    >
      <Tooltip
        content={
          <Box padding={2}>
            <Text muted size={1}>
              This value can be changed in Shopify (<code>{path}</code>)
            </Text>
          </Box>
        }
        // fallbackPlacements={['right', 'left']}
        // placement="top"
        portal
      >
        <TextInput
          iconRight={LockIcon}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={true}
          ref={ref}
          value={proxyValue}
        />
      </Tooltip>
    </FormField>
  )
})

export default withDocument(ProxyString)
