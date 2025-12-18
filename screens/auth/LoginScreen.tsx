/**
 * Login Screen
 * 
 * Authentication screen for user login.
 * Navigates to Signup or ForgotPassword screens.
 */

import { useAuth } from '@/contexts/AuthContext';
import { useAuthNavigation } from '@/navigation';
import type { AuthStackScreenProps } from '@/navigation/types';
import { Box, Button, ButtonText, HStack, Input, InputField, Link, LinkText, Text, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';

type Props = AuthStackScreenProps<'Login'>;

export function LoginScreen({ }: Props) {
  const navigation = useAuthNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await login(email, password);
      // Navigation will happen automatically via RootNavigator when isAuthenticated changes
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box flex={1} bg="$background" justifyContent="center" px="$4">
      <VStack space="lg" w="100%" maxW={400} alignSelf="center">
        <VStack space="sm">
          <Text size="3xl" fontWeight="$bold" textAlign="center">
            Welcome Back
          </Text>
          <Text size="md" color="$textLight500" textAlign="center">
            Sign in to continue
          </Text>
        </VStack>

        {error && (
          <Box bg="$error50" p="$3" borderRadius="$md">
            <Text color="$error600" size="sm">
              {error}
            </Text>
          </Box>
        )}

        <VStack space="md">
          <VStack space="xs">
            <Text size="sm" fontWeight="$medium">
              Email
            </Text>
            <Input>
              <InputField
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text size="sm" fontWeight="$medium">
              Password
            </Text>
            <Input>
              <InputField
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
            </Input>
          </VStack>

          <HStack justifyContent="flex-end">
            <Link onPress={() => navigation.navigate('ForgotPassword')}>
              <LinkText size="sm" color="$primary500">
                Forgot Password?
              </LinkText>
            </Link>
          </HStack>

          <Button onPress={handleLogin} isDisabled={isLoading} mt="$2">
            <ButtonText>{isLoading ? 'Signing in...' : 'Sign In'}</ButtonText>
          </Button>
        </VStack>

        <HStack justifyContent="center" space="xs">
          <Text size="sm" color="$textLight500">
            Don't have an account?
          </Text>
          <Link onPress={() => navigation.navigate('Signup')}>
            <LinkText size="sm" fontWeight="$semibold" color="$primary500">
              Sign Up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
