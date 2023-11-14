import { useMemo, useRef, useState } from 'react';
// import withResults from '../mocks/with-results.json';
// import withOutResults from '../mocks/no-results.json';
import { searchMovies } from '../services/movies';

export function useMovies({ search, sorted }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevSearch = useRef('search');

  const getMovies = useMemo(() => {
    return async ({ search }) => {
      if (search === prevSearch.current) return;

      try {
        setLoading(true);
        setError(null);
        prevSearch.current = search;
        const newMovies = await searchMovies({ search });
        setMovies(newMovies);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
  }, []);
  const sortedMovies = useMemo(() => {
    // console.log('sorted movies');
    return sorted
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sorted, movies]);
  return { movies: sortedMovies, getMovies, loading };
}
