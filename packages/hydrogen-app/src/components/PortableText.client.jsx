/* eslint-disable react/display-name */

import BlockContent from '@sanity/block-content-to-react';
import {
  BuyNowButton,
  MediaFile,
  Product,
  ProductProvider,
  SelectedVariantAddToCartButton,
} from '@shopify/hydrogen/client';

import Block from './Block.client';
import BlockImage from './BlockImage.client';
import BlockProduct from './BlockProduct.client';

const portableTextMarks = {
  annotationLinkEmail: (props) => {
    return (
      <a
        className="underline"
        href={`mailto:${props?.mark?.email}`}
        variant="underline"
      >
        {props.children}
      </a>
    );
  },
  annotationLinkExternal: (props) => {
    return (
      <a
        className="underline"
        href={props?.mark?.url}
        rel="noopener noreferrer"
        target={props?.mark?.newWindow ? '_blank' : '_self'}
      >
        {props.children}
      </a>
    );
  },
  annotationLinkInternal: (props) => {
    const {children, mark} = props;

    return (
      <a className="underline" href={mark?.slug}>
        {children}
      </a>
    );
  },
  annotationShopify: (props) => {
    const {children, mark} = props;

    // TODO: You should be ashamed of yourself...
    const product = JSON.parse(mark?.shopifyProduct?.provider);
    const productVariant = product?.variants?.edges[0]?.node;

    // Return text only if no valid provider is found
    if (!product) {
      return children;
    }

    return (
      <ProductProvider product={product} initialVariantId={productVariant?.id}>
        {mark?.action === 'addToCart' && (
          <SelectedVariantAddToCartButton quantity={mark?.quantity || 1}>
            <span className="bg-gray-200 p-1 rounded-sm">{children}</span>
          </SelectedVariantAddToCartButton>
        )}

        {mark?.action === 'buyNow' && (
          <BuyNowButton
            quantity={mark?.quantity || 1}
            variantId={productVariant?.id}
          >
            <span className="bg-gray-700 p-1 rounded-sm text-white">
              {children}
            </span>
          </BuyNowButton>
        )}
      </ProductProvider>
    );
  },
  annotationShopifyMargin: (props) => {
    const {children, mark} = props;

    // TODO: You should be ashamed of yourself...
    const product = JSON.parse(mark?.shopifyProduct?.provider);
    const productVariant = product?.variants?.edges[0]?.node;

    // Return text only if no valid provider is found
    if (!product) {
      return children;
    }

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
  },
  strong: (props) => {
    return <strong>{props.children}</strong>;
  },
};

const PortableText = (props) => {
  const {blocks, className} = props;

  return (
    <div className={className}>
      <BlockContent
        blocks={blocks}
        className="portableText"
        renderContainerOnSingleChild
        serializers={{
          // Marks
          marks: portableTextMarks,
          // Block types
          types: {
            block: (props) => <Block {...props} />,
            blockImage: (props) => <BlockImage {...props} />,
            blockProduct: (props) => <BlockProduct {...props} />,
          },
        }}
      />
    </div>
  );
};

export default PortableText;
