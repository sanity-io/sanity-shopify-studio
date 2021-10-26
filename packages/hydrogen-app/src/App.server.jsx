import {CartServerProvider, ShopifyServerProvider} from '@shopify/hydrogen';

import shopifyConfig from '../shopify.config';

import Main from './components/Main.server';
import CartProvider from './contexts/CartProvider.client';

export default function App({...serverState}) {
  const pages = import.meta.globEager('./pages/**/*.server.(jsx|tsx)');

  return (
    <ShopifyServerProvider shopifyConfig={shopifyConfig} {...serverState}>
      {/* START: Workaround for CartContext */}
      <CartServerProvider request={serverState.request}>
        {({cart, numCartLines}) => {
          return (
            <CartProvider cart={cart} numCartLines={numCartLines}>
              {/* END: Workaround for CartContext */}
              <Main pages={pages} serverState={serverState} />
            </CartProvider>
          );
        }}
      </CartServerProvider>
    </ShopifyServerProvider>
  );
}
