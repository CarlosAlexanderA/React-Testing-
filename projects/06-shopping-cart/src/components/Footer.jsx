import { useCart } from '../hooks/useCart';
import { useFilters } from '../hooks/useFilters';
import './Footer.css';
export function Footer() {
  const { filters } = useFilters();
  const { cart } = useCart();
  return (
    <footer className="footer">
      {/* <h4>
        Prueba tecnica de react - <span>@midudev</span>
      </h4>
      <h5>Shopping cart con useContext & useReducer</h5> */}
      {/* {JSON.stringify(filters, null, 2)} */}
      {JSON.stringify(cart, null, 2)}
    </footer>
  );
}
