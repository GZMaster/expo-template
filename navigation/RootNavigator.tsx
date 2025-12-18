/**
 * Root Navigator
 * 
 * Main navigation container that conditionally renders either:
 * - AuthNavigator (when user is not authenticated)
 * - AppNavigator (when user is authenticated)
 */

import { useAuth } from '@/contexts/AuthContext';
import { Box } from '@gluestack-ui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Loading screen shown while checking authentication state
 */
function LoadingScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" />
    </Box>
  );
}

export function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking auth state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
