import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, Mock } from "vitest";
import { movieApi } from "../../store";
import { useImageErrorHandler } from "../../util/useImageErrorHandler";

vi.mock("../../util/useImageErrorHandler");

vi.mock("../../store", () => ({
  movieApi: {
    useMovieQuery: vi.fn(),
  },
}));

const MockedLayout = vi.fn(({ children }) => <div>{children}</div>);
const MockedButton = vi.fn(({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
));
const MockedDetailsList = vi.fn(({ items }: { items: [string, string][] }) => (
  <div>
    {items.map(([key, value]) => (
      <div key={key}>
        <span>{key}:</span> <span>{value}</span>
      </div>
    ))}
  </div>
));

vi.doMock("../Layout/Layout", () => ({ Layout: MockedLayout }));
vi.doMock("../Button/Button", () => ({ Button: MockedButton }));
vi.doMock("../DetailsList/DetailsList", () => ({
  DetailsList: MockedDetailsList,
}));

const mockMovie = {
  runtime: 120,
  genres: [{ name: "Action" }, { name: "Adventure" }],
  release_date: "2023-01-01",
  production_companies: [{ name: "Company A" }, { name: "Company B" }],
  spoken_languages: [{ english_name: "English" }, { english_name: "Spanish" }],
  poster_path: "/path/to/poster.jpg",
  title: "Movie Title",
  tagline: "Movie Tagline",
  overview: "A great movie.",
  vote_average: 8.5,
};

describe("MoviePage", () => {
  const mockId = 1;
  const onClickBack = vi.fn();

  it("renders loading state correctly", async () => {
    (movieApi.useMovieQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    const { MoviePage } = await import("./MoviePage");

    render(<MoviePage id={mockId} onClickBack={onClickBack} />);

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("renders error state correctly", async () => {
    (movieApi.useMovieQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      isSuccess: false,
    });

    const { MoviePage } = await import("./MoviePage");

    render(<MoviePage id={mockId} onClickBack={onClickBack} />);

    expect(screen.getByText("something went wrong")).toBeInTheDocument();
  });

  it("renders success state correctly", async () => {
    (movieApi.useMovieQuery as Mock).mockReturnValue({
      data: mockMovie,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    const { MoviePage } = await import("./MoviePage");

    render(<MoviePage id={mockId} onClickBack={onClickBack} />);

    // Check that Layout is rendered
    expect(MockedLayout).toHaveBeenCalled();

    // Check that Button is rendered
    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(MockedButton).toHaveBeenCalledWith(
      { onClick: onClickBack, children: "Back" },
      {}
    );

    // Check that movie details are rendered
    expect(screen.getByText("Movie Title")).toBeInTheDocument();
    expect(screen.getByText("Movie Tagline")).toBeInTheDocument();
    expect(screen.getByText("A great movie.")).toBeInTheDocument();
    expect(screen.getByText("8.5 out of 10")).toBeInTheDocument();

    // Check that DetailsList is rendered with the correct props
    const details = [
      ["Runtime", "120 minutes"],
      ["Genres", "Action, Adventure"],
      ["Release Date", "2023-01-01"],
      ["Production Companies", "Company A, Company B"],
      ["Languages", "English, Spanish"],
    ];
    expect(MockedDetailsList).toHaveBeenCalledWith({ items: details }, {});
  });

  it("renders indeterminate state correctly", async () => {
    (movieApi.useMovieQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
    });

    const { MoviePage } = await import("./MoviePage");

    render(<MoviePage id={mockId} onClickBack={onClickBack} />);

    // Check that nothing is rendered in this state
    expect(screen.queryByText("loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("something went wrong")).not.toBeInTheDocument();
    expect(screen.queryByText("Back")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie Title")).not.toBeInTheDocument();
  });

  it("should use the useImageErrorHandler hook", async () => {
    const mockHandleImageError = vi.fn();
    (useImageErrorHandler as Mock).mockReturnValue(mockHandleImageError);

    (movieApi.useMovieQuery as Mock).mockReturnValue({
      data: mockMovie,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    const { MoviePage } = await import("./MoviePage");

    render(<MoviePage id={mockId} onClickBack={onClickBack} />);

    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      fireEvent.error(img);
    });

    expect(mockHandleImageError).toHaveBeenCalledTimes(images.length);
  });
});
