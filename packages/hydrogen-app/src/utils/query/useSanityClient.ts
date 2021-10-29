import sanityClient, {ClientConfig, SanityClient} from '@sanity/client';
import {useShop} from '@shopify/hydrogen';

const useSanityClient = (config: Partial<ClientConfig> = {}): SanityClient => {
  const shopifyConfig = useShop();
  const globalClientConfig = (shopifyConfig as any).sanity || {};

  if (!(config.projectId || globalClientConfig.projectId)) {
    throw new Error(
      '[hydrogen-plugin-sanity] Missing project ID.\n Pass it directly to the hook or set its value in the `sanity` object inside shopify.config.js.',
    );
  }
  if (!(config.dataset || globalClientConfig.dataset)) {
    throw new Error(
      '[hydrogen-plugin-sanity] Missing dataset.\n Pass it directly to the hook or set its value in the `sanity` object inside shopify.config.js.',
    );
  }
  if (!(config.apiVersion || globalClientConfig.apiVersion)) {
    throw new Error(
      '[hydrogen-plugin-sanity] Missing apiVersion.\n Pass it directly to the hook or set its value in the `sanity` object inside shopify.config.js.',
    );
  }

  const client = sanityClient({
    ...globalClientConfig,
    ...config,
  });

  return client;
};

export default useSanityClient;
