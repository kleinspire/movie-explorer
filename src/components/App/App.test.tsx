import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { movieApi } from "../../store";

const MockedApiProvider = vi.fn(
  ({ children }: { children: React.ReactNode }) => (
    <div data-testid="api-provider">{children}</div>
  )
);

vi.mock("../../store", () => {
  return {
    movieApi: {},
  };
});

vi.doMock("@reduxjs/toolkit/query/react", () => {
  return {
    ApiProvider: MockedApiProvider,
  };
});

vi.mock("../ErrorBoundary/ErrorBoundary", () => {
  return {
    ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="error-boundary">{children}</div>
    ),
  };
});

vi.mock("../MovieRouter/MovieRouter", () => {
  return {
    MovieRouter: () => <div data-testid="movie-router">Movie Router</div>,
  };
});

describe("App", async () => {
  it("renders ErrorBoundary, ApiProvider, and MovieRouter", async () => {
    const { App } = await import("./App");

    render(<App />);

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    expect(screen.getByTestId("api-provider")).toBeInTheDocument();
    expect(screen.getByTestId("movie-router")).toBeInTheDocument();
    expect(screen.getByText("Movie Router")).toBeInTheDocument();

    // Verify that ApiProvider receives the correct api prop
    expect(MockedApiProvider).toHaveBeenCalledWith(
      expect.objectContaining({ api: movieApi }),
      expect.anything()
    );
  });
});
