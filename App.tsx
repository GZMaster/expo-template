/**
 * App Entry Point
 * 
 * Main entry point for the application.
 * Wraps the app with necessary providers and navigation.
 */

import { ApiQueryClientProvider } from '@/api/queryClient';
import { AuthProvider } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { RootNavigator } from '@/navigation';
import { linking } from '@/navigation/linking';
import { createConfig, GluestackUIProvider } from '@gluestack-ui/themed';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
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
    <GluestackUIProvider colorMode={colorScheme === 'dark' ? 'dark' : 'light'} config={config}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ApiQueryClientProvider>
          <AuthProvider>
            <NavigationContainer linking={linking}>
              <RootNavigator />
              <StatusBar style="auto" />
            </NavigationContainer>
          </AuthProvider>
        </ApiQueryClientProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
