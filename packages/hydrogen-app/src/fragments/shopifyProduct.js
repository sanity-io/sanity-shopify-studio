import groq from 'groq';

import {PORTABLE_TEXT} from './portableText';
import {IMAGE} from './image';

export const SHOPIFY_PRODUCT = groq`
  _id,
  "available": shopify.isEnabled && !shopify.isDeleted && shopify.status == 'active',
  body[]{
    ${PORTABLE_TEXT}
  },
  images[] {
    ${IMAGE}
  },
  sections[]{
    _key,
    body[]{
      ${PORTABLE_TEXT}
    },
    title
  },
  "slug": shopify.slug.current
`;
