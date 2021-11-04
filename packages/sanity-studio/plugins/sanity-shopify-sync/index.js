import { useRouter } from '@sanity/base/router'
import { hues } from '@sanity/color'
import { DashboardWidget } from '@sanity/dashboard'
import { LaunchIcon, MasterDetailIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Label, Stack, Text } from '@sanity/ui'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import sanityClient from 'part:@sanity/base/client'
import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { SANITY_API_VERSION } from '../../constants'
import SyncItem from './SyncItem'

TimeAgo.addDefaultLocale(en)

const SAMPLE_PAYLOAD = {
  store: {
    id: 'sanity-dev-store'
  },
  productSync: [
    {
      completedAt: '2021-11-03T00:04:00',
      documentId: 'shopifyProduct-6639629926487',
      status: 'completed'
    },
    {
      completedAt: '2021-11-02T00:04:00',
      documentId: 'shopifyProduct-6639506456663',
      error: 'An error has occurred',
      status: 'failed'
    },
    {
      completedAt: '2021-11-01T00:04:00',
      documentId: 'shopifyProduct-6639530049623',
      status: 'completed'
    }
  ]
}

const clientConfig = sanityClient.config()

const getManageUrl = () => {}

function Widget() {
  const [products, setProducts] = useState([])
  const [productsLoaded, setProductsLoaded] = useState(false)

  const router = useRouter()

  // TODO: add sanity document listener once `sanity.shopify.sync` is ready for use

  useEffect(() => {
    async function fetchProducts() {
      const products = await sanityClient
        .withConfig({ apiVersion: SANITY_API_VERSION })
        .fetch(`*[_id in $ids]`, { ids: SAMPLE_PAYLOAD?.productSync.map(v => v.documentId) })

      setProducts(products)
      setProductsLoaded(true)
    }

    fetchProducts()
  }, [])

  const Divider = () => {
    return (
      <Box
        style={{
          background: hues.gray[200].hex,
          height: '1px',
          width: '100%'
        }}
      />
    )
  }

  return (
    <DashboardWidget header="Shopify Connect">
      <Card padding={4}>
        <Stack space={4}>
          {/* Shopify project */}
          <Box flex={1}>
            <Stack space={3}>
              <Label muted size={1}>
                Shopify store
              </Label>
              <Flex>
                <Box flex={1}>
                  <Text size={1} weight="medium">
                    store ID
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text align="right" muted size={1}>
                    {SAMPLE_PAYLOAD.store?.id}
                  </Text>
                </Box>
              </Flex>
            </Stack>
            <Box href marginTop={4}>
              <Button
                as="a"
                // TODO: resolve non-boolean href warnings
                href={`https://${SAMPLE_PAYLOAD.store?.id}.myshopify.com/admin`}
                rel="noopener noreferrer"
                target="_blank"
                text="Go to Shopify store"
                tone="primary"
              />
            </Box>
          </Box>

          <Divider />

          {/* Sanity project */}
          <Box>
            <Stack space={3}>
              <Label muted size={1}>
                Sanity project
              </Label>
              <Flex>
                <Box flex={1}>
                  <Text size={1} weight="medium">
                    project ID
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text align="right" muted size={1}>
                    {clientConfig.projectId}
                  </Text>
                </Box>
              </Flex>
              <Flex>
                <Box flex={1}>
                  <Text size={1} weight="medium">
                    dataset
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text align="right" muted size={1}>
                    {clientConfig.dataset}
                  </Text>
                </Box>
              </Flex>
            </Stack>
            <Box marginTop={5}>
              <Text size={1} weight="medium">
                <a
                  href={`https://manage.sanity.io/projects/${clientConfig.projectId}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LaunchIcon style={{ marginRight: '0.1em' }} />
                  Manage Sanity project
                </a>
              </Text>
            </Box>
          </Box>

          <Divider />

          {/* Recently synced products */}
          <Box>
            <Stack space={3}>
              <Label muted size={1}>
                Recently synced products
              </Label>
              <Box>
                {/* Sync items */}
                {productsLoaded &&
                  SAMPLE_PAYLOAD?.productSync.map(payload => {
                    const product = products.find(product => product._id === payload.documentId)
                    if (!product) {
                      // TODO: account for scenarios where existing products cannot be found
                      return null
                    }
                    return (
                      <SyncItem
                        completedAt={new Date(payload.completedAt)}
                        documentId={payload.documentId}
                        error={payload.error}
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
          <Box marginTop={2}>
            <Text size={1} weight="medium">
              <a
                href="#"
                onClick={() => {
                  // Navigate to products root
                  router.navigateUrl('/desk/products')
                }}
              >
                <MasterDetailIcon style={{ marginRight: '0.1em' }} />
                Show all products
              </a>
            </Text>
          </Box>
        </Stack>
      </Card>
    </DashboardWidget>
  )
}

export default {
  name: 'sanity-shopify-sync',
  component: Widget
}
