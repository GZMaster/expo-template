/**
 * Authentication Hooks
 *
 * React Query hooks for authentication operations.
 * Integrates with AuthContext and AsyncStorage for state management.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getItem, multiSet, removeItem } from '@/utils/storage';
import { apiClient } from '../client';
import { apiEndpoints } from '../endpoints';
import { clearAllQueries } from '../queryClient';
import { queryKeys } from '../queryKeys';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignupRequest,
  SignupResponse,
} from '../types';

/**
 * Storage keys for authentication tokens
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

/**
 * Login mutation hook
 *
 * @example
 * ```tsx
 * function LoginScreen() {
 *   const { mutate: login, isPending, error } = useLogin();
 *
 *   const handleLogin = () => {
 *     login({ email: 'user@example.com', password: 'password' });
 *   };
 *
 *   return <Button onPress={handleLogin}>Login</Button>;
 * }
 * ```
 */
export function useLogin() {
  const { setIsAuthenticated, setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const response = await apiClient.post<LoginResponse>(apiEndpoints.auth.login(), credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      // Store tokens and user data
      await multiSet([
        ['user', data.user],
        [STORAGE_KEYS.ACCESS_TOKEN, data.accessToken],
        [STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken],
        ['isLoggedIn', true],
      ]);

      // Update auth context
      setIsAuthenticated(true);
      setUser(data.user);

      // Invalidate and refetch user-related queries
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
    onError: (error) => {
      console.error('[useLogin] Login failed:', error);
    },
  });
}

/**
 * Signup mutation hook
 *
 * @example
 * ```tsx
 * function SignupScreen() {
 *   const { mutate: signup, isPending, error } = useSignup();
 *
 *   const handleSignup = () => {
 *     signup({ email: 'user@example.com', password: 'password', name: 'John' });
 *   };
 *
 *   return <Button onPress={handleSignup}>Sign Up</Button>;
 * }
 * ```
 */
export function useSignup() {
  const { setIsAuthenticated, setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignupRequest): Promise<SignupResponse> => {
      const response = await apiClient.post<SignupResponse>(
        apiEndpoints.auth.signup(),
        credentials,
      );
      return response.data;
    },
    onSuccess: async (data) => {
      // Store tokens and user data
      await multiSet([
        ['user', data.user],
        [STORAGE_KEYS.ACCESS_TOKEN, data.accessToken],
        [STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken],
        ['isLoggedIn', true],
      ]);

      // Update auth context
      setIsAuthenticated(true);
      setUser(data.user);

      // Invalidate and refetch user-related queries
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
    onError: (error) => {
      console.error('[useSignup] Signup failed:', error);
    },
  });
}

/**
 * Logout mutation hook
 * Clears all authentication data and query cache
 *
 * @example
 * ```tsx
 * function ProfileScreen() {
 *   const { mutate: logout, isPending } = useLogout();
 *
 *   return <Button onPress={() => logout()}>Logout</Button>;
 * }
 * ```
 */
export function useLogout() {
  const { setIsAuthenticated, setUser } = useAuth();
  const _queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        // Call logout endpoint (optional, may fail if already logged out)
        await apiClient.post(apiEndpoints.auth.logout());
      } catch (error) {
        // Ignore errors from logout endpoint
        console.warn('[useLogout] Logout endpoint failed:', error);
      }
    },
    onSuccess: async () => {
      // Clear all storage
      await Promise.all([
        removeItem('user'),
        removeItem(STORAGE_KEYS.ACCESS_TOKEN),
        removeItem(STORAGE_KEYS.REFRESH_TOKEN),
        removeItem('isLoggedIn'),
      ]);

      // Clear all query cache
      clearAllQueries();

      // Update auth context
      setIsAuthenticated(false);
      setUser(null);
    },
    onError: async (error) => {
      console.error('[useLogout] Logout failed:', error);

      // Even if API call fails, clear local data
      await Promise.all([
        removeItem('user'),
        removeItem(STORAGE_KEYS.ACCESS_TOKEN),
        removeItem(STORAGE_KEYS.REFRESH_TOKEN),
        removeItem('isLoggedIn'),
      ]);

      clearAllQueries();
      setIsAuthenticated(false);
      setUser(null);
    },
  });
}

/**
 * Refresh token mutation hook
 * Used internally by the API client, but can be called manually if needed
 *
 * @example
 * ```tsx
 * function TokenRefreshButton() {
 *   const { mutate: refreshToken, isPending } = useRefreshToken();
 *
 *   return <Button onPress={() => refreshToken()}>Refresh Token</Button>;
 * }
 * ```
 */
export function useRefreshToken() {
  return useMutation({
    mutationFn: async (): Promise<RefreshTokenResponse> => {
      const refreshToken = await getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<RefreshTokenResponse>(apiEndpoints.auth.refresh(), {
        refreshToken,
      } as RefreshTokenRequest);

      return response.data;
    },
    onSuccess: async (data) => {
      // Store new tokens
      await multiSet([
        [STORAGE_KEYS.ACCESS_TOKEN, data.accessToken],
        [STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken],
      ]);
    },
    onError: (error) => {
      console.error('[useRefreshToken] Token refresh failed:', error);
    },
  });
}

/**
 * Get current authenticated user query hook
 *
 * @example
 * ```tsx
 * function ProfileScreen() {
 *   const { data: user, isLoading, error } = useAuthUser();
 *
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error />;
 *
 *   return <Text>Welcome, {user?.name}</Text>;
 * }
 * ```
 */
export function useAuthUser() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      const response = await apiClient.get(apiEndpoints.auth.me());
      return response.data;
    },
    enabled: isAuthenticated, // Only fetch if authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}
