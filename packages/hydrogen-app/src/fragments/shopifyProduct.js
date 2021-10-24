import groq from 'groq';
import {PORTABLE_TEXT} from './portableText';
import {IMAGE} from './image';

export const SHOPIFY_PRODUCT = groq`
  body[]{
    ${PORTABLE_TEXT}
  },
  images[] {
    ${IMAGE}
  },
  "provider": shopify.provider
`;

/*
  shopify->{
    ${SHOPIFY_PRODUCT}
  },
  (shopify.status == 'active') => {
    options,
    shopify {
      compareAtPriceRange,
      id,
      priceRange,
      productType,
      provider,
    },
    variants
  }
*/
