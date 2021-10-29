import {DefaultRoutes} from '@shopify/hydrogen';
import groq from 'groq';
import {Suspense} from 'react';
import {Switch} from 'react-router-dom';

import NavigationProvider from '../contexts/NavigationProvider.client';
import {LINKS} from '../fragments/links';
import {PORTABLE_TEXT} from '../fragments/portableText';
import useSanityQuery from '../utils/query/useSanityQuery';

import DefaultSeo from './DefaultSeo.server';
import NotFound from './NotFound.server';

export default function Main(props) {
  const {pages, serverState} = props;

  const {sanityData} = useSanityQuery({
    query: QUERY,
    // No need to query Shopify product data ✨
    getProductGraphQLFragment: () => false,
  });

  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <DefaultSeo />
      <NavigationProvider value={sanityData}>
        <Switch>
          <DefaultRoutes
            pages={pages}
            serverState={serverState}
            fallback={<NotFound />}
          />
        </Switch>
      </NavigationProvider>
    </Suspense>
  );
}

const QUERY = groq`
  *[_type == 'navigation'][0] {
    footer {
      links[] {
        ${LINKS}
      },
      text[]{
        ${PORTABLE_TEXT}
      },
    },
  }
`;
