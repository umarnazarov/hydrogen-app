import { useCartUI } from './CartUIProvider.client';
import { useCart } from '@shopify/hydrogen/client';
import CartIconWithItems from './CartIconWithItems.client';

/**
 * A client component that defines the behavior when a user toggles a cart
 */
export default function CartToggle({ handleClick, scrollbarWidth, fromHome, scrolled }) {
  const {totalQuantity} = useCart();
  const cartUI = useCartUI();

  if (cartUI == null) {
    throw new Error('CartToggle must be a descendent of a CartUIProvider');
  }

  const {isCartOpen, toggleCart} = cartUI;

  return (
    <button
      type="button"
      aria-expanded={isCartOpen}
      aria-controls="cart"
      onClick={() => {
        toggleCart();
        handleClick();
      }}
    >
      {scrollbarWidth < 1000 ? <CartIconWithItems
        fromHome={fromHome}
        scrolled={scrolled}
      /> : <p>Bag &#40;{totalQuantity}&#41;</p>} 
      <span className="sr-only">Open cart</span>
    </button>
  );
}
