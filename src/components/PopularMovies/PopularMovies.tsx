import { PaginatedMovies } from "../PaginatedMovies/PaginatedMovies";
import { movieApi } from "../../store";

/**
 * PopularMovies Component
 *
 * A component that uses the `movieApi` with `PaginatedMovies` component to display a paginated list of popular movies.
 *
 * @component
 * @param {Object} props - React props
 * @param {Function} props.onMovieSelect - Function to handle the selection of a movie, receives the movie ID as an argument
 *
 * @returns {JSX.Element} The rendered popular movies component
 */
export const PopularMovies = ({
  onMovieSelect,
}: {
  onMovieSelect: (id: number) => void;
}) => {
  return (
    <PaginatedMovies
      fetchFunction={movieApi.useMoviesQuery}
      onMovieSelect={onMovieSelect}
    />
  );
};
