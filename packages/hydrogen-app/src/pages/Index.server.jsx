import groq from 'groq';
import React from 'react';

import Gallery from '../components/Gallery.client';
import Layout from '../components/Layout.client';
import ProductCard from '../components/ProductCard.client';
import Seo from '../components/Seo.client';
import {IMAGE} from '../fragments/image';
import {PRODUCT} from '../fragments/product';
import {SEO} from '../fragments/seo';
import useSanityQuery from '../utils/query/useSanityQuery';

export default function Index() {
  const {sanityData: sanityPage, shopifyProducts} = useSanityQuery({
    query: QUERY,
  });

  return (
    <Layout>
      <div className="bg-black-300 relative w-full">
        {/* Gallery */}
        {sanityPage?.gallery && <Gallery images={sanityPage?.gallery} />}

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
          {sanityPage?.featuredProducts?.map((product) => {
            return (
              <div key={product?._id}>
                <ProductCard
                  product={{
                    ...product,
                    storefront: shopifyProducts?.[product?._id],
                  }}
                />
              </div>
            );
          })}
        </section>
      </div>

      {/* SEO */}
      <Seo
        page={{
          description: sanityPage.seo?.description,
          image: sanityPage.seo?.image,
          title: sanityPage.seo?.title,
        }}
      />
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
    seo {
      ${SEO}
    }
  } {
    ...,
    featuredProducts[available]
  }
`;
