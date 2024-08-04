import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, Mock } from "vitest";
import { usePaginatedMovies } from "./usePaginatedMovies";
import { MovieOverview } from "../../types";

// Mock the usePaginatedMovies hook
vi.mock("./usePaginatedMovies", () => ({
  usePaginatedMovies: vi.fn(),
}));

// Define the mock components
const MockedMoviesList = vi.fn(() => <div>Mocked MoviesList Component</div>);
const MockedPagination = vi.fn(() => <div>Mocked Pagination Component</div>);

// Mock the components
vi.doMock("../MoviesList/MoviesList", () => ({
  MoviesList: MockedMoviesList,
}));

vi.doMock("../Pagination/Pagination", () => ({
  Pagination: MockedPagination,
}));

describe("PaginatedMovies", () => {
  const mockMovies: MovieOverview[] = [
    {
      adult: false,
      backdrop_path: "/path/to/backdrop.jpg",
      genre_ids: [28, 12],
      id: 1,
      original_language: "en",
      original_title: "Movie 1",
      overview: "A great movie.",
      popularity: 10.0,
      poster_path: "/path/to/poster.jpg",
      release_date: "2023-01-01",
      title: "Movie 1",
      video: false,
      vote_average: 8.5,
      vote_count: 100,
    },
  ];
  const mockTotalPages = 3;
  const mockCurrentPage = 1;
  const setCurrentPage = vi.fn();

  it("renders loading state correctly", async () => {
    (usePaginatedMovies as Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    const fetchFunction = vi.fn();
    const onMovieSelect = vi.fn();

    const { PaginatedMovies } = await import("./PaginatedMovies");

    render(
      <PaginatedMovies
        fetchFunction={fetchFunction}
        onMovieSelect={onMovieSelect}
      />
    );

    expect(screen.getByText("loading...")).toBeInTheDocument();
    expect(usePaginatedMovies).toHaveBeenCalledWith({
      fetchFunction,
      query: undefined,
    });
  });

  it("renders error state correctly", async () => {
    (usePaginatedMovies as Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
    });

    const fetchFunction = vi.fn();
    const onMovieSelect = vi.fn();

    const { PaginatedMovies } = await import("./PaginatedMovies");

    render(
      <PaginatedMovies
        fetchFunction={fetchFunction}
        onMovieSelect={onMovieSelect}
      />
    );

    expect(screen.getByText("something went wrong")).toBeInTheDocument();
    expect(usePaginatedMovies).toHaveBeenCalledWith({
      fetchFunction,
      query: undefined,
    });
  });

  it("renders success state correctly", async () => {
    const mockQuery = "action";

    (usePaginatedMovies as Mock).mockReturnValue({
      movies: mockMovies,
      totalPages: mockTotalPages,
      currentPage: mockCurrentPage,
      setCurrentPage: setCurrentPage,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    const fetchFunction = vi.fn();
    const onMovieSelect = vi.fn();

    const { PaginatedMovies } = await import("./PaginatedMovies");

    render(
      <PaginatedMovies
        fetchFunction={fetchFunction}
        query={mockQuery}
        onMovieSelect={onMovieSelect}
      />
    );

    // Ensure `MoviesList` is rendered
    expect(screen.getByText("Mocked MoviesList Component")).toBeInTheDocument();

    // Ensure `Pagination` is rendered
    expect(screen.getByText("Mocked Pagination Component")).toBeInTheDocument();

    // Check that MoviesList is called with the right props
    expect(MockedMoviesList).toHaveBeenCalledWith(
      {
        movies: mockMovies,
        onMovieSelect: onMovieSelect,
      },
      {}
    );

    // Check that Pagination is called with the right props
    expect(MockedPagination).toHaveBeenCalledWith(
      {
        currentPage: mockCurrentPage,
        totalPages: mockTotalPages,
        setCurrentPage: setCurrentPage,
      },
      {}
    );

    // Check that usePaginatedMovies is called with the right props including the query
    expect(usePaginatedMovies).toHaveBeenCalledWith({
      fetchFunction,
      query: mockQuery,
    });
  });

  it("renders indeterminate state correctly", async () => {
    (usePaginatedMovies as Mock).mockReturnValue({
      movies: [],
      isLoading: false,
      isError: false,
      isSuccess: false,
    });

    const fetchFunction = vi.fn();
    const onMovieSelect = vi.fn();

    const { PaginatedMovies } = await import("./PaginatedMovies");

    render(
      <PaginatedMovies
        fetchFunction={fetchFunction}
        onMovieSelect={onMovieSelect}
      />
    );

    // Check that nothing is rendered in this state
    expect(screen.queryByText("loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("something went wrong")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Mocked MoviesList Component")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Mocked Pagination Component")
    ).not.toBeInTheDocument();
  });
});
