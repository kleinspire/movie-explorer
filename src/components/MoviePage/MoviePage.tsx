import "./MoviePage.scss";
import { movieApi } from "../../store";
import { Layout } from "../Layout/Layout";
import { Button } from "../Button/Button";
import { DetailsList } from "../DetailsList/DetailsList";
import { useImageErrorHandler } from "../../util/useImageErrorHandler";

/**
 * MoviePage Component
 *
 * A component that displays detailed information about a specific movie.
 * It fetches movie data using the `movieApi` and handles loading, error, and success states.
 * The component includes a back button, movie details, and error handling for the movie poster image.
 *
 * @component
 * @param {Object} props - React props
 * @param {number} props.id - The ID of the movie to fetch details for
 * @param {Function} props.onClickBack - Function to handle the back button click
 *
 * @returns {JSX.Element} The rendered movie page component
 */
export const MoviePage = ({
  id,
  onClickBack,
}: {
  id: number;
  onClickBack: () => void;
}) => {
  const {
    data: movie,
    isLoading,
    isError,
    isSuccess,
  } = movieApi.useMovieQuery({ id });
  const handleImageError = useImageErrorHandler();

  if (isLoading) return "loading...";
  if (isError) return "something went wrong";
  if (isSuccess) {
    const details: [string, string][] = [
      ["Runtime", `${movie.runtime} minutes`],
      ["Genres", movie.genres.map(({ name }) => name).join(", ")],
      ["Release Date", movie.release_date],
      [
        "Production Companies",
        movie.production_companies.map(({ name }) => name).join(", "),
      ],
      [
        "Languages",
        movie.spoken_languages
          .map(({ english_name }) => english_name)
          .join(", "),
      ],
    ];

    return (
      <Layout>
        <Button onClick={onClickBack}>Back</Button>
        <div className="movie">
          <div className="movie__poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="movie poster"
              onError={handleImageError} // Add error handling
            />
          </div>
          <div className="movie__details">
            <h1 className="movie__title">{movie.title}</h1>
            <h2 className="movie__tagline">{movie.tagline}</h2>
            <div className="movie__info">
              <p className="movie__overview">{movie.overview}</p>
              <DetailsList items={details} />
            </div>
            <p className="movie__rating">
              {movie.vote_average.toFixed(1)} out of 10
            </p>
          </div>
        </div>
      </Layout>
    );
  }
};
