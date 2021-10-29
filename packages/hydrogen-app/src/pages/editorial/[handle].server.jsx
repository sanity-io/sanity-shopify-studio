import groq from 'groq';
import React from 'react';
import {useParams} from 'react-router-dom';

import Layout from '../../components/Layout.client';
import NotFound from '../../components/NotFound.server';
import PortableText from '../../components/PortableText.client';
import ProductsProvider from '../../contexts/ProductsProvider.client';
import {PORTABLE_TEXT} from '../../fragments/portableText';
import useSanityQuery from '../../utils/query/useSanityQuery';

export default function EditorialPage() {
  const {handle} = useParams();

  const {errors, sanityData, shopifyProducts} = useSanityQuery({
    query: QUERY,
    params: {
      slug: handle,
    },
  });

  if (!sanityData) {
    return <NotFound />;
  }

  return (
    <ProductsProvider value={shopifyProducts}>
      <Layout>
        <div className="max-w-3xl p-4">
          <h1>{sanityData.title}</h1>

          {/* Body */}
          {sanityData?.body && <PortableText blocks={sanityData.body} />}
        </div>
      </Layout>
    </ProductsProvider>
  );
}

const QUERY = groq`
  *[
    _type == 'article.editorial'
    && slug.current == $slug
  ][0]{
    ...,
    body[]{
      ${PORTABLE_TEXT}
    },
  }
`;
