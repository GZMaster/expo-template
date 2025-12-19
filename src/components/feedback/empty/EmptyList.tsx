/**
 * EmptyList Component
 *
 * Empty state for lists with no data.
 */

import type { EmptyStateAction } from './EmptyState';
import { EmptyState } from './EmptyState';

interface EmptyListProps {
  /**
   * Custom title
   * @default "No items yet"
   */
  title?: string;
  /**
   * Custom description
   * @default "Items will appear here once they're added"
   */
  description?: string;
  /**
   * Custom icon
   * @default "📋"
   */
  icon?: string;
  /**
   * Action button
   */
  action?: EmptyStateAction;
}

/**
 * Empty list component
 *
 * @example
 * ```tsx
 * <EmptyList
 *   action={{
 *     label: "Add Item",
 *     onPress: handleAdd
 *   }}
 * />
 * ```
 */
export function EmptyList({
  title = 'No items yet',
  description = "Items will appear here once they're added",
  icon = '📋',
  action,
}: EmptyListProps) {
  return <EmptyState icon={icon} title={title} description={description} action={action} />;
}

/**
 * Empty inbox component
 */
export function EmptyInbox({
  title = 'Inbox Zero!',
  description = "You're all caught up. Great job!",
  icon = '📭',
}: Omit<EmptyListProps, 'action'>) {
  return <EmptyState icon={icon} title={title} description={description} />;
}

/**
 * Empty favorites component
 */
export function EmptyFavorites({
  title = 'No favorites yet',
  description = 'Items you favorite will appear here',
  icon = '⭐',
  action,
}: EmptyListProps) {
  return <EmptyState icon={icon} title={title} description={description} action={action} />;
}
