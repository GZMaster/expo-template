/**
 * Deep Linking Configuration
 *
 * This file configures deep linking for React Navigation.
 * It maps URL paths to navigation routes.
 */

import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import type { RootStackParamList } from './types';

/**
 * Deep linking configuration
 * Maps URL paths to navigation routes
 */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'expotemplate://'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'auth/login',
          Signup: 'auth/signup',
          ForgotPassword: 'auth/forgot-password',
        },
      },
      App: {
        screens: {
          Home: 'main/home',
          Search: 'main/search',
          Profile: 'main/profile',
          Settings: 'main/settings',
        },
      },
    },
  },
};
