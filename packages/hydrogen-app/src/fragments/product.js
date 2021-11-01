import groq from 'groq';

import {IMAGE} from './image';
import {PORTABLE_TEXT} from './portableText';
import {SEO} from './seo';

export const PRODUCT = groq`
  _id,
  "available": store.isEnabled && !store.isDeleted && store.status == 'active',
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
  "seo": {
    ...seo {
      ${SEO}
    },
    "title": store.title
  },
  "slug": store.slug.current,
`;
