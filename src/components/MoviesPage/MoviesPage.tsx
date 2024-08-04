import { useState } from "react";
import { SearchMovies } from "../SearchMovies/SearchMovies";
import { PopularMovies } from "../PopularMovies/PopularMovies";
import { DebouncedInput } from "../DebouncedInput/DebouncedInput";
import { Layout } from "../Layout/Layout";

/**
 * MoviesPage Component
 *
 * A component that displays a paginated list of either popular movies or search results based on the current query.
 * Includes a search input and uses the `Layout` component to arrange the input and movie list.
 *
 * @component
 * @param {Object} props - React props
 * @param {Function} props.onMovieSelect - Function to handle the selection of a movie, receives the movie ID as an argument
 *
 * @returns {JSX.Element} The rendered movies page component
 */
export const MoviesPage = ({
  onMovieSelect,
}: {
  onMovieSelect: (id: number) => void;
}) => {
  const [currentQuery, setCurrentQuery] = useState("");

  const movies =
    currentQuery === "" ? (
      <PopularMovies onMovieSelect={onMovieSelect} />
    ) : (
      <SearchMovies currentQuery={currentQuery} onMovieSelect={onMovieSelect} />
    );

  return (
    <Layout>
      <DebouncedInput
        initialValue={currentQuery}
        onValueChange={setCurrentQuery}
        placeholder="Search movies..."
      />
      {movies}
    </Layout>
  );
};
