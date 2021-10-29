import groq from 'groq';
import {useParams} from 'react-router-dom';

import Layout from '../../components/Layout.client';
import NotFound from '../../components/NotFound.server';
import ProductDetails from '../../components/ProductDetails.client';
import {PRODUCT} from '../../fragments/product';
import useSanityQuery from '../../utils/query/useSanityQuery';

export default function Product() {
  const {handle} = useParams();
  const {sanityData, errors, shopifyProducts} = useSanityQuery({
    query: QUERY,
    params: {
      slug: handle,
    },
  });

  const providerData = shopifyProducts?.[sanityData?._id];

  if (!sanityData || !providerData) {
    return <NotFound />;
  }

  return (
    <Layout>
      <ProductDetails product={sanityData} providerData={providerData} />
    </Layout>
  );
}

const QUERY = groq`
  *[
    _type == 'product'
    && store.slug.current == $slug
  ][0]{
    ${PRODUCT}
  }
`;
