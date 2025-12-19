/**
 * ErrorBoundary Component
 *
 * React Error Boundary to catch JavaScript errors in component tree.
 * Must be a class component as per React requirements.
 */

import { logError } from '@/utils/errors';
import type React from 'react';
import { Component, type ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface ErrorBoundaryProps {
  /**
   * Child components to wrap
   */
  children: ReactNode;
  /**
   * Custom fallback component
   */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  /**
   * Callback when error is caught
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /**
   * Whether to show error details in production
   * @default false
   */
  showDetailsInProduction?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <YourApp />
 * </ErrorBoundary>
 * ```
 *
 * @example With custom fallback
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error
    logError(error, { componentStack: errorInfo.componentStack || undefined });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error, this.resetError);
        }
        return this.props.fallback;
      }

      // Default fallback
      return (
        <ErrorFallback
          error={this.state.error}
          onReset={this.resetError}
          showDetails={__DEV__ || this.props.showDetailsInProduction}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-friendly wrapper for ErrorBoundary
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <SafeArea fallback={<CustomError />}>
 *       <YourApp />
 *     </SafeArea>
 *   );
 * }
 * ```
 */
export function SafeArea({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}
