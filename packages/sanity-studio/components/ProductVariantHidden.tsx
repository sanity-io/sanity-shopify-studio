import { SanityDocument } from '@sanity/client'
import { WarningOutlineIcon } from '@sanity/icons'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { withDocument } from 'part:@sanity/form-builder'
import React, { forwardRef } from 'react'

type Props = {
  document: SanityDocument
}

const ProductVariantHidden = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { document } = props

  return (
    <Card padding={4} radius={2} ref={ref} shadow={1} tone="critical">
      <Flex align="flex-start">
        <Text size={2}>
          <WarningOutlineIcon />
        </Text>
        <Box flex={1} marginLeft={3}>
          <Box>
            <Text size={2} weight="semibold">
              This variant is hidden
            </Text>
          </Box>
          <Stack marginTop={4} space={2}>
            <Text size={1}>It has been deleted from Shopify</Text>
          </Stack>
        </Box>
      </Flex>
    </Card>
  )
})

export default withDocument(ProductVariantHidden)
