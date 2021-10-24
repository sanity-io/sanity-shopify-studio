import {Link} from '@shopify/hydrogen/client';
import CartIcon from './CartIcon.client';
import {useCartUI} from './CartUIProvider.client';

export default function Header() {
  const {toggleCart} = useCartUI();

  return (
    <header
      className="border-b border-black flex justify-between h-20 p-4 w-full"
      role="banner"
    >
      <div>
        <Link className="font-medium" to="/">
          Sanity + Hydrogen
        </Link>
        <br />
        Example storefront
      </div>
      <div onClick={toggleCart} style={{cursor: 'pointer'}}>
        <CartIcon />
      </div>
    </header>
  );
}
