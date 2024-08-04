import { useState, useEffect } from "react";
import { debounce } from "lodash";

interface UseDebouncedValueProps {
  initialValue: string;
  onFlush: (value: string) => void;
  debounceDelay?: number;
}

/**
 * useDebouncedValue Hook
 *
 * A custom hook that debounces the value updates and triggers a callback when the debounced value changes.
 *
 * @example
 * // Basic usage
 * const Component = () => {
 *   const { value, setValue } = useDebouncedValue({
 *     initialValue: "",
 *     onFlush: (debouncedValue) => {
 *       console.log(debouncedValue);
 *     },
 *     debounceDelay: 300,
 *   });
 *
 *   return (
 *     <input
 *       type="text"
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   );
 * };
 *
 * @param {Object} props - Hook parameters
 * @param {string} props.initialValue - The initial value for the state
 * @param {Function} props.onFlush - Callback function to be called with the debounced value
 * @param {number} [props.debounceDelay=300] - Delay in milliseconds for the debounce function
 *
 * @returns {Object} An object containing the current value and a function to update the value
 */
export const useDebouncedValue = ({
  initialValue,
  onFlush,
  debounceDelay = 300,
}: UseDebouncedValueProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const handler = debounce((value: string) => onFlush(value), debounceDelay);
    handler(value);
    return () => {
      handler.cancel();
    };
  }, [value, onFlush, debounceDelay]);

  return {
    value,
    setValue,
  };
};
