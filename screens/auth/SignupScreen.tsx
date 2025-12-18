/**
 * Signup Screen
 * 
 * Registration screen for new users.
 * Navigates back to Login screen.
 */

import { useAuth } from '@/contexts/AuthContext';
import { useAuthNavigation } from '@/navigation';
import type { AuthStackScreenProps } from '@/navigation/types';
import { Box, Button, ButtonText, HStack, Input, InputField, Link, LinkText, Text, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';

type Props = AuthStackScreenProps<'Signup'>;

export function SignupScreen({ }: Props) {
  const navigation = useAuthNavigation();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup() {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await signup(email, password, name || undefined);
      // Navigation will happen automatically via RootNavigator when isAuthenticated changes
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box flex={1} bg="$background" justifyContent="center" px="$4">
      <VStack space="lg" w="100%" maxW={400} alignSelf="center">
        <VStack space="sm">
          <Text size="3xl" fontWeight="$bold" textAlign="center">
            Create Account
          </Text>
          <Text size="md" color="$textLight500" textAlign="center">
            Sign up to get started
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
              Name (Optional)
            </Text>
            <Input>
              <InputField
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </Input>
          </VStack>

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
                autoComplete="password-new"
              />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text size="sm" fontWeight="$medium">
              Confirm Password
            </Text>
            <Input>
              <InputField
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />
            </Input>
          </VStack>

          <Button onPress={handleSignup} isDisabled={isLoading} mt="$2">
            <ButtonText>{isLoading ? 'Creating account...' : 'Sign Up'}</ButtonText>
          </Button>
        </VStack>

        <HStack justifyContent="center" space="xs">
          <Text size="sm" color="$textLight500">
            Already have an account?
          </Text>
          <Link onPress={() => navigation.navigate('Login')}>
            <LinkText size="sm" fontWeight="$semibold" color="$primary500">
              Sign In
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
