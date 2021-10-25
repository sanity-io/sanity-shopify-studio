import groq from 'groq';
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

  const product = data?.result;

  if (!product) {
    return <NotFound />;
  }

  return (
    <Layout>
      <ProductDetails product={product} />
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
