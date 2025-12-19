/**
 * UI Error Utilities
 *
 * Error utilities for UI components, particularly error boundaries.
 * Provides logging and message extraction for user-facing error displays.
 */

import { formatErrorMessage } from '@/services/errors';

/**
 * Log error to console and external error tracking service
 * @param error - The error to log
 * @param errorInfo - Additional error information (e.g., component stack)
 */
export function logError(error: Error, errorInfo?: { componentStack?: string }): void {
  // Log to console in development
  if (__DEV__) {
    console.error('[Error Boundary] Caught an error:', error);
    if (errorInfo?.componentStack) {
      console.error('Component stack:', errorInfo.componentStack);
    }
  }

  // TODO: Send to error tracking service (e.g., Sentry)
  // Example:
  // Sentry.captureException(error, {
  //   contexts: {
  //     react: {
  //       componentStack: errorInfo?.componentStack,
  //     },
  //   },
  // });
}

/**
 * Get user-friendly error message from any error type
 * @param error - The error to extract message from
 * @returns User-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  // Use existing formatErrorMessage from services
  return formatErrorMessage(error);
}

/**
 * Check if error is a network-related error
 * @param error - The error to check
 * @returns true if error is network-related
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      error.name === 'NetworkError' ||
      error.name === 'TimeoutError'
    );
  }
  return false;
}

/**
 * Get error title based on error type
 * @param error - The error to get title for
 * @returns Error title
 */
export function getErrorTitle(error: unknown): string {
  if (isNetworkError(error)) {
    return 'Connection Error';
  }

  if (error instanceof Error) {
    if (error.name === 'UnauthorizedError') {
      return 'Authentication Required';
    }
    if (error.name === 'ForbiddenError') {
      return 'Access Denied';
    }
    if (error.name === 'NotFoundError') {
      return 'Not Found';
    }
  }

  return 'Something went wrong';
}
