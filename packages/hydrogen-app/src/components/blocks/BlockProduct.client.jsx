import {
  MediaFile,
  Product,
  ProductProvider,
  SelectedVariantAddToCartButton,
} from '@shopify/hydrogen/client';
import React from 'react';

import {useProductsContext} from '../../contexts/ProductsContext.client';

const BlockProduct = (props) => {
  const productId = props?.node?.product?._id;

  const product = useProductsContext(productId);

  if (!product) {
    return null;
  }

  const productVariant = product?.variants?.edges[0]?.node;

  return (
    <ProductProvider initialVariantId={productVariant.id} product={product}>
      <div className="my-8">
        <div className="border border-black p-4 space-y-4 w-1/2">
          <>
            <Product.Title className="font-medium" />
            <Product.Price />
          </>
          <MediaFile
            className="w-full"
            media={{
              mediaContentType: 'IMAGE',
              image: productVariant?.image,
            }}
            options={{
              height: '700',
              crop: 'center',
            }}
          />
          <SelectedVariantAddToCartButton className="bg-gray-900 text-white text-center p-4 text-sm w-full">
            Add to cart
          </SelectedVariantAddToCartButton>
        </div>
        {/* Caption */}
        {props?.node?.caption && (
          <div className="text-gray-400 text-sm mt-2">
            {props?.node?.caption}
          </div>
        )}
      </div>
    </ProductProvider>
  );
};

export default BlockProduct;
