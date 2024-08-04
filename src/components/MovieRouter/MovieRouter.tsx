import { useState, useCallback } from "react";
import { MoviesPage } from "../MoviesPage/MoviesPage";
import { MoviePage } from "../MoviePage/MoviePage";

/**
 * MovieRouter Component
 *
 * A component that handles the routing logic between `MoviesPage` and `MoviePage`.
 * It maintains the state of the selected movie and provides callbacks to navigate between the list and detail views.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component that conditionally displays either `MoviesPage` or `MoviePage` based on the selected movie state
 */
export const MovieRouter = () => {
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);

  const onMovieSelect = useCallback((id: number) => {
    setSelectedMovie(id);
  }, []);

  const onClickBack = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  return selectedMovie ? (
    <MoviePage id={selectedMovie} onClickBack={onClickBack} />
  ) : (
    <MoviesPage onMovieSelect={onMovieSelect} />
  );
};
