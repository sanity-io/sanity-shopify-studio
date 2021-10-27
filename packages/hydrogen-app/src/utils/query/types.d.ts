export interface SanityQueryClientOptions {

  /**
   * The ID of your Sanity project.
   * Can also be defined through the VITE_SANITY_ID environment variable.
   */
  projectId?: string;

  /**
   * The Sanity dataset you want to pull data from.
   * Can also be defined through the VITE_SANITY_DATASET environment variable.
   */
  dataset?: string;

  /**
   * If using a private Sanity dataset, pass a read token to access it's data.
   * Can also be defined through the VITE_SANITY_TOKEN environment variable.
   */
  token?: string;

  /**
   * Which version to use for fetching Sanity data.
   * Will default to 2021-10-27.
   */
  apiVersion?: string;

  /**
   * Whether or not to pull data from Sanity's CDN.
   * Defaults to true unless a token is specified.
   */
  useCdn?: boolean;

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
