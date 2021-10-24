import groq from 'groq';
import React from 'react';
import Gallery from '../components/Gallery.client';
import Layout from '../components/Layout.client';
import ProductCard from '../components/ProductCard.client';
import {IMAGE} from '../fragments/image';
import {PRODUCT} from '../fragments/product';
import {useSanityQuery} from '../utils/useSanityQuery';

export default function Index() {
  const {data} = useSanityQuery({key: ['home'], query: QUERY});

  const page = data?.result;

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
          {page?.featuredProducts?.map((product, index) => {
            return (
              <div key={index}>
                <ProductCard product={product} />
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
      ${PRODUCT}
    },
    gallery[] {
      ${IMAGE}
    },
  }
`;
