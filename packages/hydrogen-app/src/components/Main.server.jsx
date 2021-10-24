import {DefaultRoutes} from '@shopify/hydrogen';
import groq from 'groq';
import {Suspense} from 'react';
import {Switch} from 'react-router-dom';
import DefaultSeo from '../components/DefaultSeo.server';
import NotFound from '../components/NotFound.server';
import NavigationProvider from '../contexts/NavigationProvider.client';
import {LINKS} from '../fragments/links';
import {PORTABLE_TEXT} from '../fragments/portableText';
import {useSanityQuery} from '../utils/useSanityQuery';

export default function Main(props) {
  const {pages, serverState} = props;

  const {data} = useSanityQuery({
    key: ['navigation'],
    query: QUERY,
  });

  const results = data?.result;

  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <DefaultSeo />
      <NavigationProvider value={results}>
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
