/**
 * API Endpoints
 *
 * Centralized endpoint definitions using a factory pattern.
 * Provides type-safe endpoint generation with path parameters and query strings.
 */

/**
 * Base endpoint paths
 */
const ENDPOINTS = {
  // Authentication endpoints
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  // User endpoints
  users: {
    base: '/users',
    byId: (id: string) => `/users/${id}`,
    me: '/users/me',
    updateMe: '/users/me',
  },
  // Example resource endpoints (Item)
  items: {
    base: '/items',
    byId: (id: string) => `/items/${id}`,
  },
} as const;

/**
 * Create endpoint with query parameters
 */
function withQuery(endpoint: string, params?: Record<string, string | number | boolean>): string {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }

  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

/**
 * API Endpoints factory
 * Provides type-safe endpoint generation
 */
export const apiEndpoints = {
  /**
   * Authentication endpoints
   */
  auth: {
    login: () => ENDPOINTS.auth.login,
    signup: () => ENDPOINTS.auth.signup,
    logout: () => ENDPOINTS.auth.logout,
    refresh: () => ENDPOINTS.auth.refresh,
    me: () => ENDPOINTS.auth.me,
  },

  /**
   * User endpoints
   */
  users: {
    list: (params?: { page?: number; limit?: number }) => withQuery(ENDPOINTS.users.base, params),
    byId: (id: string) => ENDPOINTS.users.byId(id),
    me: () => ENDPOINTS.users.me,
    updateMe: () => ENDPOINTS.users.updateMe,
  },

  /**
   * Example resource endpoints (Item)
   * Replace with your actual resource endpoints
   */
  items: {
    list: (params?: { page?: number; limit?: number; search?: string }) =>
      withQuery(ENDPOINTS.items.base, params),
    byId: (id: string) => ENDPOINTS.items.byId(id),
    create: () => ENDPOINTS.items.base,
    update: (id: string) => ENDPOINTS.items.byId(id),
    delete: (id: string) => ENDPOINTS.items.byId(id),
  },
} as const;
