import { hues } from '@sanity/color'
import { DashboardWidget } from '@sanity/dashboard'
import { CogIcon } from '@sanity/icons'
import { Box, Card, Flex, Label, Stack, Text } from '@sanity/ui'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import sanityClient from 'part:@sanity/base/client'
import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { SANITY_API_VERSION } from '../../constants'
import SyncItem from './SyncItem'

TimeAgo.addDefaultLocale(en)

const SAMPLE_PAYLOAD = [
  {
    completedAt: '2021-11-03T00:04:00',
    documentId: 'shopifyProduct-6636208390231',
    status: 'completed'
  },
  {
    completedAt: '2021-11-02T00:04:00',
    documentId: 'shopifyProduct-6636208914519',
    error: 'An error has occurred',
    status: 'failed'
  },
  {
    completedAt: '2021-11-01T00:04:00',
    documentId: 'shopifyProduct-6636040683607',
    status: 'completed'
  }
]

function Widget() {
  const [products, setProducts] = useState([])
  const [productsLoaded, setProductsLoaded] = useState(false)

  // TODO: add sanity document listener once `sanity.shopify.sync` is ready for use

  useEffect(() => {
    async function fetchProducts() {
      const products = await sanityClient
        .withConfig({ apiVersion: SANITY_API_VERSION })
        .fetch(`*[_id in $ids]`, { ids: SAMPLE_PAYLOAD.map(v => v.documentId) })

      setProducts(products)
      setProductsLoaded(true)
    }

    fetchProducts()
  }, [])

  return (
    <DashboardWidget header="Shopify Connect">
      <Card>
        {/* Shopify details */}
        <Box
          flex={1}
          padding={4}
          style={{
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderColor: hues.gray[100].hex
          }}
        >
          {/* Shopify */}
          <Box>
            <Stack space={4}>
              <Label muted size={1}>
                Shopify details
              </Label>
              <Flex>
                <Box flex={1}>
                  <Text size={1} weight="medium">
                    Store ID
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text align="right" size={1}>
                    sanity-dev-store
                  </Text>
                </Box>
              </Flex>
            </Stack>
          </Box>
        </Box>

        <Box
          padding={4}
          style={{
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderColor: hues.gray[100].hex
          }}
        >
          <Stack space={4}>
            <Text size={2} weight="semibold">
              Product updates from Shopify
            </Text>
            <Box>
              {/* Sync items */}
              {productsLoaded &&
                SAMPLE_PAYLOAD.map(payload => {
                  const product = products.find(product => product._id === payload.documentId)
                  if (!product) {
                    // TODO: account for scenarios where existing products cannot be found
                    return null
                  }
                  return (
                    <SyncItem
                      completedAt={new Date(payload.completedAt)}
                      documentId={payload.documentId}
                      key={product._id}
                      imageUrl={product?.store?.previewImageUrl}
                      product={product}
                      status={payload.status}
                      title={product?.store?.title}
                    />
                  )
                })}
            </Box>
          </Stack>
          <Box marginTop={5}>
            <Stack space={3}>
              <Text muted size={1}>
                Last manual sync: <ReactTimeAgo date={new Date('2021-10-30')} locale="en-US" />
              </Text>
            </Stack>
          </Box>
        </Box>

        {/* Additional actions */}
        <Box padding={4}>
          <Stack space={3}>
            <Text size={1}>
              <a href="#">
                <CogIcon style={{ marginRight: '0.1em' }} />
                View full log
              </a>
            </Text>
            <Text size={1}>
              <a href="#">
                <CogIcon style={{ marginRight: '0.1em' }} />
                Sync App settings
              </a>
            </Text>
          </Stack>
        </Box>
      </Card>
    </DashboardWidget>
  )
}

export default {
  name: 'sanity-shopify-sync',
  component: Widget
}
