/**
 * QueryWrapper Component
 *
 * Unified wrapper for TanStack Query states.
 * Handles loading, error, empty, and data states automatically.
 */

import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactElement, ReactNode } from 'react';
import { EmptyList } from './empty/EmptyList';
import { InlineError } from './errors/ErrorFallback';
import { LoadingSpinner } from './loading/LoadingSpinner';

interface QueryWrapperProps<TData> {
  /**
   * TanStack Query result object
   */
  query: UseQueryResult<TData, Error>;
  /**
   * Custom loading component
   */
  loading?: ReactElement;
  /**
   * Custom error component
   * Can be a component or function that receives error
   */
  error?: ReactElement | ((error: Error) => ReactElement);
  /**
   * Custom empty state component
   * Shown when data is null/undefined or empty array
   */
  empty?: ReactElement;
  /**
   * Function to check if data is empty
   * @default checks if data is falsy or empty array
   */
  isEmpty?: (data: TData) => boolean;
  /**
   * Children render function that receives data
   */
  children: (data: TData) => ReactNode;
  /**
   * Loading message
   */
  loadingMessage?: string;
  /**
   * Whether to show full screen loading
   * @default true
   */
  fullScreenLoading?: boolean;
}

/**
 * Query wrapper component
 *
 * Automatically handles all TanStack Query states and displays appropriate UI.
 *
 * @example Basic usage
 * ```tsx
 * <QueryWrapper query={useGetItems()}>
 *   {(data) => <ItemList items={data} />}
 * </QueryWrapper>
 * ```
 *
 * @example With custom components
 * ```tsx
 * <QueryWrapper
 *   query={useGetItems()}
 *   loading={<SkeletonList />}
 *   empty={<EmptyList />}
 *   error={(error) => <CustomError error={error} />}
 * >
 *   {(data) => <ItemList items={data} />}
 * </QueryWrapper>
 * ```
 *
 * @example With custom empty check
 * ```tsx
 * <QueryWrapper
 *   query={useGetUser()}
 *   isEmpty={(data) => !data.name}
 * >
 *   {(data) => <UserProfile user={data} />}
 * </QueryWrapper>
 * ```
 */
export function QueryWrapper<TData = unknown>({
  query,
  loading,
  error: customError,
  empty,
  isEmpty: customIsEmpty,
  children,
  loadingMessage,
  fullScreenLoading = true,
}: QueryWrapperProps<TData>) {
  const { data, isLoading, isError, error: queryError, refetch } = query;

  // Loading state
  if (isLoading) {
    if (loading) {
      return loading;
    }
    return <LoadingSpinner message={loadingMessage} fullScreen={fullScreenLoading} />;
  }

  // Error state
  if (isError && queryError) {
    if (customError) {
      if (typeof customError === 'function') {
        return customError(queryError);
      }
      return customError;
    }
    return <InlineError error={queryError} onRetry={() => refetch()} />;
  }

  // Check if data is empty
  const isDataEmpty = customIsEmpty
    ? customIsEmpty(data as TData)
    : !data || (Array.isArray(data) && data.length === 0);

  // Empty state
  if (isDataEmpty) {
    if (empty) {
      return empty;
    }
    return <EmptyList />;
  }

  // Data state
  return <>{children(data as TData)}</>;
}

/**
 * QueryWrapper with list-specific defaults
 *
 * Assumes data is an array and provides list-appropriate empty states
 */
export function QueryListWrapper<TItem = unknown>({
  query,
  loading,
  empty,
  error,
  children,
  loadingMessage = 'Loading items...',
}: Omit<QueryWrapperProps<TItem[]>, 'isEmpty' | 'fullScreenLoading' | 'loadingMessage'> & {
  loadingMessage?: string;
}) {
  return (
    <QueryWrapper<TItem[]>
      query={query}
      loading={loading}
      error={error}
      empty={empty}
      isEmpty={(data) => !data || data.length === 0}
      loadingMessage={loadingMessage}
      fullScreenLoading={true}
    >
      {children}
    </QueryWrapper>
  );
}
