import { withDocument } from 'part:@sanity/form-builder'
import React, { forwardRef } from 'react'
import { WarningOutlineIcon } from '@sanity/icons'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { SanityDocument } from '@sanity/client'
import {
  SHOPIFY_PRODUCT_DOCUMENT_TYPE,
  SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE,
} from '../constants'
import { getShopifyProductUrl } from '../utils/getShopifyProductUrl'

type Props = {
  document: SanityDocument
}

const ShopifyStatus = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { document } = props

  // TODO: add helper
  const isActive = document?.shopify?.status === 'active'
  const isDeleted = document?.shopify?.isDeleted
  const isEnabled = document?.shopify?.isEnabled

  let shopifyProductUrl
  let title
  if (document._type === SHOPIFY_PRODUCT_DOCUMENT_TYPE) {
    title = 'This product is not yet available for purchase'
    shopifyProductUrl = getShopifyProductUrl(document?.shopify?.id)
  }
  if (document._type === SHOPIFY_PRODUCT_VARIANT_DOCUMENT_TYPE) {
    title = `This variant's product is not yet available for purchase`
    shopifyProductUrl = getShopifyProductUrl(document?.shopify?.productId)
  }

  let messages = []
  if (!isEnabled) {
    messages.push(
      <>It is not enabled on the current sales channel in Shopify</>
    )
  }
  if (!isActive) {
    messages.push(
      <>
        It does not have an <code>active</code> status in Shopify
      </>
    )
  }

  return (
    <Card padding={4} radius={2} ref={ref} shadow={1} tone="critical">
      {isDeleted && (
        <Flex align="center">
          <Text size={2}>
            <WarningOutlineIcon />
          </Text>
          <Box flex={1} marginLeft={3}>
            <Text size={1} weight="semibold">
              This product has been deleted from Shopify and is no longer
              available for purchase
            </Text>
          </Box>
        </Flex>
      )}

      {!isDeleted && (
        <Flex align="flex-start">
          <Text size={2}>
            <WarningOutlineIcon />
          </Text>
          <Box flex={1} marginLeft={3}>
            <Box>
              <Text size={1} weight="semibold">
                {title}
              </Text>
            </Box>
            <Stack marginTop={4} space={2}>
              {messages?.map((message, index) => (
                <Card
                  key={index}
                  padding={3}
                  radius={2}
                  shadow={1}
                  tone="inherit"
                >
                  <Text size={1}>{message}</Text>
                </Card>
              ))}
            </Stack>
            {shopifyProductUrl && (
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
      )}
    </Card>
  )
})

export default withDocument(ShopifyStatus)
