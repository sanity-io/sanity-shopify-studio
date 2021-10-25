import {useQuery} from '@shopify/hydrogen';

import sanityConfig from '../../sanity.config';

// Wrapper around hydrogen's `useQuery`
export const useSanityQuery = ({key, query, slug}) => {
  return useQuery(key, () => {
    const queryEncoded = encodeURIComponent(query);

    // TODO: Mega hacky
    let url;
    if (slug) {
      url = `https://${sanityConfig.projectId}.api.sanity.io/${sanityConfig.apiVersion}/data/query/production?query=${queryEncoded}&$slug="${slug}"`;
    } else {
      url = `https://${sanityConfig.projectId}.api.sanity.io/${sanityConfig.apiVersion}/data/query/production?query=${queryEncoded}`;
    }
    return fetch(url).then((res) => {
      try {
        return res.json();
      } catch {}
    });
  });
};
