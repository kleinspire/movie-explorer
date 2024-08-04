import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { SearchMovies } from "./SearchMovies";
import { PaginatedMovies } from "../PaginatedMovies/PaginatedMovies";
import { movieApi } from "../../store";

vi.mock("../../store", () => ({
  movieApi: {
    useSearchQuery: vi.fn(),
  },
}));

vi.mock("../PaginatedMovies/PaginatedMovies", () => ({
  PaginatedMovies: vi.fn(() => <div>Mocked PaginatedMovies Component</div>),
}));

describe("SearchMovies", () => {
  it("renders PaginatedMovies with the correct props", () => {
    const currentQuery = "test query";
    const onMovieSelect = vi.fn();

    render(
      <SearchMovies currentQuery={currentQuery} onMovieSelect={onMovieSelect} />
    );

    expect(
      screen.getByText("Mocked PaginatedMovies Component")
    ).toBeInTheDocument();

    // Ensure PaginatedMovies is called with the right props
    expect(PaginatedMovies).toHaveBeenCalledWith(
      {
        fetchFunction: movieApi.useSearchQuery,
        query: currentQuery,
        onMovieSelect: onMovieSelect,
      },
      {}
    );
  });
});
