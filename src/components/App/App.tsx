import { ApiProvider } from "@reduxjs/toolkit/query/react";
import "./App.scss";
import { movieApi } from "../../store";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { MovieRouter } from "../MovieRouter/MovieRouter";

/**
 * App Component
 *
 * The root component of the application. It provides global error handling with `ErrorBoundary`
 * and sets up the API provider for Redux Toolkit Query with `ApiProvider`. The main content is
 * rendered by the `MovieRouter` component.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered application component
 */
export const App = () => {
  return (
    <ErrorBoundary>
      <ApiProvider api={movieApi}>
        <MovieRouter />
      </ApiProvider>
    </ErrorBoundary>
  );
};
