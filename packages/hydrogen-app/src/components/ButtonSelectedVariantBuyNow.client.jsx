import {Product, useProduct} from '@shopify/hydrogen/client';

/**
 * Wrapper around Hydrogen's `<Product.SelectedVariant.BuyNowButton />` which will
 * display a disabled 'sold out' button if variant is not available for sale
 */
export default function ButtonSelectedVariantBuyNow(props) {
  const {showSoldOut = true, small} = props;
  const {selectedVariant} = useProduct();

  const availableForSale = selectedVariant?.availableForSale;

  return (
    <>
      {availableForSale ? (
        <Product.SelectedVariant.BuyNowButton
          className={`bg-gray-900 text-white text-center ${
            small ? 'p-3 text-xs' : 'p-4 text-sm'
          } w-full`}
        >
          Buy it now
        </Product.SelectedVariant.BuyNowButton>
      ) : (
        <>
          {showSoldOut && (
            <button
              className={`bg-gray-900 disabled:opacity-20 text-white text-center ${
                small ? 'p-3 text-xs' : 'p-4 text-sm'
              } w-full`}
              disabled
              type="button"
            >
              Sold out
            </button>
          )}
        </>
      )}
    </>
  );
}
