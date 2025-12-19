/**
 * useRefresh Hook
 *
 * Custom hook for pull-to-refresh functionality.
 * Integrates with TanStack Query refetch.
 */

import * as Haptics from 'expo-haptics';
import { useCallback, useState } from 'react';
import { Platform } from 'react-native';

interface UseRefreshOptions {
  /**
   * Whether to trigger haptic feedback on refresh (iOS only)
   * @default true
   */
  hapticFeedback?: boolean;
  /**
   * Callback when refresh starts
   */
  onRefreshStart?: () => void;
  /**
   * Callback when refresh completes
   */
  onRefreshComplete?: () => void;
}

interface UseRefreshReturn {
  /**
   * Whether refresh is in progress
   */
  refreshing: boolean;
  /**
   * Refresh handler for RefreshControl
   */
  onRefresh: () => void;
}

/**
 * Custom hook for pull-to-refresh
 *
 * @param refetchFn - Function to refetch data (typically from TanStack Query)
 * @param options - Configuration options
 *
 * @example
 * ```tsx
 * function MyScreen() {
 *   const { data, refetch } = useQuery(...);
 *   const { refreshing, onRefresh } = useRefresh(refetch);
 *
 *   return (
 *     <ScrollView
 *       refreshControl={
 *         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
 *       }
 *     >
 *       {data}
 *     </ScrollView>
 *   );
 * }
 * ```
 */
export function useRefresh(
  refetchFn: () => Promise<unknown>,
  options: UseRefreshOptions = {},
): UseRefreshReturn {
  const { hapticFeedback = true, onRefreshStart, onRefreshComplete } = options;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    // Trigger haptic feedback on iOS
    if (hapticFeedback && Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setRefreshing(true);
    onRefreshStart?.();

    try {
      await refetchFn();
    } catch (error) {
      console.error('[useRefresh] Refetch failed:', error);
    } finally {
      setRefreshing(false);
      onRefreshComplete?.();
    }
  }, [refetchFn, hapticFeedback, onRefreshStart, onRefreshComplete]);

  return {
    refreshing,
    onRefresh,
  };
}
