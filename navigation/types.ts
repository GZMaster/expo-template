/**
 * Navigation Type Definitions
 * 
 * This file contains all TypeScript type definitions for React Navigation.
 * It ensures type safety when navigating between screens and passing parameters.
 */

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root Stack Navigator Param List
 * This is the top-level navigator that switches between Auth and App flows
 */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
};

/**
 * Authentication Stack Navigator Param List
 * Contains all screens in the authentication flow
 */
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

/**
 * Main App Tab Navigator Param List
 * Contains all tabs in the main application
 */
export type AppTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Settings: undefined;
};

/**
 * Navigation Props Types
 * Use these types for screen components to get typed navigation props
 */

// Root Stack Navigation Props
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

// Auth Stack Navigation Props
export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

// App Tab Navigation Props
export type AppTabScreenProps<T extends keyof AppTabParamList> = BottomTabScreenProps<
  AppTabParamList,
  T
>;

/**
 * Navigation and Route Hooks Types
 * These types are used with useNavigation and useRoute hooks
 */
export type RootNavigationProp = NativeStackScreenProps<RootStackParamList>['navigation'];
export type AuthNavigationProp = NativeStackScreenProps<AuthStackParamList>['navigation'];
export type AppNavigationProp = BottomTabScreenProps<AppTabParamList>['navigation'];

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
