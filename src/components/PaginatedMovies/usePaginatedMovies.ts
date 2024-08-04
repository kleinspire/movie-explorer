import { useState, useMemo } from "react";
import { MovieListResponse } from "../../types";

export type FetchParams<T extends string | null> = T extends string
  ? { page: number; query: T }
  : { page: number };

export type FetchResult = {
  data?: MovieListResponse;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

/**
 * usePaginatedMovies Hook
 *
 * A custom hook to manage fetching paginated movie data, including handling query parameters and pagination state.
 *
 * @example
 * // Basic usage with useSearchQuery fetch function
 *
 * const MyComponent = () => {
 *   const {
 *     movies,
 *     totalPages,
 *     isLoading,
 *     isError,
 *     isSuccess,
 *     currentPage,
 *     setCurrentPage
 *   } = usePaginatedMovies({ fetchFunction: movieApi.useSearchQuery}, query: "Batman" });
 *
 *   // Render your component with the data
 * };
 *
 * // With useMoviesQuery fetch function
 *
 * const MyComponent = () => {
 *   const {
 *     movies,
 *     totalPages,
 *     isLoading,
 *     isError,
 *     isSuccess,
 *     currentPage,
 *     setCurrentPage
 *   } = usePaginatedMovies({ fetchFunction: movieApi.useMoviesQuery });
 *
 *   // Render your component with the data
 * };
 *
 * @param {Object} params - Hook parameters
 * @param {Function} params.fetchFunction - Function to fetch the movie data
 * @param {string} [params.query] - Optional query parameter for searching movies
 *
 * @returns {Object} An object containing movie data, loading state, error state, success state, current page state, and a function to set the current page
 */
export const usePaginatedMovies = <T extends string | null>({
  fetchFunction,
  query,
}: {
  fetchFunction: (params: FetchParams<T>) => FetchResult;
  query?: T;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchParams = useMemo(() => {
    return (
      query ? { page: currentPage, query } : { page: currentPage }
    ) as FetchParams<T>;
  }, [currentPage, query]);

  const { data, isLoading, isError, isSuccess } = fetchFunction(fetchParams);

  return {
    movies: data?.movies ?? [],
    totalPages: data?.pages ?? 1,
    isLoading,
    isError,
    isSuccess,
    currentPage,
    setCurrentPage,
  };
};
