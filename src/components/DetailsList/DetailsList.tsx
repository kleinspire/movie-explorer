import "./DetailsList.scss";

interface DetailsListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: [string, string][];
}

/**
 * DetailsList Component
 *
 * A component that displays a list of label-value pairs next to each other.
 *
 * @component
 * @example
 * // Basic usage
 * <DetailsList
 *   items={[
 *     ["Name", "John Doe"],
 *     ["Age", "30"],
 *     ["Location", "New York"]
 *   ]}
 * />
 *
 * // With additional class name
 * <DetailsList
 *   className="custom-class"
 *   items={[
 *     ["Name", "Jane Smith"],
 *     ["Age", "25"],
 *     ["Location", "San Francisco"]
 *   ]}
 * />
 *
 * @param {Object} props - React props
 * @param {Array.<Array.<string>>} props.items - An array of label-value pairs to be displayed
 * @param {string} [props.className] - Additional custom class names to apply to the container
 * @param {Object} [props.rest] - Any other props passed to the container div element (e.g., style, id)
 *
 * @returns {JSX.Element} The rendered details list component
 */
export const DetailsList: React.FC<DetailsListProps> = ({
  items,
  className = "",
  ...rest
}) => {
  return (
    <div className={`details-list ${className}`} {...rest}>
      {items.map(([label, value], index) => (
        <div className="details-list__row" key={index}>
          <div className="details-list__label">{label}</div>
          <div className="details-list__value">{value}</div>
        </div>
      ))}
    </div>
  );
};
