/**
 * Forgot Password Screen
 * 
 * Screen for password reset functionality.
 * Navigates back to Login screen.
 */

import { useAuthNavigation } from '@/navigation';
import type { AuthStackScreenProps } from '@/navigation/types';
import { Box, Button, ButtonText, Input, InputField, Link, LinkText, Text, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';

type Props = AuthStackScreenProps<'ForgotPassword'>;

export function ForgotPasswordScreen({ }: Props) {
  const navigation = useAuthNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleResetPassword() {
    if (!email) {
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Implement actual password reset API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <Box flex={1} bg="$background" justifyContent="center" px="$4">
        <VStack space="lg" w="100%" maxW={400} alignSelf="center" alignItems="center">
          <VStack space="sm" alignItems="center">
            <Text size="3xl" fontWeight="$bold" textAlign="center">
              Check Your Email
            </Text>
            <Text size="md" color="$textLight500" textAlign="center">
              We've sent a password reset link to {email}
            </Text>
          </VStack>

          <Button onPress={() => navigation.navigate('Login')} mt="$4">
            <ButtonText>Back to Login</ButtonText>
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$background" justifyContent="center" px="$4">
      <VStack space="lg" w="100%" maxW={400} alignSelf="center">
        <VStack space="sm">
          <Text size="3xl" fontWeight="$bold" textAlign="center">
            Reset Password
          </Text>
          <Text size="md" color="$textLight500" textAlign="center">
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </VStack>

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

          <Button onPress={handleResetPassword} isDisabled={isLoading || !email} mt="$2">
            <ButtonText>{isLoading ? 'Sending...' : 'Send Reset Link'}</ButtonText>
          </Button>
        </VStack>

        <Link onPress={() => navigation.navigate('Login')} alignSelf="center">
          <LinkText size="sm" color="$primary500">
            Back to Login
          </LinkText>
        </Link>
      </VStack>
    </Box>
  );
}
