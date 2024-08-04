import { useCallback } from "react";

/**
 * usePagination Hook
 *
 * A custom hook to manage pagination logic, providing functions to handle moving to the previous and next pages.
 *
 * @example
 * // Basic usage
 * const Component = () => {
 *   const [currentPage, setCurrentPage] = useState(1);
 *   const totalPages = 10;
 *
 *   const { handlePreviousPage, handleNextPage } = usePagination(
 *     currentPage,
 *     totalPages,
 *     setCurrentPage
 *   );
 *
 *   return (
 *     <div>
 *       <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
 *       <span>Page {currentPage} of {totalPages}</span>
 *       <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
 *     </div>
 *   );
 * };
 *
 * @param {number} currentPage - The current page number
 * @param {number} totalPages - The total number of pages
 * @param {Function} setCurrentPage - Function to set the current page number
 *
 * @returns {Object} An object containing handlers for navigating to the previous and next pages
 */
export const usePagination = (
  currentPage: number,
  totalPages: number,
  setCurrentPage: (page: number) => void
) => {
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  return {
    handlePreviousPage,
    handleNextPage,
  };
};
