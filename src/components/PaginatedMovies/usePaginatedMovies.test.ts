import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { usePaginatedMovies } from "./usePaginatedMovies";
import { MovieListResponse } from "../../types";

const mockFetchFunction = vi.fn();

const sampleDataFewerResults: MovieListResponse = {
  pages: 1,
  results: 5,
  movies: new Array(5).fill(null).map((_, idx) => ({
    adult: false,
    backdrop_path: `/path${idx}.jpg`,
    genre_ids: [1, 2, 3],
    id: idx,
    original_language: "en",
    original_title: `Movie ${idx}`,
    overview: `Overview of movie ${idx}`,
    popularity: 10,
    poster_path: `/poster${idx}.jpg`,
    release_date: "2021-01-01",
    title: `Movie ${idx}`,
    video: false,
    vote_average: 8.1,
    vote_count: 100,
  })),
};

const sampleDataPage1: MovieListResponse = {
  pages: 2,
  results: 20,
  movies: new Array(10).fill(null).map((_, idx) => ({
    adult: false,
    backdrop_path: `/path${idx}.jpg`,
    genre_ids: [1, 2, 3],
    id: idx,
    original_language: "en",
    original_title: `Movie ${idx}`,
    overview: `Overview of movie ${idx}`,
    popularity: 10,
    poster_path: `/poster${idx}.jpg`,
    release_date: "2024-01-01",
    title: `Movie ${idx}`,
    video: false,
    vote_average: 8.1,
    vote_count: 100,
  })),
};

const sampleDataPage2: MovieListResponse = {
  pages: 2,
  results: 20,
  movies: new Array(10).fill(null).map((_, idx) => ({
    adult: false,
    backdrop_path: `/path${idx + 20}.jpg`,
    genre_ids: [1, 2, 3],
    id: idx + 20,
    original_language: "en",
    original_title: `Movie ${idx + 20}`,
    overview: `Overview of movie ${idx + 20}`,
    popularity: 10,
    poster_path: `/poster${idx + 20}.jpg`,
    release_date: "2024-01-01",
    title: `Movie ${idx + 20}`,
    video: false,
    vote_average: 8.1,
    vote_count: 100,
  })),
};

describe("usePaginatedMovies", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const scenarios = [
    { description: "without query", query: undefined },
    { description: "with query", query: "test" },
  ];

  scenarios.forEach(({ description, query }) => {
    describe(description, () => {
      it("should return loading state initially", () => {
        mockFetchFunction.mockReturnValue({
          data: undefined,
          isLoading: true,
          isError: false,
          isSuccess: false,
        });

        const { result } = renderHook(() =>
          usePaginatedMovies({ fetchFunction: mockFetchFunction, query })
        );

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.movies).toEqual([]);
      });

      it("should return fetched movies and success state", () => {
        mockFetchFunction.mockReturnValue({
          data: sampleDataFewerResults,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });

        const { result } = renderHook(() =>
          usePaginatedMovies({ fetchFunction: mockFetchFunction, query })
        );

        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.movies).toEqual(sampleDataFewerResults.movies);
      });

      it("should return error state on fetch failure", () => {
        mockFetchFunction.mockReturnValue({
          data: undefined,
          isLoading: false,
          isError: true,
          isSuccess: false,
        });

        const { result } = renderHook(() =>
          usePaginatedMovies({ fetchFunction: mockFetchFunction, query })
        );

        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(true);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.movies).toEqual([]);
      });

      it("should handle fewer than 10 total results correctly", async () => {
        mockFetchFunction.mockReturnValue({
          data: sampleDataFewerResults,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });

        const { result, waitFor } = renderHook(() =>
          usePaginatedMovies({ fetchFunction: mockFetchFunction, query })
        );

        act(() => {
          result.current.setCurrentPage(2);
        });

        await waitFor(() => result.current.movies.length > 0);

        expect(result.current.currentPage).toBe(2);
        expect(result.current.movies.length).toBe(5);
        expect(result.current.movies).toEqual(sampleDataFewerResults.movies);
      });

      it("should fetch new page when currentPage exceeds 10 results", async () => {
        // Initial call
        mockFetchFunction.mockImplementationOnce(() => ({
          data: sampleDataPage1,
          isLoading: false,
          isError: false,
          isSuccess: true,
        }));

        // Second page call
        mockFetchFunction.mockImplementationOnce(() => ({
          data: sampleDataPage2,
          isLoading: false,
          isError: false,
          isSuccess: true,
        }));

        const { result, waitFor } = renderHook(() =>
          usePaginatedMovies({ fetchFunction: mockFetchFunction, query })
        );

        expect(result.current.currentPage).toBe(1);

        // Move to the 2nd page (which should force a new fetch call)
        act(() => {
          result.current.setCurrentPage(2);
        });

        await waitFor(() => result.current.movies.length > 0);

        expect(result.current.currentPage).toBe(2);
        expect(mockFetchFunction).toHaveBeenCalledTimes(2);
        expect(mockFetchFunction).toHaveBeenLastCalledWith({ page: 2, query });

        // Should return the first set of 10 movies from the second API call
        expect(result.current.movies).toEqual(sampleDataPage2.movies);
      });
    });
  });
});
