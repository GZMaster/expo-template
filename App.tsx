/**
 * App Entry Point
 *
 * Main entry point for the application.
 * Wraps the app with necessary providers and navigation.
 */

import { ErrorBoundary, ToastProvider } from '@/components/feedback';
import { AuthProvider } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { RootNavigator } from '@/navigation';
import { linking } from '@/navigation/linking';
import { queryClient } from '@/services/queryClient';
import { createConfig, GluestackUIProvider } from '@gluestack-ui/themed';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function App() {
  const colorScheme = useColorScheme();
  const config = createConfig({
    tokens: {
      colors: {
        primary: {
          value: '#000000',
        },
      },
    },
    aliases: {
      primary: 'primary',
    },
  });
  return (
    <ErrorBoundary>
      <GluestackUIProvider colorMode={colorScheme === 'dark' ? 'dark' : 'light'} config={config}>
        <ToastProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <NavigationContainer linking={linking}>
                  <RootNavigator />
                  <StatusBar style='auto' />
                </NavigationContainer>
              </AuthProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </ToastProvider>
      </GluestackUIProvider>
    </ErrorBoundary>
  );
}
