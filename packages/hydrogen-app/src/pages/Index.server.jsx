import groq from 'groq';
import React from 'react';

import CollectionCard from '../components/CollectionCard.client';
import Gallery from '../components/Gallery.client';
import Layout from '../components/Layout.client';
import NotFound from '../components/NotFound.server';
import ProductListing from '../components/ProductListing.client';
import Seo from '../components/Seo.client';
import {IMAGE} from '../fragments/image';
import {PRODUCT} from '../fragments/product';
import {SEO} from '../fragments/seo';
import useSanityQuery from '../utils/query/useSanityQuery';

export default function Index() {
  const {sanityData: sanityPage, shopifyProducts} = useSanityQuery({
    query: QUERY,
  });

  if (!sanityPage) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="bg-black-300 relative w-full">
        {/* Gallery */}
        {sanityPage?.gallery && <Gallery images={sanityPage?.gallery} />}

        {/* Divider */}
        <div className="bg-black h-px my-10 w-full" />

        {/* Featured collections */}
        <div className="px-4">
          <h2 className="font-medium text-xl">Featured collections</h2>
          <section className="gap-10 grid grid-cols-3 my-8">
            {sanityPage?.featuredCollections?.map((collection) => (
              <div key={collection?._id}>
                <CollectionCard collection={collection} />
              </div>
            ))}
          </section>
        </div>

        {/* Divider */}
        <div className="bg-black h-px my-10 w-full" />

        {/* Featured products */}
        <div className="px-4">
          <h2 className="font-medium text-xl">Featured products</h2>
          <ProductListing
            products={sanityPage.featuredProducts.map((product) => ({
              ...product,
              storefront: shopifyProducts?.[product?._id],
            }))}
          />
        </div>
      </div>

      {/* SEO */}
      <Seo
        page={{
          description: sanityPage.seo?.description,
          image: sanityPage.seo?.image,
          keywords: sanityPage.seo?.keywords,
          title: sanityPage.seo?.title,
        }}
      />
    </Layout>
  );
}

const QUERY = groq`
  *[_id == 'home'][0]{
    featuredCollections[]-> {
      _id,
      image {
        ${IMAGE}
      },
      "slug": slug.current,
      title,
    },
    featuredProducts[]->{
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
