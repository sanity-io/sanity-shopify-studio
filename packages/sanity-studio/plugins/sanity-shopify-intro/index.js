import { DashboardWidget } from '@sanity/dashboard'
import { BookIcon, EarthGlobeIcon, HomeIcon, LaunchIcon } from '@sanity/icons'
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
    <DashboardWidget header={displayName ? `Welcome, ${displayName}!` : `Welcome!`}>
      <Card>
        <ElementQuery>
          <Container>
            <Box flex={1} padding={[4, null, 5]}>
              <Stack space={4}>
                <img
                  src="https://cdn.sanity.io/images/3do82whm/next/5d5de9a040f233d3daf280505894b5b7eb271899-1600x800.png"
                  style={{ width: '100%' }}
                />
                <Text>
                  <strong style={{ fontWeight: 600 }}>
                    Sanity Studio is built from the ground up with customization in mind.
                  </strong>{' '}
                  You can extend and personalize the studio with your own styling, custom input
                  components, custom previews and leverage our powerful plugin system.
                </Text>
                <Text>
                  Not happy with how Sanity looks? Need to provide styles for a custom component or
                  just change a couple of brand colors? More introductory copy to add here!
                </Text>
              </Stack>
              {/* Links */}
              <Box marginTop={5}>
                <Stack space={3}>
                  <Text size={1}>
                    <a href="https://www.sanity.io" target="_blank" rel="noreferrer">
                      <BookIcon style={{ marginRight: '0.1em' }} />
                      Reference docs
                    </a>
                  </Text>
                  <Text size={1}>
                    <a href="https://www.sanity.io" target="_blank" rel="noreferrer">
                      <EarthGlobeIcon style={{ marginRight: '0.1em' }} />
                      Built with Sanity
                    </a>
                  </Text>
                  <Text size={1}>
                    <a href="https://www.sanity.io" target="_blank" rel="noreferrer">
                      <HomeIcon style={{ marginRight: '0.1em' }} />
                      Sanity Community
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
                <Box padding={4}>
                  <Text size={1}>
                    <a href="https://www.sanity.io" target="_blank" rel="noreferrer">
                      <LaunchIcon style={{ marginRight: '0.1em' }} />
                      View more resources at sanity.io/docs
                    </a>
                  </Text>
                </Box>
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
