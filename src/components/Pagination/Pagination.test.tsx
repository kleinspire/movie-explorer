import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";

// Mock the Button component
vi.mock("../Button/Button", () => ({
  Button: ({
    onClick,
    disabled,
    children,
  }: {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
  }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

const mockUsePagination = vi.fn();

// Mock the usePagination hook
vi.mock("./usePagination", () => ({
  usePagination: mockUsePagination,
}));

describe("Pagination", () => {
  let setCurrentPage: Mock;
  let handlePreviousPage: Mock;
  let handleNextPage: Mock;

  beforeEach(() => {
    setCurrentPage = vi.fn();
    handlePreviousPage = vi.fn();
    handleNextPage = vi.fn();

    // Mock the usePagination to return the mock functions
    mockUsePagination.mockReturnValue({
      handlePreviousPage,
      handleNextPage,
    });
  });

  it("renders correctly and handles previous and next buttons", async () => {
    const currentPage = 2;
    const totalPages = 5;

    const { Pagination } = await import("./Pagination");

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    // Check that the current page and total pages are displayed
    expect(
      screen.getByText(`Page ${currentPage} of ${totalPages}`)
    ).toBeInTheDocument();

    // Check that the previous and next buttons are enabled
    const previousButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");
    expect(previousButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    // Simulate clicking the previous button
    fireEvent.click(previousButton);
    expect(handlePreviousPage).toHaveBeenCalled();

    // Simulate clicking the next button
    fireEvent.click(nextButton);
    expect(handleNextPage).toHaveBeenCalled();
  });

  it("disables the previous button on the first page", async () => {
    const currentPage = 1;
    const totalPages = 5;

    const { Pagination } = await import("./Pagination");

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    // Check that the previous button is disabled
    expect(screen.getByText("Previous")).toBeDisabled();

    // Check that the next button is enabled
    expect(screen.getByText("Next")).toBeEnabled();

    // Simulate clicking the next button
    fireEvent.click(screen.getByText("Next"));
    expect(handleNextPage).toHaveBeenCalled();
  });

  it("disables the next button on the last page", async () => {
    const currentPage = 5;
    const totalPages = 5;

    const { Pagination } = await import("./Pagination");

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    // Check that the next button is disabled
    expect(screen.getByText("Next")).toBeDisabled();

    // Check that the previous button is enabled
    expect(screen.getByText("Previous")).toBeEnabled();

    // Simulate clicking the previous button
    fireEvent.click(screen.getByText("Previous"));
    expect(handlePreviousPage).toHaveBeenCalled();
  });
});
