/**
 * Query Keys Factory
 * 
 * Centralized query key management using the factory pattern.
 * Ensures consistent cache key generation across the application.
 */

/**
 * Base query key factory
 */
export const queryKeys = {
  /**
   * Authentication query keys
   */
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
    login: () => [...queryKeys.auth.all, 'login'] as const,
  },

  /**
   * User query keys
   */
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    me: () => [...queryKeys.users.all, 'me'] as const,
  },

  /**
   * Example resource query keys (Item)
   * Replace with your actual resource query keys
   */
  items: {
    all: ['items'] as const,
    lists: () => [...queryKeys.items.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.items.lists(), filters] as const,
    details: () => [...queryKeys.items.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.items.details(), id] as const,
  },
} as const;
