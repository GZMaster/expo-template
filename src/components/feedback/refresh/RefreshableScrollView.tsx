/**
 * RefreshableScrollView Component
 *
 * ScrollView wrapper with built-in pull-to-refresh functionality.
 */

import type { RefreshControlProps, ScrollViewProps } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRefresh } from './useRefresh';

interface RefreshableScrollViewProps extends Omit<ScrollViewProps, 'refreshControl'> {
  /**
   * Function to refetch data
   */
  onRefresh: () => Promise<unknown>;
  /**
   * Whether refresh is in progress (controlled mode)
   */
  refreshing?: boolean;
  /**
   * Additional RefreshControl props
   */
  refreshControlProps?: Partial<RefreshControlProps>;
  /**
   * Whether to enable haptic feedback (iOS only)
   * @default true
   */
  hapticFeedback?: boolean;
}

/**
 * ScrollView with pull-to-refresh
 *
 * @example
 * ```tsx
 * function MyScreen() {
 *   const { refetch } = useQuery(...);
 *
 *   return (
 *     <RefreshableScrollView onRefresh={refetch}>
 *       <YourContent />
 *     </RefreshableScrollView>
 *   );
 * }
 * ```
 *
 * @example Controlled mode
 * ```tsx
 * function MyScreen() {
 *   const { refetch, isRefetching } = useQuery(...);
 *
 *   return (
 *     <RefreshableScrollView
 *       onRefresh={refetch}
 *       refreshing={isRefetching}
 *     >
 *       <YourContent />
 *     </RefreshableScrollView>
 *   );
 * }
 * ```
 */
export function RefreshableScrollView({
  onRefresh,
  refreshing: controlledRefreshing,
  refreshControlProps,
  hapticFeedback = true,
  children,
  ...scrollViewProps
}: RefreshableScrollViewProps) {
  const colorScheme = useColorScheme();
  const { refreshing: hookRefreshing, onRefresh: handleRefresh } = useRefresh(onRefresh, {
    hapticFeedback,
  });

  // Use controlled refreshing if provided, otherwise use hook state
  const refreshing = controlledRefreshing !== undefined ? controlledRefreshing : hookRefreshing;
  const handleRefreshAction = controlledRefreshing !== undefined ? onRefresh : handleRefresh;

  return (
    <ScrollView
      {...scrollViewProps}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefreshAction}
          tintColor={colorScheme === 'dark' ? '#ffffff' : '#000000'}
          colors={['#000000']} // Android
          {...refreshControlProps}
        />
      }
    >
      {children}
    </ScrollView>
  );
}
