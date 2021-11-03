import { hues } from '@sanity/color'
import { DashboardWidget } from '@sanity/dashboard'
import { CogIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Label, Stack, Text } from '@sanity/ui'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import React from 'react'
import SyncItemAutomatic from './SyncItemAutomatic'
import SyncItemManual from './SyncItemManual'

TimeAgo.addDefaultLocale(en)

function Widget() {
  return (
    <DashboardWidget header="Shopify → Sanity Sync">
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
            <Box marginTop={5}>
              <Stack space={3}>
                <Text size={1}>
                  <a>
                    <CogIcon style={{ marginRight: '0.1em' }} />
                    Shopify admin
                  </a>
                </Text>
                <Text size={1}>
                  <a>
                    <CogIcon style={{ marginRight: '0.1em' }} />
                    Sync App settings
                  </a>
                </Text>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Manual sync */}
        <Box
          padding={4}
          style={{
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderColor: hues.gray[100].hex
          }}
        >
          <Stack space={4}>
            {/* Alert - no sync items */}
            {/*
            <Text size={1}>
              We haven't received any sync operations from your store. Please update a product or
              trigger a manual sync from your Shopify admin panel.
            </Text>
            */}

            <Text size={2} weight="semibold">
              Manual Sync
            </Text>
            {/* Items */}
            <SyncItemManual count={80} status="queued" />
            <SyncItemManual count={31} error="Example error message" status="failed" />
            <SyncItemManual count={27} status="completed" />
            <SyncItemManual count={12} status="completed" />
            <SyncItemManual count={1} status="completed" />

            <Button fontSize={1} text="Re-sync products" tone="primary" />
          </Stack>
        </Box>

        {/* Automatic sync */}
        <Box padding={4}>
          <Stack space={4}>
            <Text size={2} weight="semibold">
              Automatic Sync
            </Text>
            {/* Items */}
            <SyncItemAutomatic
              completedAt={new Date('2021-11-03T00:04:00')}
              status="completed"
              title="Product 1"
            />
            <SyncItemAutomatic
              completedAt={new Date('2021-11-02')}
              status="completed"
              title="Product 2"
            />
            <SyncItemAutomatic
              completedAt={new Date('2021-11-01')}
              error="Example error message"
              status="failed"
              title="Product 3"
            />
            <SyncItemAutomatic
              completedAt={new Date('2021-10-30')}
              status="completed"
              title="Product 4"
            />
            <SyncItemAutomatic
              completedAt={new Date('2021-10-29')}
              status="completed"
              title="Product 5"
            />
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
