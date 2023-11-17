import './Cart.css';
import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './icons';

export function Cart() {
  const cartCheckboxId = useId();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />
      <aside className="cart">
        <ul>
          <li>
            <img
              src="https://mac-center.com.pe/cdn/shop/products/IMG-6376504_823x.jpg?v=1660902352"
              alt="Iphone"
            />
            <div>
              <strong>Iphone</strong> - $1499
            </div>
            <footer>
              <small>Qty: 1</small>
              <button>+</button>
            </footer>
          </li>
        </ul>
        <button>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
