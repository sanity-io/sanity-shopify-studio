import {useCallback} from 'react';
import {CartProvider as ShopifyCartProvider} from '@shopify/hydrogen/client';

import CartUIProvider, {useCartUI} from './CartUIProvider.client';

/**
 * TODO: Remove this re-export once we find a long-term solution for
 * mixed Hydrogen Client Components.
 * @see https://github.com/Shopify/hydrogen/issues/383
 */

export default function CartProvider({children, cart, numCartLines}) {
  return (
    <CartUIProvider>
      <Provider cart={cart} numCartLines={numCartLines}>
        {children}
      </Provider>
    </CartUIProvider>
  );
}

function Provider({children, cart, numCartLines}) {
  const {openCart} = useCartUI();

  const onCartLineAdd = useCallback(() => {
    openCart();
  }, [openCart]);

  return (
    <>
      <ShopifyCartProvider
        cart={cart}
        numCartLines={numCartLines}
        onLineAdd={onCartLineAdd}
      >
        {children}
      </ShopifyCartProvider>
    </>
  );
}
