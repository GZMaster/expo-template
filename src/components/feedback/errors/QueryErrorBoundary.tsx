/**
 * QueryErrorBoundary Component
 *
 * Specialized error boundary for TanStack Query errors.
 * Provides better integration with query states and refetching.
 */

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorFallback } from './ErrorFallback';

interface QueryErrorBoundaryProps {
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
  onError?: (error: Error) => void;
}

/**
 * Query Error Boundary component
 *
 * Wraps components that use TanStack Query hooks.
 * Automatically resets query errors when retry is clicked.
 *
 * @example
 * ```tsx
 * <QueryErrorBoundary>
 *   <ComponentWithQueries />
 * </QueryErrorBoundary>
 * ```
 *
 * @example With custom fallback
 * ```tsx
 * <QueryErrorBoundary
 *   fallback={(error, reset) => (
 *     <CustomErrorUI error={error} onRetry={reset} />
 *   )}
 * >
 *   <ComponentWithQueries />
 * </QueryErrorBoundary>
 * ```
 */
export function QueryErrorBoundary({ children, fallback, onError }: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onError={(error) => {
            if (onError) {
              onError(error);
            }
          }}
          fallback={
            fallback ||
            ((error: Error, resetError: () => void) => (
              <ErrorFallback
                error={error}
                onReset={() => {
                  reset(); // Reset query errors
                  resetError(); // Reset error boundary
                }}
                showDetails={__DEV__}
              />
            ))
          }
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
