import {SanityQueryClientOptions} from './types';

const getConfig = (
  config: SanityQueryClientOptions = {},
): Required<SanityQueryClientOptions> => {
  // @ts-ignore
  const projectId = config.projectId || import.meta?.env?.VITE_SANITY_ID;
  // @ts-ignore
  const dataset = config.dataset;
  // @ts-ignore
  const token = config.token || import.meta?.env?.VITE_SANITY_TOKEN;

  if (!projectId) {
    throw new Error(
      '[hydrogen-plugin-sanity] Missing project ID.\n Pass it directly to the hook or set the environment variable VITE_SANITY_ID.',
    );
  }
  if (!dataset) {
    throw new Error(
      '[hydrogen-plugin-sanity] Missing dataset.\n Pass it directly to the hook or set the environment variable VITE_SANITY_DATASET.',
    );
  }

  return {
    projectId,
    dataset,
    token,
    apiVersion: config.apiVersion || '2021-10-27',
    useCdn: config.useCdn || !token,
    shopifyVariables: {
      // Defaults taken from https://shopify.dev/beta/hydrogen/getting-started#step-4-make-graphql-changes
      numProductMetafields: 0,
      numProductVariants: 250,
      numProductMedia: 1,
      numProductVariantMetafields: 10,
      numProductVariantSellingPlanAllocations: 10,
      numProductSellingPlanGroups: 10,
      numProductSellingPlans: 10,
      ...(config.shopifyVariables || {}),
    },
  };
};

export default getConfig;
