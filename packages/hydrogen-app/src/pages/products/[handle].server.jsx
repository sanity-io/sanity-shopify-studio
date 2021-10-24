import groq from 'groq';
import React from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../../components/Layout.client';
import NotFound from '../../components/NotFound.server';
import ProductDetails from '../../components/ProductDetails.client';
import {SHOPIFY_PRODUCT} from '../../fragments/shopifyProduct';
import {useSanityQuery} from '../../utils/useSanityQuery';

export default function Product() {
  const {handle} = useParams();
  const {data} = useSanityQuery({
    key: ['product', handle],
    query: QUERY,
    slug: handle,
  });

  const page = data?.result;

  if (!page) {
    return <NotFound />;
  }

  return (
    <Layout>
      <ProductDetails page={page} />
    </Layout>
  );
}

const QUERY = groq`
  *[
    _type == 'shopify.product'
    && shopify.slug.current == $slug
  ][0]{
    ${SHOPIFY_PRODUCT}
  }
`;
