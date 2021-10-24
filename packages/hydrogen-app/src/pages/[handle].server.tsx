import groq from 'groq';
import React from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout.client';
import NotFound from '../components/NotFound.server';
import PortableText from '../components/PortableText.client';
import {PORTABLE_TEXT} from '../fragments/portableText';
import {useSanityQuery} from '../utils/useSanityQuery';

export default function Page() {
  const {handle} = useParams();

  const {data} = useSanityQuery({
    key: ['page', handle],
    query: QUERY,
    slug: handle,
  });

  const page = data?.result;

  if (!page) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="max-w-3xl p-4">
        <h1>{page.title}</h1>
        <br />

        {/* Body */}
        {page?.body && <PortableText blocks={page.body} />}
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
