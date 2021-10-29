import {useShopQuery} from '@shopify/hydrogen';

import extractProductsToFetch, {ProductToFetch} from './extractProductsToFetch';
import getShopifyVariables from './getShopifyVariables';
import productFragment from './productFragment';
import {SanityQueryClientOptions} from './types';

const useSanityShopifyProducts = (
  data: unknown,
  options: SanityQueryClientOptions,
) => {
  const {getProductGraphQLFragment} = options;
  const shopifyVariables = getShopifyVariables(options.shopifyVariables);
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

  // @TODO: how not to break Rules of Hooks here?
  if (productsWithFragments.length <= 0) {
    return;
  }

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

  const {data: shopifyData} = useShopQuery({
    query: finalQuery,
    variables: shopifyVariables,
  });

  const shopifyProducts = Object.keys(shopifyData)
    .map((key) => ({index: Number(key.replace('product', '')), key}))
    .map(({index, key}) => {
      const {sanityId} = productsWithFragments[index] || {};
      if (!sanityId) {
        return;
      }
      return {
        sanityId,
        content: shopifyData[key],
      };
    })
    .filter(Boolean)
    .reduce((finalObject, curProduct) => {
      return {
        ...finalObject,
        [curProduct.sanityId]: curProduct.content,
      };
    }, {});

  return shopifyProducts;
};

export default useSanityShopifyProducts;
