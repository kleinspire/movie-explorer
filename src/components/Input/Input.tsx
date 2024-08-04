import React from "react";
import "./Input.scss";

/**
 * Input Component
 *
 * A reusable input component that accepts all standard input attributes.
 *
 * @component
 * @example
 * // Basic usage
 * <Input placeholder="Enter text here" onChange={(e) => console.log(e.target.value)} />
 *
 * // With additional class name
 * <Input className="custom-class" placeholder="Enter text here" />
 *
 * @param {Object} props - React props
 * @param {string} [props.className] - Additional custom class names to apply to the input
 * @param {Object} [props.rest] - Any other props passed to the input element (e.g., type, value, onChange)
 *
 * @returns {JSX.Element} The rendered input component
 */
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...rest
}) => <input className={`input ${className}`} {...rest} />;
