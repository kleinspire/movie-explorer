import { usePaginatedMovies, FetchFunction } from "./usePaginatedMovies";
import { MoviesList } from "../MoviesList/MoviesList";
import { Pagination } from "../Pagination/Pagination";
import "./PaginatedMovies.scss";

interface MoviesDisplayProps<T extends string | null> {
  fetchFunction: FetchFunction<T>;
  query?: T;
  onMovieSelect: (id: number) => void;
}

/**
 * PaginatedMovies Component
 *
 * A component that displays a paginated list of movies and handles fetching, pagination,
 * and error/loading states.
 *
 * @component
 * @param {Object} props - React props
 * @param {Function} props.fetchFunction - Function to fetch the movie data
 * @param {string} [props.query] - Optional query parameter for searching movies
 * @param {Function} props.onMovieSelect - Function to handle the selection of a movie, receives the movie ID as an argument
 *
 * @returns {JSX.Element} The rendered paginated movies component
 */
export const PaginatedMovies = <T extends string | null>({
  fetchFunction,
  query,
  onMovieSelect,
}: MoviesDisplayProps<T>) => {
  const {
    movies,
    totalPages,
    isLoading,
    isError,
    isSuccess,
    currentPage,
    setCurrentPage,
  } = usePaginatedMovies({ fetchFunction, query });

  if (isLoading) return "loading...";
  if (isError) return "something went wrong";
  if (isSuccess) {
    return (
      <div className="paginated-movies">
        <MoviesList movies={movies} onMovieSelect={onMovieSelect} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  }
};
