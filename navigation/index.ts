/**
 * Navigation Module Exports
 * 
 * Central export point for all navigation-related components and utilities.
 * Import from this file to use navigation throughout the app.
 */

export { AppNavigator } from './AppNavigator';
export { AuthNavigator } from './AuthNavigator';
export { linking } from './linking';
export { RootNavigator } from './RootNavigator';

// Export types
export type {
  AppNavigationProp, AppTabParamList, AppTabScreenProps, AuthNavigationProp, AuthStackParamList, AuthStackScreenProps, RootNavigationProp, RootStackParamList, RootStackScreenProps
} from './types';

/**
 * Typed Navigation Hooks
 * 
 * Use these hooks in your components for type-safe navigation:
 * 
 * @example
 * ```tsx
 * import { useAppNavigation } from '@/navigation';
 * 
 * function MyComponent() {
 *   const navigation = useAppNavigation();
 *   navigation.navigate('Home');
 * }
 * ```
 */

import type { NavigationProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type {
  AppTabParamList,
  AuthStackParamList,
  RootStackParamList
} from './types';

/**
 * Typed navigation hook for Root Navigator
 */
export function useRootNavigation(): NavigationProp<RootStackParamList> {
  return useNavigation<NavigationProp<RootStackParamList>>();
}

/**
 * Typed navigation hook for Auth Navigator
 */
export function useAuthNavigation(): NavigationProp<AuthStackParamList> {
  return useNavigation<NavigationProp<AuthStackParamList>>();
}

/**
 * Typed navigation hook for App Navigator (Tabs)
 */
export function useAppNavigation(): NavigationProp<AppTabParamList> {
  return useNavigation<NavigationProp<AppTabParamList>>();
}

/**
 * Typed route hook
 * Use with a specific screen name for full type safety
 * 
 * @example
 * ```tsx
 * import { useTypedRoute } from '@/navigation';
 * 
 * function MyScreen() {
 *   const route = useTypedRoute<'Home'>();
 *   // route.params is now typed based on the screen name
 *   }
 * ```
 */
export function useTypedRoute<T extends keyof AppTabParamList | keyof AuthStackParamList>() {
  return useRoute();
}
