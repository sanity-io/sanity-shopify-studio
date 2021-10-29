import {Product, useProduct} from '@shopify/hydrogen/client';

/**
 * Wrapper around Hydrogen's `<Product.SelectedVariant.AddToCartButton />` which will
 * display a disabled 'sold out' button if variant is not available for sale
 */
export default function ButtonSelectedVariantAddToCart(props) {
  const {showSoldOut = true, small} = props;
  const {selectedVariant} = useProduct();

  const availableForSale = selectedVariant?.availableForSale;

  return (
    <>
      {availableForSale ? (
        <Product.SelectedVariant.AddToCartButton
          className={`bg-gray-900 text-white text-center ${
            small ? 'p-3 text-xs' : 'p-4 text-sm'
          } w-full`}
        >
          Add to cart
        </Product.SelectedVariant.AddToCartButton>
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
