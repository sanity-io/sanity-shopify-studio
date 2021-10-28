import groq from 'groq';
import {useParams} from 'react-router-dom';

import Layout from '../../components/Layout.client';
import NotFound from '../../components/NotFound.server';
import ProductDetails from '../../components/ProductDetails.client';
import {PRODUCT} from '../../fragments/product';
import {useSanityGroqQuery} from '../../utils/query/useSanityGroqQuery';

export default function Product() {
  const {handle} = useParams();
  const {sanityData, errors, shopifyData} = useSanityGroqQuery({
    query: QUERY,
    params: {
      slug: handle,
    },
    apiVersion: 'v2021-06-07',
    projectId: 'wfr1r0dw',
    dataset: 'production',
  });

  const providerData = shopifyData?.[sanityData?._id];

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
