import {useQuery, useShopQuery} from '@shopify/hydrogen';
import {isClient} from '@shopify/hydrogen/client';

import extractProductsToFetch, {ProductToFetch} from './extractProductsToFetch';
import getConfig from './getConfig';
import productFragment from './productFragment';
import {SanityQueryClientOptions} from './types';

export interface UseSanityQueryResponse<T> {

  /** The data returned by the query. */
  sanityData: T;
  shopifyData: {[key: string]: unknown};
  errors: any;
}

interface UseSanityGroqQueryProps extends SanityQueryClientOptions {

  /** A string of the GROQ query. */
  query: string;

  /** An object of the variables for the GROQ query. */
  params?: {[key: string]: any};

  /**
   * Given a product's id & occurrence, what data should it fetch from Shopify?
   *
   * Return false if you don't want to fetch data for a given product.
   * Defaults to Hydrogen's ProductProviderFragment.
   */
  getProductGraphQLFragment?: (product: ProductToFetch) => string | boolean;
}

/**
 * Hook to make server-only GROQ queries to a Sanity dataset.
 */
export function useSanityGroqQuery<T>({
  query,
  params = {},
  getProductGraphQLFragment,
  ...config
}: UseSanityGroqQueryProps): UseSanityQueryResponse<T> {
  if (isClient()) {
    throw new Error('Sanity requests should only be made from the server.');
  }

  const {projectId, token, dataset, apiVersion, shopifyVariables} =
    getConfig(config);

  const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}`;
  const headers: {[key: string]: string} = {
    'content-type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const body = JSON.stringify({
    query,
    params,
  });

  const {data, error} = useQuery<T>([url, body], () =>
    fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then((res) => res.json())
      .then((data) => data.result),
  );

  const productsToFetch = extractProductsToFetch(data);

  const enhanceProductWithFragment = (product: ProductToFetch) => {
    if (typeof getProductGraphQLFragment === 'function') {
      const fragment = getProductGraphQLFragment(product);
      if (typeof fragment === 'string') {
        return {
          ...product,
          fragment,
        };
      } else if (fragment === false) {
        return {
          ...product,
          fragment: undefined,
        };
      }
    }
    return {
      ...product,
      fragment: '...ProductProviderFragment',
    };
  };

  const productsWithFragments = Object.keys(productsToFetch)
    .map((id) => enhanceProductWithFragment(productsToFetch[id]))
    .filter((product) => Boolean(product.fragment));

  // @TODO: replace with final ProductProviderFragment
  const finalQuery = `
  query getProducts(
    $numProductMetafields: Int!
    $numProductVariants: Int!
    $numProductMedia: Int!
    $numProductVariantMetafields: Int!
    $numProductVariantSellingPlanAllocations: Int!
    $numProductSellingPlanGroups: Int!
    $numProductSellingPlans: Int!
  ) {
    ${productsWithFragments
      .map(
        (product, index) => `
      product${index}: product(id: "gid://shopify/Product/${product.shopifyId}") {
        ${product.fragment}
      }
    `,
      )
      .join('\n')}
  }

  ${productFragment}
  `;

  const {data: rawShopifyData} = useShopQuery({
    query: finalQuery,
    variables: shopifyVariables,
  });

  const shopifyData = Object.keys(rawShopifyData)
    .map((key) => ({index: Number(key.replace('product', '')), key}))
    .map(({index, key}) => {
      const {sanityId} = productsWithFragments[index] || {};
      if (!sanityId) {
        return;
      }
      return {
        sanityId,
        content: rawShopifyData[key],
      };
    })
    .filter(Boolean)
    .reduce((finalObject, curProduct) => {
      return {
        ...finalObject,
        [curProduct.sanityId]: curProduct.content,
      };
    }, {});

  return {
    sanityData: data,
    errors: error,
    shopifyData,
  };
}
