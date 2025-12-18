/**
 * Axios API Client
 * 
 * Configured Axios instance with interceptors for authentication,
 * error handling, and request/response transformation.
 */

import { API_BASE_URL, API_CONFIG } from '@/constants/api';
import { getItem, removeItem, setItem } from '@/utils/storage';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { apiEndpoints } from './endpoints';
import {
  createApiError,
  formatErrorMessage,
  NetworkError,
  TimeoutError,
  UnauthorizedError,
} from './errors';
import type { ApiErrorResponse, RefreshTokenResponse } from './types';

/**
 * Storage keys for authentication tokens
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

/**
 * Flag to prevent multiple simultaneous token refresh requests
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}> = [];

/**
 * Process queued requests after token refresh
 */
function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
}

/**
 * Create and configure Axios instance
 */
function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_CONFIG.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request interceptor
   * Attaches authentication token to requests
   */
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Skip token attachment for auth endpoints
      const isAuthEndpoint =
        config.url?.includes('/auth/login') ||
        config.url?.includes('/auth/signup') ||
        config.url?.includes('/auth/refresh');

      if (!isAuthEndpoint) {
        const token = await getItem<string>(STORAGE_KEYS.ACCESS_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Log request in development
      if (API_CONFIG.enableLogging) {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });
      }

      return config;
    },
    (error) => {
      if (API_CONFIG.enableLogging) {
        console.error('[API] Request error:', error);
      }
      return Promise.reject(error);
    },
  );

  /**
   * Response interceptor
   * Handles errors, token refresh, and response transformation
   */
  client.interceptors.response.use(
    (response) => {
      // Log response in development
      if (API_CONFIG.enableLogging) {
        console.log(`[API] ${response.status} ${response.config.url}`, {
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Handle network errors
      if (!error.response) {
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          const timeoutError = new TimeoutError(formatErrorMessage(error), error);
          if (API_CONFIG.enableLogging) {
            console.error('[API] Timeout error:', timeoutError);
          }
          return Promise.reject(timeoutError);
        }

        const networkError = new NetworkError(formatErrorMessage(error), error);
        if (API_CONFIG.enableLogging) {
          console.error('[API] Network error:', networkError);
        }
        return Promise.reject(networkError);
      }

      const { status, data } = error.response;

      // Handle 401 Unauthorized - attempt token refresh
      if (status === 401 && originalRequest && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers && token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return client(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = await getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);

          if (!refreshToken) {
            throw new UnauthorizedError('No refresh token available');
          }

          // Attempt to refresh the token
          const response = await axios.post<RefreshTokenResponse>(
            `${API_BASE_URL}${apiEndpoints.auth.refresh()}`,
            { refreshToken },
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          // Store new tokens
          await Promise.all([
            setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
            setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken),
          ]);

          // Update the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          // Process queued requests
          processQueue(null, accessToken);

          // Retry the original request
          return client(originalRequest);
        } catch (refreshError) {
          // Token refresh failed - clear auth data and redirect to login
          processQueue(refreshError as Error, null);

          await Promise.all([
            removeItem(STORAGE_KEYS.ACCESS_TOKEN),
            removeItem(STORAGE_KEYS.REFRESH_TOKEN),
            removeItem('user'),
            removeItem('isLoggedIn'),
          ]);

          const unauthorizedError = new UnauthorizedError(
            'Session expired. Please login again.',
            data,
            refreshError,
          );

          if (API_CONFIG.enableLogging) {
            console.error('[API] Token refresh failed:', unauthorizedError);
          }

          // You can emit an event here to trigger navigation to login
          // For now, we'll just reject the error
          return Promise.reject(unauthorizedError);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle other HTTP errors
      const apiError = createApiError(
        status,
        data?.message || error.message || 'An error occurred',
        data,
        error,
      );

      if (API_CONFIG.enableLogging) {
        console.error(`[API] ${status} ${originalRequest?.url}:`, apiError);
      }

      return Promise.reject(apiError);
    },
  );

  return client;
}

/**
 * Default API client instance
 * Use this for all API requests
 */
export const apiClient = createApiClient();

/**
 * Create a new API client instance (useful for testing or special cases)
 */
export function createNewApiClient(config?: AxiosRequestConfig): AxiosInstance {
  const client = createApiClient();
  if (config) {
    Object.assign(client.defaults, config);
  }
  return client;
}

/**
 * Helper function to create request config with AbortController
 */
export function createRequestConfig(signal?: AbortSignal): AxiosRequestConfig {
  return {
    signal,
  };
}
