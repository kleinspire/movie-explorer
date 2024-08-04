import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MoviesPage } from "./MoviesPage";
import { DebouncedInput } from "../DebouncedInput/DebouncedInput";

vi.mock("../PopularMovies/PopularMovies", () => ({
  PopularMovies: vi.fn(() => <div>Mocked PopularMovies Component</div>),
}));

vi.mock("../SearchMovies/SearchMovies", () => ({
  SearchMovies: vi.fn(() => <div>Mocked SearchMovies Component</div>),
}));

vi.mock("../DebouncedInput/DebouncedInput", () => ({
  DebouncedInput: vi.fn(({ onValueChange }) => (
    <input
      placeholder="Search movies..."
      onChange={(e) => onValueChange(e.target.value)}
    />
  )),
}));

vi.mock("../Layout/Layout", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("MoviesPage", () => {
  const onMovieSelect = vi.fn();

  it("renders PopularMovies when there is no search query", () => {
    render(<MoviesPage onMovieSelect={onMovieSelect} />);

    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(
      screen.getByText("Mocked PopularMovies Component")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Mocked SearchMovies Component")
    ).not.toBeInTheDocument();
  });

  it("renders SearchMovies when there is a search query", () => {
    render(<MoviesPage onMovieSelect={onMovieSelect} />);

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "Batman" } });

    expect(
      screen.getByText("Mocked SearchMovies Component")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Mocked PopularMovies Component")
    ).not.toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    render(<MoviesPage onMovieSelect={onMovieSelect} />);

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "Batmman" } });

    expect(DebouncedInput).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValue: "",
        onValueChange: expect.any(Function),
        placeholder: "Search movies...",
      }),
      {}
    );
    expect(
      screen.getByText("Mocked SearchMovies Component")
    ).toBeInTheDocument();
  });
});
