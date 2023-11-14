import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function useSearch() {
  const [search, setSearch] = useState('');
  const [error, SetError] = useState(null);
  // nota: useRef no renderiza de nuevo el componente
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (search.match(/^\d+$/)) {
      SetError('No se puede buscar una pelicula con un numero');
      return;
    }
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }
    if (search === '') {
      SetError('No se puede buscar una pelicula vacia');
      return;
    }

    if (search.length < 3) {
      SetError('La busqueda debe de tener al menos 3 caracteres');
      return;
    }
    SetError(null);
  }, [search]);
  return { search, setSearch, error };
}

function App() {
  const [sorted, setSorted] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sorted });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };
  const handleChange = (event) => {
    const newSearch = event.target.value;
    if (newSearch.startsWith(' ')) return;
    setSearch(newSearch);
  };
  const handleSort = () => {
    setSorted(!sorted);
  };
  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form action="#" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="Avenger, StarWars, The Matrix ..."
            name="name"
          />
          <input
            type="checkbox"
            name="sorted"
            onChange={handleSort}
            checked={sorted}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main>
        {error && <p>{error}</p>}
        {loading ? <p>Cargando ...</p> : <Movies movies={movies} />}
      </main>
    </div>
  );
}

export default App;
