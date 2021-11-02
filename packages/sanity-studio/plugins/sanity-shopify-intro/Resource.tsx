import React from 'react'
import { hues } from '@sanity/color'
import { Box, Card, Label, Text } from '@sanity/ui'
import styled from 'styled-components'

type Props = {
  byline: string
  title: string
  type: string
}

const Container = styled(Card)`
  background: ${hues.gray[100].hex};
  padding-bottom: calc(9 / 16 * 100%);
  position: relative;
  width: 100%;
`

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;

  &:not([src]) {
    display: none;
  }
`

const Resource = (props: Props) => {
  const { byline, title, type } = props
  return (
    <Card>
      <Container radius={2}>
        <Poster />
      </Container>

      <Box marginTop={3}>
        <Text as="h3" size={2} weight="semibold">
          {title}
        </Text>
      </Box>
      <Box marginTop={3}>
        <Text muted size={1}>
          {byline}
        </Text>
      </Box>
      <Box marginTop={4}>
        <Label muted size={0}>
          {type}
        </Label>
      </Box>
    </Card>
  )
}

export default Resource
