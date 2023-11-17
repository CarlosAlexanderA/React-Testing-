import { createContext, useState } from 'react';

//1. crear el contexto
// este es el que tenemos que consumir
export const FilterContext = createContext(); // <- solo se crea una vez

// 2. Crear el provider, para proveer el contexto
// este es el que nos provee de acceso al contexto
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'laptops',
    minPrice: 1000,
  });
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
