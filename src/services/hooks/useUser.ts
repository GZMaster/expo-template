/**
 * User Management Hooks
 *
 * React Query hooks for user-related operations.
 * Provides queries and mutations for user data management.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import { setItem } from '@/utils/storage';
import { apiClient } from '../client';
import { apiEndpoints } from '../endpoints';
import { queryKeys } from '../queryKeys';
import type { UpdateUserRequest, UserResponse } from '../types';

/**
 * Get current user query hook
 * Fetches the authenticated user's profile
 *
 * @example
 * ```tsx
 * function ProfileScreen() {
 *   const { data: user, isLoading, error } = useUser();
 *
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *
 *   return (
 *     <View>
 *       <Text>{user?.name}</Text>
 *       <Text>{user?.email}</Text>
 *     </View>
 *   );
 * }
 * ```
 */
export function useUser() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: async (): Promise<User> => {
      const response = await apiClient.get<UserResponse>(apiEndpoints.users.me());
      return response.data.data;
    },
    enabled: isAuthenticated, // Only fetch if authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Get user by ID query hook
 *
 * @param userId - The ID of the user to fetch
 * @param enabled - Whether the query should run (default: true)
 *
 * @example
 * ```tsx
 * function UserProfileScreen({ userId }: { userId: string }) {
 *   const { data: user, isLoading } = useUserById(userId);
 *
 *   if (isLoading) return <Loading />;
 *
 *   return <Text>{user?.name}</Text>;
 * }
 * ```
 */
export function useUserById(userId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: async (): Promise<User> => {
      const response = await apiClient.get<UserResponse>(apiEndpoints.users.byId(userId));
      return response.data.data;
    },
    enabled: enabled && !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Update current user mutation hook
 *
 * @example
 * ```tsx
 * function EditProfileScreen() {
 *   const { mutate: updateUser, isPending } = useUpdateUser();
 *   const [name, setName] = useState('');
 *
 *   const handleSave = () => {
 *     updateUser({ name }, {
 *       onSuccess: () => {
 *         // Show success message
 *       }
 *     });
 *   };
 *
 *   return <Button onPress={handleSave}>Save</Button>;
 * }
 * ```
 */
export function useUpdateUser() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserRequest): Promise<User> => {
      const response = await apiClient.put<UserResponse>(apiEndpoints.users.updateMe(), data);
      return response.data.data;
    },
    onSuccess: async (updatedUser) => {
      // Update user in storage
      await setItem('user', updatedUser);

      // Update auth context
      setUser(updatedUser);

      // Invalidate and refetch user queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.users.me() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() }),
      ]);
    },
    onError: (error) => {
      console.error('[useUpdateUser] Update failed:', error);
    },
  });
}
