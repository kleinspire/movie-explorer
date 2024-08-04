import { PaginatedMovies } from "../PaginatedMovies/PaginatedMovies";
import { movieApi } from "../../store";

/**
 * SearchMovies Component
 *
 * A component that uses the `movieApi` with `PaginatedMovies` component to display a paginated list of movies based on a search query.
 *
 * @component
 * @param {Object} props - React props
 * @param {string} props.currentQuery - The current search query string
 * @param {Function} props.onMovieSelect - Function to handle the selection of a movie, receives the movie ID as an argument
 *
 * @returns {JSX.Element} The rendered search movies component
 */
export const SearchMovies = ({
  currentQuery,
  onMovieSelect,
}: {
  currentQuery: string;
  onMovieSelect: (id: number) => void;
}) => {
  return (
    <PaginatedMovies
      fetchFunction={movieApi.useSearchQuery}
      query={currentQuery}
      onMovieSelect={onMovieSelect}
    />
  );
};
