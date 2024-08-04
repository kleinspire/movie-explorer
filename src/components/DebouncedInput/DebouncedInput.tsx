import { Input } from "../Input/Input";
import { useDebouncedValue } from "../../util/useDebouncedValue";

interface DebouncedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  initialValue: string;
  onValueChange: (value: string) => void;
  debounceDelay?: number;
}

/**
 * DebouncedInput Component
 *
 * A reusable input component with debounced value updates.
 *
 * @component
 * @example
 * // Basic usage
 * const handleValueChange = (debouncedValue) => {
 *   console.log(debouncedValue);
 * };
 *
 * <DebouncedInput
 *   initialValue=""
 *   onValueChange={handleValueChange}
 *   debounceDelay={300}
 * />
 *
 * @param {Object} props - React props
 * @param {string} props.initialValue - The initial value for the input
 * @param {Function} props.onValueChange - Callback function to be called with the debounced value
 * @param {number} [props.debounceDelay=300] - Delay in milliseconds for the debounce function
 * @param {Object} [props.rest] - Any other props passed to the input element (e.g., placeholder, className)
 *
 * @returns {JSX.Element} The rendered debounced input component
 */
export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  initialValue,
  onValueChange,
  debounceDelay = 300,
  ...rest
}) => {
  const { value, setValue } = useDebouncedValue({
    initialValue,
    onFlush: onValueChange,
    debounceDelay,
  });

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  );
};
