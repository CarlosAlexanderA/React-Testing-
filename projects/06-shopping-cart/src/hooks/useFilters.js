import { useContext } from 'react';
import { FilterContext } from '../context/filters';
export function useFilters() {
  const { filters, setFilters } = useContext(FilterContext);
  console.log(filters);

  const filterProducts = (items) => {
    return items.filter((item) => {
      return (
        item.price >= filters.minPrice &&
        (filters.category === 'all' || item.category === filters.category)
      );
    });
  };
  return { filters, filterProducts, setFilters };
}
