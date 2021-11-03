import { hues } from '@sanity/color'
import { ErrorOutlineIcon } from '@sanity/icons'
import { Box, Flex, Label, Stack, Text, Tooltip } from '@sanity/ui'
import React from 'react'
import ReactTimeAgo from 'react-time-ago'

type Status = 'completed' | 'failed' | 'queued'
type Props = {
  completedAt: Date
  error?: string
  status: Status
  title: string
}

const labelColor: Record<Status, string> = {
  completed: hues.gray[700].hex,
  queued: hues.gray[400].hex,
  failed: hues.red[500].hex
}

const SyncItem = (props: Props) => {
  const { completedAt, error, status, title } = props

  return (
    <Flex align="center" marginTop={1}>
      <Box>
        <Stack space={2}>
          <Text size={1} weight="medium">
            <a href="#">{title}</a>
          </Text>
          <Text muted size={1}>
            {completedAt && <ReactTimeAgo date={completedAt} locale="en-US" />}
          </Text>
        </Stack>
      </Box>

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

export default SyncItem
