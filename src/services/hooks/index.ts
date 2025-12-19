/**
 * API Hooks Barrel Export
 *
 * Central export point for all API hooks.
 * Import hooks from this file for cleaner imports.
 */

// Authentication hooks
export {
  useAuthUser,
  useLogin,
  useLogout,
  useRefreshToken,
  useSignup,
} from './useAuth';
// Example resource hooks (Items)
export {
  useCreateItem,
  useDeleteItem,
  useGetItem,
  useGetItems,
  useUpdateItem,
} from './useItems';
// User hooks
export { useUpdateUser, useUser, useUserById } from './useUser';
