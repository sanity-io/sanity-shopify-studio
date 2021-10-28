import { withDocument } from 'part:@sanity/form-builder'
import React, { forwardRef } from 'react'
import { WarningOutlineIcon } from '@sanity/icons'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { SanityDocument } from '@sanity/client'
import { getShopifyProductUrl } from '../utils/getShopifyProductUrl'

type Props = {
  document: SanityDocument
}

const ShopifyStatus = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { document } = props

  // TODO: add helper
  const isActive = document?.store?.status === 'active'
  const isDeleted = document?.store?.isDeleted
  const isEnabled = document?.store?.isEnabled

  let shopifyProductUrl
  let title
  if (document._type === 'product') {
    title = 'This product is hidden!'
    shopifyProductUrl = getShopifyProductUrl(document?.store?.id)
  }
  if (document._type === 'productVariant') {
    title = `This variant's product is hidden!`
    shopifyProductUrl = getShopifyProductUrl(document?.store?.productId)
  }

  let message
  if (!isEnabled) {
    message = 'It is not enabled on the current sales channel in Shopify.'
  }
  if (!isActive) {
    message = (
      <>
        It does not have an <code>active</code> status in Shopify.
      </>
    )
  }
  if (isDeleted) {
    message = 'It has been deleted from Shopify.'
  }

  return (
    <Card padding={4} radius={2} ref={ref} shadow={1} tone="critical">
      <Flex align="flex-start">
        <Text size={2}>
          <WarningOutlineIcon />
        </Text>
        <Box flex={1} marginLeft={3}>
          <Box>
            <Text size={2} weight="semibold">
              {title}
            </Text>
          </Box>
          <Stack marginTop={4} space={2}>
            <Text size={1}>{message}</Text>
          </Stack>
          {!isDeleted && shopifyProductUrl && (
            <Box marginTop={4}>
              <Text size={1}>
                →{' '}
                <a href={shopifyProductUrl} target="_blank">
                  View this product on Shopify
                </a>
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Card>
  )
})

export default withDocument(ShopifyStatus)
