import { useState } from 'react';
import { Products } from './components/Products.jsx';
import { products as initialProducts } from './mocks/products.json';

function App() {
  const [products] = useState(initialProducts);
  const [filters, setFilters] = useState({ category: 'all', minPrice: 0 });

  const filterProduct = (items) => {
    return items.filter((item) => {
      return (
        item.price >= filters.minPrice &&
        (filters.category === 'all' || item.category === filters.category)
      );
    });
  };

  const filteredProducts = filterProduct(products);
  return <Products products={filteredProducts} />;
}

export default App;
