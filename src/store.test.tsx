import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { movieApi, baseQuery } from "./store";
import {
  fetchBaseQuery,
  ApiProvider,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { render } from "@testing-library/react";
import { ReactNode } from "react";

const renderWithProviders = (ui: ReactNode) => {
  return render(<ApiProvider api={movieApi}>{ui}</ApiProvider>);
};

// Mock fetchBaseQuery and include other necessary functions
vi.mock("@reduxjs/toolkit/query/react", async (importOriginal) => {
  const actual =
    (await importOriginal()) as typeof import("@reduxjs/toolkit/query/react");
  return {
    ...actual,
    fetchBaseQuery: vi.fn().mockImplementation(() => async (args: string) => {
      if (args.includes("movies")) {
        return { data: { movies: [] } };
      }
      if (args.includes("movie")) {
        return { data: { id: 1, title: "Test Movie" } };
      }
      if (args.includes("search")) {
        return { data: { movies: [] } };
      }
      return { error: { status: 500, data: "Internal Server Error" } }; // Mock error
    }),
  };
});

describe("movieApi", () => {
  beforeEach(() => {
    (fetchBaseQuery as Mock).mockClear();
  });

  it("should set up the base query correctly", async () => {
    const args = "test";
    const api: BaseQueryApi = {
      signal: new AbortController().signal,
      abort: () => {},
      dispatch: () => {},
      getState: () => {},
      extra: undefined,
      type: "query",
      endpoint: "testEndpoint",
    };
    const extraOptions = {};
    const mockResult = { data: "testData" };

    (fetchBaseQuery as Mock).mockReturnValueOnce(async () => mockResult);

    const result = await baseQuery(args, api, extraOptions);

    expect(result).toEqual(mockResult);
    expect(fetchBaseQuery).toHaveBeenCalledWith({
      baseUrl: "http://localhost:4000/",
    });
  });

  it("should log error to console if error occurs in baseQuery", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const args = "test";
    const api: BaseQueryApi = {
      signal: new AbortController().signal,
      abort: () => {},
      dispatch: () => {},
      getState: () => {},
      extra: undefined,
      type: "query",
      endpoint: "testEndpoint",
    };
    const extraOptions = {};
    const mockError = { error: { status: 500, data: "Internal Server Error" } };

    (fetchBaseQuery as Mock).mockReturnValueOnce(async () => mockError);

    await baseQuery(args, api, extraOptions);

    expect(consoleErrorSpy).toHaveBeenCalledWith("API Error:", mockError.error);

    consoleErrorSpy.mockRestore();
  });

  it("movies endpoint should return correct query", async () => {
    const TestComponent = () => {
      const { data, error } = movieApi.useMoviesQuery({ page: 1 });
      if (error) return <div>Error</div>;
      return <div>{data ? "Success" : "Loading"}</div>;
    };

    const { findByText } = renderWithProviders(<TestComponent />);
    expect(await findByText(/Success/)).toBeInTheDocument();
  });

  it("movie endpoint should return correct query", async () => {
    const TestComponent = () => {
      const { data, error } = movieApi.useMovieQuery({ id: 1 });
      if (error) return <div>Error</div>;
      return <div>{data ? "Success" : "Loading"}</div>;
    };

    const { findByText } = renderWithProviders(<TestComponent />);
    expect(await findByText(/Success/)).toBeInTheDocument();
  });

  it("search endpoint should return correct query", async () => {
    const TestComponent = () => {
      const { data, error } = movieApi.useSearchQuery({
        query: "test",
        page: 1,
      });
      if (error) return <div>Error</div>;
      return <div>{data ? "Success" : "Loading"}</div>;
    };

    const { findByText } = renderWithProviders(<TestComponent />);
    expect(await findByText(/Success/)).toBeInTheDocument();
  });
});
