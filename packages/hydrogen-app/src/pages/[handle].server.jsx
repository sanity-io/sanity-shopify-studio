import groq from 'groq';
import React from 'react';
import {useParams} from 'react-router-dom';

import Layout from '../components/Layout.client';
import NotFound from '../components/NotFound.server';
import PortableText from '../components/PortableText.client';
import {PORTABLE_TEXT} from '../fragments/portableText';
import useSanityQuery from '../utils/query/useSanityQuery';

export default function Page() {
  const {handle} = useParams();

  const {sanityData} = useSanityQuery({
    query: QUERY,
    params: {
      slug: handle,
    },
    // No need to query Shopify product data ✨
    getProductGraphQLFragment: () => false,
  });

  if (!sanityData) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="max-w-3xl p-4">
        <h1>{sanityData.title}</h1>
        <br />

        {/* Body */}
        {sanityData?.body && <PortableText blocks={sanityData.body} />}
      </div>
    </Layout>
  );
}

const QUERY = groq`
  *[
    _type == 'page'
    && slug.current == $slug
  ][0]{
    ...,
    body[]{
      ${PORTABLE_TEXT}
    },
  }
`;
