import {
  Link,
  ProductProvider,
  ProductTitle,
  SelectedVariantAddToCartButton,
  SelectedVariantImage,
  SelectedVariantPrice,
} from '@shopify/hydrogen/client';
import {useState} from 'react';

export default function ProductCard({product}) {
  // TODO: This is super hacky
  const providerProduct =
    product?.shopify?.shopify?.provider &&
    JSON.parse(product?.shopify?.shopify?.provider);

  if (!providerProduct) {
    return null;
  }

  const [showAddToCart, setShowAddToCart] = useState(false);

  const firstVariant = providerProduct?.variants?.edges[0]?.node;

  return (
    <ProductProvider
      product={providerProduct}
      initialVariantId={firstVariant.id}
    >
      <div className="col-span-2 bg-white">
        {/* Image */}
        <div
          className="relative"
          onClick={() => setShowAddToCart(false)}
          onMouseEnter={() => setShowAddToCart(true)}
          onMouseLeave={() => setShowAddToCart(false)}
        >
          <Link to={`/products/${product?.slug}`}>
            <SelectedVariantImage />
          </Link>
          {showAddToCart && (
            <SelectedVariantAddToCartButton className="absolute bg-black bottom-0 flex h-12 items-center justify-center left-0 text-center text-xs text-white w-full">
              Add to cart
            </SelectedVariantAddToCartButton>
          )}
        </div>
        {/* Title */}
        <Link to={`/products/${product?.slug}`}>
          <div className="font-medium mt-2">
            <ProductTitle />
          </div>
        </Link>

        <div className="flex items-center">
          <SelectedVariantPrice className="text-gray-900">
            {({currencyCode, amount, currencyNarrowSymbol}) => {
              return (
                <span>{`${currencyCode} ${currencyNarrowSymbol}${amount}`}</span>
              );
            }}
          </SelectedVariantPrice>
          <SelectedVariantPrice
            priceType="compareAt"
            className="text-gray-400 line-through"
          >
            {({amount, currencyNarrowSymbol}) => {
              return <span>{`${currencyNarrowSymbol}${amount}`}</span>;
            }}
          </SelectedVariantPrice>
        </div>
      </div>
    </ProductProvider>
  );
}
