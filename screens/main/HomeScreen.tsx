/**
 * Home Screen
 * 
 * Main home screen of the application.
 * First screen shown after authentication.
 */

import { useAuth } from '@/contexts/AuthContext';
import { useAppNavigation } from '@/navigation';
import type { AppTabScreenProps } from '@/navigation/types';
import { Box, Button, ButtonText, Card, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

type Props = AppTabScreenProps<'Home'>;

export function HomeScreen({ }: Props) {
  const navigation = useAppNavigation();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    // Navigation will happen automatically via RootNavigator when isAuthenticated changes
  }

  return (
    <ScrollView>
      <Box flex={1} p="$4" bg="$background">
        <VStack space="lg">
          <VStack space="sm">
            <Heading size="2xl">Welcome{user?.name ? `, ${user.name}` : ''}!</Heading>
            <Text size="md" color="$textLight500">
              This is your home screen. Explore the app using the tabs below.
            </Text>
          </VStack>

          <Card p="$4" bg="$backgroundLight0" borderRadius="$lg">
            <VStack space="md">
              <Heading size="lg">Quick Actions</Heading>
              <VStack space="sm">
                <Button onPress={() => navigation.navigate('Search')}>
                  <ButtonText>Go to Search</ButtonText>
                </Button>
                <Button onPress={() => navigation.navigate('Profile')} variant="outline">
                  <ButtonText>View Profile</ButtonText>
                </Button>
                <Button onPress={() => navigation.navigate('Settings')} variant="outline">
                  <ButtonText>Settings</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </Card>

          <Card p="$4" bg="$backgroundLight0" borderRadius="$lg">
            <VStack space="md">
              <Heading size="lg">Account</Heading>
              <VStack space="xs">
                <HStack justifyContent="space-between">
                  <Text color="$textLight500">Email:</Text>
                  <Text fontWeight="$semibold">{user?.email || 'N/A'}</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text color="$textLight500">User ID:</Text>
                  <Text fontWeight="$semibold">{user?.id || 'N/A'}</Text>
                </HStack>
              </VStack>
            </VStack>
          </Card>

          <Button onPress={handleLogout} variant="outline" bg="$error50" borderColor="$error300">
            <ButtonText color="$error600">Logout</ButtonText>
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
}
