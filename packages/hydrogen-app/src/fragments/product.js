import groq from 'groq';

import {PORTABLE_TEXT} from './portableText';
import {IMAGE} from './image';

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
  "slug": store.slug.current
`;
