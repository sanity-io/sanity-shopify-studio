import { hues } from '@sanity/color'
import { ErrorOutlineIcon } from '@sanity/icons'
import { Box, Flex, Label, Stack, Text, Tooltip } from '@sanity/ui'
import pluralize from 'pluralize'
import React from 'react'
import ReactTimeAgo from 'react-time-ago'

type Status = 'completed' | 'failed' | 'queued'
type Props = {
  count: number
  error?: string
  status: Status
}

const labelColor: Record<Status, string> = {
  completed: hues.gray[700].hex,
  queued: hues.gray[400].hex,
  failed: hues.red[500].hex
}

const SyncItemManual = (props: Props) => {
  const { count, error, status } = props

  return (
    <Flex align="center" marginTop={1}>
      <Flex align="center">
        <Stack space={2}>
          <Text muted size={1} weight="medium">
            {pluralize('product', count, true)}
          </Text>
          <Text muted size={1}>
            <ReactTimeAgo date={new Date('2020-01-01')} locale="en-US" /> (1m 15s)
          </Text>
        </Stack>
      </Flex>

      <Flex align="center" style={{ marginLeft: 'auto' }}>
        <Label
          size={0}
          style={{
            color: labelColor[status]
          }}
        >
          {status}
        </Label>
        {error && (
          <Tooltip
            content={
              <Box padding={2}>
                <Text muted size={1}>
                  {error}
                </Text>
              </Box>
            }
            portal
          >
            <Box marginLeft={3}>
              <Text size={1} style={{ color: hues.red[500].hex }}>
                <ErrorOutlineIcon />
              </Text>
            </Box>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  )
}

export default SyncItemManual
