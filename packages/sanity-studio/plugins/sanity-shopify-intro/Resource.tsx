import React from 'react'
import { hues } from '@sanity/color'
import { Box, Card, Label, Text } from '@sanity/ui'
import { PlayIcon } from '@sanity/icons'
import styled from 'styled-components'

type Props = {
  byline: string
  href: string
  posterUrl: string
  title: string
  type: 'guide' | 'screencast'
}

const Container = styled(Card)`
  background: ${hues.gray[100].hex};
  padding-bottom: calc(9 / 16 * 100%);
  position: relative;
  width: 100%;
`

const IconContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:before {
    background: ${({ theme }) => theme.sanity.color.card.enabled.bg};
    border-radius: 50%;
    content: '';
    height: 3.25em;
    opacity: 0.9;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3.25em;
  }
`

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
`

const Resource = (props: Props) => {
  const { byline, href, posterUrl, title, type } = props
  return (
    <Card as="a" href={href} rel="noopener noreferrer" padding={4} target="_blank">
      <Container overflow="hidden" radius={1}>
        {posterUrl && <Poster src={posterUrl} />}
        {type === 'screencast' && (
          <IconContainer>
            <Text align="center" size={3}>
              <PlayIcon />
            </Text>
          </IconContainer>
        )}
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
