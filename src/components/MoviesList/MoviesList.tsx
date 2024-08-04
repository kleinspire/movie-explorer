import { useImageErrorHandler } from "../../util/useImageErrorHandler.ts";
import { MovieOverview } from "../../types";
import "./MoviesList.scss";

/**
 * MoviesList Component
 *
 * A component that displays a list of movies with their details.
 *
 * @component
 * @example
 * // Basic usage
 * const movies = [
 *   {
 *     id: 1,
 *     poster_path: "/path/to/poster.jpg",
 *     original_title: "Example Movie",
 *     overview: "This is an example movie description.",
 *     vote_average: 8.5
 *   },
 *   // Add more movies here
 * ];
 *
 * const handleMovieSelect = (id) => {
 *   console.log(`Selected movie ID: ${id}`);
 * };
 *
 * <MoviesList movies={movies} onMovieSelect={handleMovieSelect} />
 *
 * @param {Object} props - React props
 * @param {Array<MovieOverview>} props.movies - An array of movie objects to be displayed
 * @param {Function} props.onMovieSelect - Function to be called when a movie is selected, receives the movie ID as an argument
 *
 * @returns {JSX.Element} The rendered movies list component
 */
export const MoviesList: React.FC<{
  movies: MovieOverview[];
  onMovieSelect: (id: number) => void;
}> = ({ movies, onMovieSelect }) => {
  const handleImageError = useImageErrorHandler();

  return (
    <div className="movies-list">
      {movies.length === 0 ? (
        <div className="movies-list__empty">No movies available.</div>
      ) : (
        movies.map((m) => (
          <a
            onClick={() => onMovieSelect(m.id)}
            className="movie-item"
            key={m.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              className="movie-item__poster"
              alt="movie poster"
              onError={handleImageError}
            />
            <div className="movie-item__details">
              <div className="movie-item__title-container">
                <div className="movie-item__title">{m.original_title}</div>
              </div>
              <div className="movie-item__description-container">
                <div className="movie-item__description">{m.overview}</div>
                <div className="movie-item__rating">
                  <div>{m.vote_average.toFixed(1)} out of 10</div>
                </div>
              </div>
            </div>
          </a>
        ))
      )}
    </div>
  );
};
