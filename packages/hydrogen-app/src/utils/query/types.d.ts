import {ClientConfig} from '@sanity/client';

export interface SanityQueryClientOptions {

  /**
   * (Optional) customize your global Sanity client configuration.
   * You should set a `sanity` object in `shopify.config.js` with global configuration first.
   */
  clientConfig?: ClientConfig;

  shopifyVariables?: {
    numProductMetafields?: number;
    numProductVariants?: number;
    numProductMedia?: number;
    numProductVariantMetafields?: number;
    numProductVariantSellingPlanAllocations?: number;
    numProductSellingPlanGroups?: number;
    numProductSellingPlans?: number;
  };
}
