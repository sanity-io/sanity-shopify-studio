import { hues } from '@sanity/color'
import { ErrorOutlineIcon } from '@sanity/icons'
import { IntentLink } from '@sanity/state-router/components'
import { Box, Card, Flex, Label, Stack, Text, Tooltip } from '@sanity/ui'
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import styled from 'styled-components'

type Status = 'completed' | 'failed' | 'queued'
type Props = {
  completedAt: Date
  documentId?: string
  error?: string
  imageUrl?: string
  status: Status
  title: string
}

const labelColor: Record<Status, string> = {
  completed: hues.green[500].hex,
  queued: hues.gray[400].hex,
  failed: hues.red[500].hex
}

const PreviewImage = styled.img`
  background: ${hues.gray[100].hex};
  border-radius: 2px;
  height: 2.5em;
  object-fit: cover;
  width: 2.5em;
`

const SyncItem = (props: Props) => {
  const { completedAt, documentId, error, imageUrl, status, title } = props

  return (
    <IntentLink as="a" intent="edit" params={{ id: documentId }} style={{ textDecoration: 'none' }}>
      <Card paddingY={2}>
        <Flex align="center">
          <Flex align="center">
            {/* Image */}
            <PreviewImage src={imageUrl} />

            <Box marginLeft={3}>
              <Stack space={2}>
                <Text size={2} textOverflow="ellipsis">
                  {title}
                </Text>
                <Text muted size={1}>
                  {completedAt && <ReactTimeAgo date={completedAt} locale="en-US" />}
                </Text>
              </Stack>
            </Box>
          </Flex>

          <Flex
            align="center"
            justify="flex-end"
            style={{ flexShrink: 0, marginLeft: 'auto', width: '6em' }}
          >
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
      </Card>
    </IntentLink>
  )
}

export default SyncItem
