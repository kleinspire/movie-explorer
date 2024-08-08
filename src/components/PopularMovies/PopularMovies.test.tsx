import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { PopularMovies } from "./PopularMovies";
import { PaginatedMovies } from "../PaginatedMovies/PaginatedMovies";
import { useMoviesQuery } from "../../store";

vi.mock("../../store", () => ({
  useMoviesQuery: vi.fn(),
}));

vi.mock("../PaginatedMovies/PaginatedMovies", () => ({
  PaginatedMovies: vi.fn(() => <div>Mocked PaginatedMovies Component</div>),
}));

describe("PopularMovies", () => {
  it("renders PaginatedMovies with the correct props", () => {
    const onMovieSelect = vi.fn();

    render(<PopularMovies onMovieSelect={onMovieSelect} />);

    expect(
      screen.getByText("Mocked PaginatedMovies Component")
    ).toBeInTheDocument();

    // Ensure PaginatedMovies is called with the right props
    expect(PaginatedMovies).toHaveBeenCalledWith(
      {
        fetchFunction: useMoviesQuery,
        onMovieSelect: onMovieSelect,
      },
      {}
    );
  });
});
