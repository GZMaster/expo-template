/**
 * API Configuration Constants
 * 
 * Centralized configuration for API client settings.
 * Uses environment variables for different environments.
 */

import Constants from 'expo-constants';

/**
 * Get API base URL from environment variables
 * Falls back to localhost for development if not set
 */
export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl ||
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'http://localhost:3000/api';

/**
 * API configuration constants
 */
export const API_CONFIG = {
  /** Request timeout in milliseconds */
  timeout: 10000,
  /** Maximum number of retry attempts */
  maxRetries: 3,
  /** Base retry delay in milliseconds */
  retryDelay: 1000,
  /** Whether to enable request/response logging in development */
  enableLogging: __DEV__,
} as const;

/**
 * API response status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
