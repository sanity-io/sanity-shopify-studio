import {
  BuyNowButton,
  MediaFile,
  Product,
  ProductProvider,
  SelectedVariantAddToCartButton,
} from '@shopify/hydrogen/client';

import {useProductsContext} from '../../contexts/ProductsContext.client';

const AnnotationProductMarginalia = (props) => {
  const {children, mark} = props;

  const productId = mark?.product?._id;

  const product = useProductsContext(productId);
  // Return text only if no valid product is found
  if (!product) {
    return children;
  }

  const productVariant = product?.variants?.edges[0]?.node;

  return (
    <ProductProvider product={product} initialVariantId={productVariant?.id}>
      {mark?.action === 'addToCart' && (
        <>
          {children}
          <div
            className="absolute border border-gray-500 left-full ml-10 p-2 rounded-sm top-0 w-44"
            quantity={mark?.quantity || 1}
          >
            <div className="text-sm">
              <Product.Title className="font-medium" />
              <Product.Price />
            </div>
            <MediaFile
              className="my-2 w-full"
              media={{
                mediaContentType: 'IMAGE',
                image: productVariant?.image,
              }}
              options={{
                height: '700',
                crop: 'center',
              }}
            />
            <SelectedVariantAddToCartButton className="bg-black flex h-10 items-center justify-center text-center text-xs text-white w-full">
              Add to cart
            </SelectedVariantAddToCartButton>
          </div>
        </>
      )}

      {mark?.action === 'buyNow' && (
        <>
          {children}
          <div
            className="absolute border border-gray-500 left-full ml-10 p-2 rounded-sm top-0 w-44"
            quantity={mark?.quantity || 1}
          >
            <div className="text-sm">
              <Product.Title className="font-medium" />
              <Product.Price />
            </div>
            <MediaFile
              className="my-2 w-full"
              media={{
                mediaContentType: 'IMAGE',
                image: productVariant?.image,
              }}
              options={{
                height: '700',
                crop: 'center',
              }}
            />
            <BuyNowButton
              className="bg-black flex h-10 items-center justify-center text-center text-xs text-white w-full"
              quantity={mark?.quantity || 1}
              variantId={productVariant?.id}
            >
              Buy now
            </BuyNowButton>
          </div>
        </>
      )}
    </ProductProvider>
  );
};

export default AnnotationProductMarginalia;
