import groq from 'groq';
import {PORTABLE_TEXT} from './portableText';
import {SHOPIFY_PRODUCT} from './shopifyProduct';

export const PRODUCT = groq`
  ...,
  sections[]{
    body[]{
      ${PORTABLE_TEXT}
    },
    title
  },
  "slug": slug.current,
  shopify->{
    ${SHOPIFY_PRODUCT}
  },
`;
