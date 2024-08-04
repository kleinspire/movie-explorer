import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { MovieListResponse, MovieDetails } from "./types";

/**
 * Custom baseQuery to intercept API errors
 *
 * This custom base query wraps the default fetchBaseQuery to log any API errors centrally.
 *
 * @type {BaseQueryFn}
 */
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:4000/" });
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    // Log api errors centrally
    console.error("API Error:", result.error);
  }

  return result;
};

/**
 * Movie API
 *
 * This is an API service for fetching movie data, including popular movies, movie details, and search results.
 *
 * @type {Api}
 */
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery,
  tagTypes: ["MovieListResponse", "MovieDetails"],
  endpoints: (builder) => ({
    movies: builder.query<MovieListResponse, { page: number }>({
      query: ({ page }) => `movies?page=${page}`,
      providesTags: [{ type: "MovieListResponse", id: "LIST" }],
    }),
    movie: builder.query<MovieDetails, { id: number }>({
      query: ({ id }) => `movie/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: "MovieDetails", id }],
    }),
    search: builder.query<MovieListResponse, { query: string; page: number }>({
      query: ({ query, page }) => `search/?query=${query}&page=${page}`,
      providesTags: [{ type: "MovieListResponse", id: "LIST" }],
    }),
  }),
});
