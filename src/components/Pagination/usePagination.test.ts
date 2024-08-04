import { renderHook, act } from "@testing-library/react-hooks";
import { usePagination } from "./usePagination";
import { vi, describe, it, expect } from "vitest";

describe("usePagination", () => {
  it("handles previous page correctly", () => {
    const setCurrentPage = vi.fn();
    const currentPage = 2;
    const totalPages = 5;

    const { result } = renderHook(() =>
      usePagination(currentPage, totalPages, setCurrentPage)
    );

    act(() => {
      result.current.handlePreviousPage();
    });

    expect(setCurrentPage).toHaveBeenCalledWith(currentPage - 1);
  });

  it("handles next page correctly", () => {
    const setCurrentPage = vi.fn();
    const currentPage = 2;
    const totalPages = 5;

    const { result } = renderHook(() =>
      usePagination(currentPage, totalPages, setCurrentPage)
    );

    act(() => {
      result.current.handleNextPage();
    });

    expect(setCurrentPage).toHaveBeenCalledWith(currentPage + 1);
  });

  it("does not go to a previous page if already on the first page", () => {
    const setCurrentPage = vi.fn();
    const currentPage = 1;
    const totalPages = 5;

    const { result } = renderHook(() =>
      usePagination(currentPage, totalPages, setCurrentPage)
    );

    act(() => {
      result.current.handlePreviousPage();
    });

    expect(setCurrentPage).not.toHaveBeenCalled();
  });

  it("does not go to a next page if already on the last page", () => {
    const setCurrentPage = vi.fn();
    const currentPage = 5;
    const totalPages = 5;

    const { result } = renderHook(() =>
      usePagination(currentPage, totalPages, setCurrentPage)
    );

    act(() => {
      result.current.handleNextPage();
    });

    expect(setCurrentPage).not.toHaveBeenCalled();
  });
});
