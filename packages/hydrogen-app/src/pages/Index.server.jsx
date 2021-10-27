import groq from 'groq';
import React from 'react';

import Gallery from '../components/Gallery.client';
import Layout from '../components/Layout.client';
import ProductCard from '../components/ProductCard.client';
import {IMAGE} from '../fragments/image';
import {SHOPIFY_PRODUCT} from '../fragments/shopifyProduct';
import {useSanityGroqQuery} from '../utils/query/useSanityGroqQuery';

export default function Index() {
  const {sanityData, shopifyData} = useSanityGroqQuery({
    query: QUERY,
    apiVersion: 'v2021-06-07',
    projectId: 'wfr1r0dw',
    dataset: 'production',
  });

  return (
    <Layout>
      <div className="bg-black-300 relative w-full">
        {/* Gallery */}
        {sanityData?.gallery && <Gallery images={sanityData?.gallery} />}

        {/* Featured products */}
        <section
          className="
            gap-10
            grid
            grid-cols-3
            flex
            flex-col
            flex-col-reverse
            my-8
            p-4
          "
        >
          {sanityData?.featuredProducts?.map((product) => {
            return (
              <div key={product?._id}>
                <ProductCard product={product} shopifyData={shopifyData} />
              </div>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}

const QUERY = groq`
  *[_id == 'home'][0]{
    featuredProducts[]->{
      ...,
      ${SHOPIFY_PRODUCT}
    },
    gallery[] {
      ${IMAGE}
    },
  } {
    ...,
    featuredProducts[available]
  }
`;
