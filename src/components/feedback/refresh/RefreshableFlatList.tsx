/**
 * RefreshableFlatList Component
 *
 * FlatList wrapper with built-in pull-to-refresh functionality.
 */

import type { FlatListProps, RefreshControlProps } from 'react-native';
import { FlatList, RefreshControl } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRefresh } from './useRefresh';

interface RefreshableFlatListProps<T> extends Omit<FlatListProps<T>, 'refreshControl'> {
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
 * FlatList with pull-to-refresh
 *
 * @example
 * ```tsx
 * function MyScreen() {
 *   const { data, refetch } = useQuery(...);
 *
 *   return (
 *     <RefreshableFlatList
 *       data={data}
 *       onRefresh={refetch}
 *       renderItem={({ item }) => <ItemCard item={item} />}
 *       keyExtractor={(item) => item.id}
 *     />
 *   );
 * }
 * ```
 *
 * @example With isRefetching state
 * ```tsx
 * function MyScreen() {
 *   const { data, refetch, isRefetching } = useQuery(...);
 *
 *   return (
 *     <RefreshableFlatList
 *       data={data}
 *       onRefresh={refetch}
 *       refreshing={isRefetching}
 *       renderItem={({ item }) => <ItemCard item={item} />}
 *       keyExtractor={(item) => item.id}
 *     />
 *   );
 * }
 * ```
 */
export function RefreshableFlatList<T>({
  onRefresh,
  refreshing: controlledRefreshing,
  refreshControlProps,
  hapticFeedback = true,
  ...flatListProps
}: RefreshableFlatListProps<T>) {
  const colorScheme = useColorScheme();
  const { refreshing: hookRefreshing, onRefresh: handleRefresh } = useRefresh(onRefresh, {
    hapticFeedback,
  });

  // Use controlled refreshing if provided, otherwise use hook state
  const refreshing = controlledRefreshing !== undefined ? controlledRefreshing : hookRefreshing;
  const handleRefreshAction = controlledRefreshing !== undefined ? onRefresh : handleRefresh;

  return (
    <FlatList
      {...flatListProps}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefreshAction}
          tintColor={colorScheme === 'dark' ? '#ffffff' : '#000000'}
          colors={['#000000']} // Android
          {...refreshControlProps}
        />
      }
    />
  );
}
