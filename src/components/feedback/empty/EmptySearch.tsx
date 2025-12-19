/**
 * EmptySearch Component
 *
 * Empty state for search with no results.
 */

import type { EmptyStateAction } from './EmptyState';
import { EmptyState } from './EmptyState';

interface EmptySearchProps {
  /**
   * The search query that returned no results
   */
  query?: string;
  /**
   * Custom title
   */
  title?: string;
  /**
   * Custom description
   */
  description?: string;
  /**
   * Action button (e.g., clear search, try different query)
   */
  action?: EmptyStateAction;
}

/**
 * Empty search results component
 *
 * @example
 * ```tsx
 * <EmptySearch
 *   query={searchQuery}
 *   action={{
 *     label: "Clear Search",
 *     onPress: handleClear
 *   }}
 * />
 * ```
 */
export function EmptySearch({ query, title, description, action }: EmptySearchProps) {
  const defaultTitle = query ? `No results for "${query}"` : 'No results found';
  const defaultDescription = query
    ? "Try adjusting your search or filters to find what you're looking for"
    : 'Try a different search query';

  return (
    <EmptyState
      icon='🔍'
      title={title || defaultTitle}
      description={description || defaultDescription}
      action={action}
    />
  );
}
