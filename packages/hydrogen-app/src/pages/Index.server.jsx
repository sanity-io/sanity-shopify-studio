import groq from 'groq';
import React from 'react';

import Gallery from '../components/Gallery.client';
import Layout from '../components/Layout.client';
import ProductCard from '../components/ProductCard.client';
import {IMAGE} from '../fragments/image';
import {SHOPIFY_PRODUCT} from '../fragments/shopifyProduct';
import {useSanityQuery} from '../utils/useSanityQuery';

export default function Index() {
  const {data} = useSanityQuery({key: ['home'], query: QUERY});

  const page = data?.result;

  // Filter featured products on the client
  // TODO: All filtering should happen at the query level, figure out the idiomatic way to filter on joins
  const featuredProducts = page?.featuredProducts?.filter(
    (product) => product.available,
  );

  return (
    <Layout>
      <div className="bg-black-300 relative w-full">
        {/* Gallery */}
        {page?.gallery && <Gallery images={page?.gallery} />}

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
          {featuredProducts?.map((product) => {
            return (
              <div key={product?._key}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}

// TODO: filter joined `featuredProducts` on shopify availability
const QUERY = groq`
  *[_id == 'home'][0]{
    featuredProducts[]->{
      ...,
      ${SHOPIFY_PRODUCT}
    },
    gallery[] {
      ${IMAGE}
    },
  }
`;
