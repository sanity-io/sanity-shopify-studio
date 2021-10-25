import groq from 'groq';

import {IMAGE} from './image';
import {LINK_EXTERNAL} from './linkExternal';
import {LINK_INTERNAL} from './linkInternal';

export const PORTABLE_TEXT = groq`
  ...,
  (_type == 'blockImage') => {
    ...,
    image {
      ${IMAGE}
    }
  },
  (_type == 'blockProduct') => {
    ...,
    shopifyProduct->{
      ...
    }
  },
  markDefs[] {
    ...,
    (_type == 'annotationLinkExternal') => {
      ${LINK_EXTERNAL}
    },
    (_type == 'annotationLinkInternal') => {
      ${LINK_INTERNAL}
    },
    (_type == 'annotationShopify') => {
      ...,
      shopifyProduct->{
        ...
      }
    },
    (_type == 'annotationShopifyMargin') => {
      ...,
      shopifyProduct->{
        ...
      }
    },
  }
`;
