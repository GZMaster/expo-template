/**
 * Settings Screen
 * 
 * Application settings and preferences screen.
 */

import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { AppTabScreenProps } from '@/navigation/types';
import { Box, Card, Heading, HStack, Switch, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

type Props = AppTabScreenProps<'Settings'>;

export function SettingsScreen({ }: Props) {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();

  async function handleLogout() {
    await logout();
    // Navigation will happen automatically via RootNavigator when isAuthenticated changes
  }

  return (
    <ScrollView>
      <Box flex={1} p="$4" bg="$background">
        <VStack space="lg">
          <VStack space="sm">
            <Heading size="2xl">Settings</Heading>
            <Text size="md" color="$textLight500">
              Manage your app preferences and account settings.
            </Text>
          </VStack>

          <Card p="$4" bg="$backgroundLight0" borderRadius="$lg">
            <VStack space="md">
              <Heading size="lg">Appearance</Heading>
              <HStack justifyContent="space-between" alignItems="center" py="$2">
                <VStack flex={1}>
                  <Text fontWeight="$medium">Dark Mode</Text>
                  <Text size="sm" color="$textLight500">
                    Current: {colorScheme === 'dark' ? 'Dark' : 'Light'}
                  </Text>
                </VStack>
                <Switch
                  value={colorScheme === 'dark'}
                  onValueChange={() => {
                    // TODO: Implement theme toggle
                    console.log('Theme toggle not implemented yet');
                  }}
                />
              </HStack>
            </VStack>
          </Card>

          <Card p="$4" bg="$backgroundLight0" borderRadius="$lg">
            <VStack space="md">
              <Heading size="lg">Account</Heading>
              <VStack space="xs">
                <Text color="$textLight500">Logged in as:</Text>
                <Text fontWeight="$semibold">{user?.email || 'Unknown'}</Text>
              </VStack>
            </VStack>
          </Card>

          <Card p="$4" bg="$backgroundLight0" borderRadius="$lg">
            <VStack space="md">
              <Heading size="lg">About</Heading>
              <VStack space="xs">
                <Text color="$textLight500">App Version:</Text>
                <Text fontWeight="$semibold">1.0.0</Text>
              </VStack>
            </VStack>
          </Card>

          <Box p="$4" bg="$error50" borderRadius="$lg" borderWidth={1} borderColor="$error300">
            <VStack space="sm">
              <Heading size="lg" color="$error600">
                Danger Zone
              </Heading>
              <Text size="sm" color="$error600">
                Log out of your account. You'll need to sign in again to access the app.
              </Text>
              <Box mt="$2">
                <Box
                  as="button"
                  onPress={handleLogout}
                  bg="$error500"
                  px="$4"
                  py="$2"
                  borderRadius="$md"
                  alignItems="center">
                  <Text color="white" fontWeight="$semibold">
                    Logout
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}
