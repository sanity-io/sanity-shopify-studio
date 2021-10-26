import {Product, useProduct} from '@shopify/hydrogen/client';

export default function ProductActions() {
  const {selectedVariant} = useProduct();

  const availableForSale = selectedVariant?.availableForSale;

  return (
    <>
      {availableForSale ? (
        <>
          <Product.SelectedVariant.AddToCartButton className="bg-gray-900 text-white text-center p-4 text-sm w-full">
            Add to cart
          </Product.SelectedVariant.AddToCartButton>
          <Product.SelectedVariant.BuyNowButton className="bg-white border border-black text-center p-4 text-sm w-full">
            Buy it now
          </Product.SelectedVariant.BuyNowButton>
        </>
      ) : (
        <button
          className="bg-gray-900 disabled:opacity-20 text-white text-center p-4 text-sm w-full"
          disabled
          type="button"
        >
          Sold out
        </button>
      )}
      {/* Shop pay */}
      {/* <Product.SelectedVariant.ShopPayButton className="flex justify-center w-full" /> */}
    </>
  );
}
