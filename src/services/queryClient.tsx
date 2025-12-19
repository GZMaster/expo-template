/**
 * TanStack Query Client Configuration
 *
 * Configured QueryClient with sensible defaults for caching,
 * retry logic, and error handling.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { API_CONFIG } from '@/constants/api';

/**
 * Calculate exponential backoff delay for retries
 */
function getRetryDelay(attemptIndex: number): number {
  return Math.min(API_CONFIG.retryDelay * 2 ** attemptIndex, 30000); // Max 30 seconds
}

/**
 * Create and configure QueryClient instance
 */
function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 5 minutes
        staleTime: 5 * 60 * 1000,
        // Data is kept in cache for 10 minutes after it becomes unused
        gcTime: 10 * 60 * 1000, // Previously cacheTime
        // Retry failed requests up to 3 times with exponential backoff
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          if (error && typeof error === 'object' && 'statusCode' in error) {
            const statusCode = (error as { statusCode: number }).statusCode;
            if (statusCode >= 400 && statusCode < 500) {
              return false;
            }
          }
          return failureCount < API_CONFIG.maxRetries;
        },
        retryDelay: getRetryDelay,
        // Refetch on window focus (useful for web, less relevant for mobile)
        refetchOnWindowFocus: false,
        // Refetch on reconnect
        refetchOnReconnect: true,
        // Don't refetch on mount if data is fresh
        refetchOnMount: true,
      },
      mutations: {
        // Retry failed mutations once
        retry: 1,
        retryDelay: getRetryDelay,
      },
    },
  });
}

/**
 * Default QueryClient instance
 * Use this throughout the application
 */
export const queryClient = createQueryClient();

/**
 * QueryClientProvider component
 * Wrap your app with this component to enable TanStack Query
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       <YourApp />
 *     </QueryClientProvider>
 *   );
 * }
 * ```
 */
export function ApiQueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

/**
 * Helper function to invalidate all queries
 * Useful for logout or major state changes
 */
export function invalidateAllQueries(): Promise<void> {
  return queryClient.invalidateQueries();
}

/**
 * Helper function to clear all query cache
 * Useful for logout
 */
export function clearAllQueries(): void {
  queryClient.clear();
}
