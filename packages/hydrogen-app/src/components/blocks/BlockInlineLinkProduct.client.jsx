import {Link} from '@shopify/hydrogen/client';

import {useProductsContext} from '../../contexts/ProductsContext.client';

const BlockInlineLinkProduct = (props) => {
  const {node} = props;

  const productId = node?.product?._id;

  const product = useProductsContext(productId);
  // Return text only if no valid product is found
  if (!product) {
    return '(Product not found)';
  }

  const productTitle = product?.title;
  const productUrl = `/products/${product.handle}`;

  return (
    <Link className="underline" to={productUrl}>
      {productTitle}
    </Link>
  );
};

export default BlockInlineLinkProduct;
