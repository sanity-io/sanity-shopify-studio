import groq from 'groq';

import {PORTABLE_TEXT} from './portableText';
import {IMAGE} from './image';

export const SHOPIFY_PRODUCT = groq`
  "available": shopify.isEnabled && !shopify.isDeleted && shopify.status == 'active',
  body[]{
    ${PORTABLE_TEXT}
  },
  images[] {
    ${IMAGE}
  },
  options,
  "provider": shopify.provider,
  sections[]{
    _key,
    body[]{
      ${PORTABLE_TEXT}
    },
    title
  },
  "slug": shopify.slug.current
`;
