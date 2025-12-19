/**
 * NoConnection Component
 *
 * Empty state for no internet connection.
 */

import type { EmptyStateAction } from './EmptyState';
import { EmptyState } from './EmptyState';

interface NoConnectionProps {
  /**
   * Custom title
   */
  title?: string;
  /**
   * Custom description
   */
  description?: string;
  /**
   * Retry action
   */
  onRetry?: () => void;
}

/**
 * No internet connection component
 *
 * @example
 * ```tsx
 * <NoConnection onRetry={handleRetry} />
 * ```
 */
export function NoConnection({ title, description, onRetry }: NoConnectionProps) {
  const action: EmptyStateAction | undefined = onRetry
    ? {
        label: 'Try Again',
        onPress: onRetry,
      }
    : undefined;

  return (
    <EmptyState
      icon='📡'
      title={title || 'No Internet Connection'}
      description={
        description ||
        "Check your connection and try again. Make sure you're connected to the internet."
      }
      action={action}
    />
  );
}

/**
 * Server error component
 */
export function ServerError({ onRetry }: { onRetry?: () => void }) {
  const action: EmptyStateAction | undefined = onRetry
    ? {
        label: 'Try Again',
        onPress: onRetry,
      }
    : undefined;

  return (
    <EmptyState
      icon='🔧'
      title='Server Error'
      description="Something went wrong on our end. We're working on it. Please try again later."
      action={action}
    />
  );
}

/**
 * Maintenance mode component
 */
export function MaintenanceMode() {
  return (
    <EmptyState
      icon='🚧'
      title='Under Maintenance'
      description="We're currently performing maintenance. We'll be back shortly. Thank you for your patience."
    />
  );
}
