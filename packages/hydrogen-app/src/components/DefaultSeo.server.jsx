import {useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Seo from './Seo.client';

export default function SeoServer() {
  const {
    data: {
      shop: {name: shopName},
    },
  } = useShopQuery({query: QUERY});

  return <Seo shopName={shopName} />;
}

const QUERY = gql`
  query shopName {
    shop {
      name
    }
  }
`;
