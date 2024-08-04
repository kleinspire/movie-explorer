import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";

const MockedMoviesPage = vi.fn(({ onMovieSelect }) => (
  <div>
    <button onClick={() => onMovieSelect(1)}>Select Movie</button>
    Mocked MoviesPage Component
  </div>
));

const MockedMoviePage = vi.fn(({ id, onClickBack }) => (
  <div>
    <button onClick={onClickBack}>Back</button>
    Mocked MoviePage Component {id}
  </div>
));

vi.doMock("../MoviesPage/MoviesPage", () => ({
  MoviesPage: MockedMoviesPage,
}));

vi.doMock("../MoviePage/MoviePage", () => ({
  MoviePage: MockedMoviePage,
}));

describe("MovieRouter", () => {
  it("initially renders MoviesPage", async () => {
    const { MovieRouter } = await import("./MovieRouter");

    render(<MovieRouter />);

    expect(screen.getByText("Mocked MoviesPage Component")).toBeInTheDocument();
  });

  it("renders MoviePage after selecting a movie", async () => {
    const { MovieRouter } = await import("./MovieRouter");

    render(<MovieRouter />);

    fireEvent.click(screen.getByText("Select Movie"));
    expect(
      screen.getByText("Mocked MoviePage Component 1")
    ).toBeInTheDocument();
  });

  it("goes back to MoviesPage from MoviePage", async () => {
    const { MovieRouter } = await import("./MovieRouter");

    render(<MovieRouter />);

    fireEvent.click(screen.getByText("Select Movie"));
    expect(
      screen.getByText("Mocked MoviePage Component 1")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Back"));
    expect(screen.getByText("Mocked MoviesPage Component")).toBeInTheDocument();
  });
});
