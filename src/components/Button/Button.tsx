import React from "react";
import "./Button.scss";

/**
 * Button Component
 *
 * A reusable button component that accepts all standard button attributes.
 *
 * @component
 * @example
 * // Basic usage
 * <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
 *
 * // With additional class name
 * <Button className="custom-class">Click Me</Button>
 *
 * // Disabled state
 * <Button disabled>Disabled Button</Button>
 *
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - The content to be displayed inside the button
 * @param {string} [props.className] - Additional custom class names to apply to the button
 * @param {boolean} [props.disabled] - Boolean flag to disable the button
 * @param {Object} [props.rest] - Any other props passed to the button element (e.g., onClick, style)
 *
 * @returns {JSX.Element} The rendered button component
 */
export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = "", disabled = false, ...rest }) => (
  <button
    disabled={disabled}
    className={`button ${disabled ? "button--disabled" : ""} ${className}`}
    {...rest}
  >
    {children}
  </button>
);
