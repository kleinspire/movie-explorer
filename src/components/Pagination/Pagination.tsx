import "./Pagination.scss";
import { Button } from "../Button/Button";
import { usePagination } from "./usePagination";

/**
 * Pagination Component
 *
 * A reusable component for pagination controls, providing "Previous" and "Next" buttons to navigate through pages.
 *
 * @component
 * @example
 * // Basic usage
 * const [currentPage, setCurrentPage] = useState(1);
 * const totalPages = 10;
 *
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   setCurrentPage={setCurrentPage}
 * />
 *
 * @param {Object} props - React props
 * @param {number} props.currentPage - The current page number
 * @param {number} props.totalPages - The total number of pages
 * @param {Function} props.setCurrentPage - Function to update the current page number
 *
 * @returns {JSX.Element} The rendered pagination component
 */
export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) => {
  const { handlePreviousPage, handleNextPage } = usePagination(
    currentPage,
    totalPages,
    setCurrentPage
  );

  return (
    <div className="pagination">
      <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </Button>
      <span className="pagination__text">
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};
