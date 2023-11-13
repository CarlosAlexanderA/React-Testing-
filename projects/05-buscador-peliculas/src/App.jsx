import responseMovies from './mocks/with-results.json';
// import noResponseMovies from './mocks/no-results.json';
import './App.css';
function App() {
  const movies = responseMovies.Search;
  const hasMovies = movies?.length > 0;

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form action="#">
          <input type="text" placeholder="Avenger, StarWars, The Matrix ..." />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main>
        <h3>Aqui se mostraran las peliculas</h3>
        {hasMovies && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>{movie.Title}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
