import React, { Component, ReactNode } from "react";
import "./ErrorBoundary.scss";

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

/**
 * ErrorBoundary Component
 *
 * A component that catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of the crashed component tree.
 *
 * @component
 * @extends Component
 * @param {Object} props - React props
 * @param {ReactNode} props.children - The child components to be wrapped by the error boundary
 *
 * @returns {JSX.Element} The rendered error boundary component
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1 className="error-boundary__title">Something went wrong.</h1>
          {this.state.error && (
            <p className="error-boundary__message">
              {this.state.error.message}
            </p>
          )}
          {this.state.errorInfo && (
            <details className="error-boundary__details">
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
