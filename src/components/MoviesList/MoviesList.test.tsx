import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { MoviesList } from "./MoviesList";
import { MovieOverview } from "../../types";
import { useImageErrorHandler } from "../../util/useImageErrorHandler";

vi.mock("../../util/useImageErrorHandler");

const mockUseImageErrorHandler = useImageErrorHandler as Mock;

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
    poster_path: "/path/to/poster1.jpg",
    release_date: "2023-01-01",
    title: "Movie 1",
    video: false,
    vote_average: 8.5,
    vote_count: 100,
  },
  {
    adult: false,
    backdrop_path: "/path/to/backdrop.jpg",
    genre_ids: [28, 12],
    id: 2,
    original_language: "en",
    original_title: "Movie 2",
    overview: "Another great movie.",
    popularity: 12.0,
    poster_path: "/path/to/poster2.jpg",
    release_date: "2023-01-02",
    title: "Movie 2",
    video: false,
    vote_average: 9.0,
    vote_count: 200,
  },
];

describe("MoviesList Component", () => {
  it("renders the movie list correctly", () => {
    const onMovieSelect = vi.fn();

    render(<MoviesList movies={mockMovies} onMovieSelect={onMovieSelect} />);

    // Check if the movie titles are rendered
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();

    // Check if the movie posters are rendered
    expect(screen.getAllByAltText("movie poster")[0]).toBeInTheDocument();
    expect(screen.getAllByAltText("movie poster")[0]).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/path/to/poster1.jpg"
    );
    expect(screen.getAllByAltText("movie poster")[1]).toBeInTheDocument();
    expect(screen.getAllByAltText("movie poster")[1]).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/path/to/poster2.jpg"
    );
  });

  it("renders an empty list correctly", () => {
    const onMovieSelect = vi.fn();

    render(<MoviesList movies={[]} onMovieSelect={onMovieSelect} />);

    // Check if the empty list message is rendered
    expect(screen.getByText("No movies available.")).toBeInTheDocument();
  });

  it("calls onMovieSelect with the correct id when a movie is clicked", () => {
    const onMovieSelect = vi.fn();

    render(<MoviesList movies={mockMovies} onMovieSelect={onMovieSelect} />);

    // Simulate clicking the first movie
    fireEvent.click(screen.getByText("Movie 1"));

    expect(onMovieSelect).toHaveBeenCalledWith(1);

    // Simulate clicking the second movie
    fireEvent.click(screen.getByText("Movie 2"));

    expect(onMovieSelect).toHaveBeenCalledWith(2);
  });

  it("should use the useImageErrorHandler hook", () => {
    const mockOnMovieSelect = vi.fn();

    const mockHandleImageError = vi.fn();
    mockUseImageErrorHandler.mockReturnValue(mockHandleImageError);

    render(
      <MoviesList movies={mockMovies} onMovieSelect={mockOnMovieSelect} />
    );

    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      fireEvent.error(img);
    });

    expect(mockHandleImageError).toHaveBeenCalledTimes(images.length);
  });
});
