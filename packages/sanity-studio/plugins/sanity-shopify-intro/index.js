import { DashboardWidget } from '@sanity/dashboard'
import { BookIcon, CommentIcon, HomeIcon, LaunchIcon, RocketIcon } from '@sanity/icons'
import { Box, Card, ElementQuery, Flex, Stack, Text } from '@sanity/ui'
import userStore from 'part:@sanity/base/user'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Resource from './Resource'

const Container = styled(Flex)`
  flex-direction: column;

  [data-eq-min~='0'] > & {
  }

  [data-eq-min~='1'] > & {
    flex-direction: row;
  }
`

function Widget() {
  const [displayName, setDisplayName] = useState()

  useEffect(() => {
    async function getUser() {
      const { displayName } = await userStore.getUser('me')
      setDisplayName(displayName)
    }

    getUser()
  }, [])
  return (
    <DashboardWidget header={displayName ? `Hello, ${displayName}!` : `Welcome!`}>
      <Card>
        <ElementQuery>
          <Container>
            <Box flex={1} padding={[4, null, 5]}>
              <Stack space={4}>
                <img
                  src="https://cdn.sanity.io/images/3do82whm/next/2c15d260780e68fbf7db19d5580b011f266fc839-1982x1228.png?w=1200"
                  style={{ width: '100%' }}
                />
                <Text>
                  We’re excited for you to use Sanity and Shopify together to build vibrant shopping
                  experiences.
                </Text>
                <Text>
                  This dashboard is where you’ll get an overview of your products, your project
                  details, and access to educational material that will help ensure you get maximum
                  value out of Sanity.
                </Text>
                <Text>
                  Please explore the resources available to you here, and we encourage you to join
                  the Slack community and post any questions you may have.
                </Text>
              </Stack>
              {/* Links */}
              <Box marginTop={6}>
                <Stack space={4}>
                  <Text size={1} weight="medium">
                    <a
                      href="https://www.sanity.io/docs/getting-started"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <RocketIcon style={{ marginRight: '0.1em' }} />
                      Documentation
                    </a>
                  </Text>
                  <Text size={1} weight="medium">
                    <a href="https://www.sanity.io/docs/reference" target="_blank" rel="noreferrer">
                      <BookIcon style={{ marginRight: '0.1em' }} />
                      Reference docs
                    </a>
                  </Text>
                  <Text size={1} weight="medium">
                    <a href="https://slack.sanity.io/" target="_blank" rel="noreferrer">
                      <CommentIcon style={{ marginRight: '0.1em' }} />
                      Support community
                    </a>
                  </Text>
                </Stack>
              </Box>
            </Box>
            <Box flex={1} padding={[0, null, 4]}>
              <Stack>
                <Resource
                  byline="Knut Melvær, head of developer relations"
                  href="https://www.sanity.io"
                  posterUrl="https://i.imgur.com/nZm7o1a.png"
                  title="Getting started with Shopify and Sanity"
                  type="screencast"
                />
                <Resource
                  byline="Even Westvang, Co-founder"
                  href="https://www.sanity.io"
                  posterUrl="https://cdn.sanity.io/images/81pocpw8/production/c62d3f4f17ad1ef3d9be3d89648fde68f8d88d91-1200x900.png?rect=0,75,1200,750&w=600"
                  title="Structure Sanity Studio to Your Heart’s Content!"
                  type="guide"
                />
              </Stack>
            </Box>
          </Container>
        </ElementQuery>
      </Card>
    </DashboardWidget>
  )
}

export default {
  name: 'sanity-shopify-intro',
  component: Widget
}
