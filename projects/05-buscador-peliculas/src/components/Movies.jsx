function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
          {console.log(movie.poster)}
        </li>
      ))}
    </ul>
  );
}
function NoMoviesResult() {
  return (
    <h3 style={{ textAlign: 'center' }}>
      No se encontraron peliculas para esta buqueda
    </h3>
  );
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
}
