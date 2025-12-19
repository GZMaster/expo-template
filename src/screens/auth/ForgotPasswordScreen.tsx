/**
 * Forgot Password Screen
 *
 * Screen for password reset functionality.
 * Navigates back to Login screen.
 */

import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  Link,
  LinkText,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { useAuthNavigation } from '@/navigation';
import type { AuthStackScreenProps } from '@/navigation/types';

type Props = AuthStackScreenProps<'ForgotPassword'>;

export function ForgotPasswordScreen(_props: Props) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <Box
        style={{
          flex: 1,
          backgroundColor: 'background',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}
      >
        <VStack
          style={{
            gap: 16,
            width: '100%',
            maxWidth: 400,
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <VStack style={{ gap: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
              Check Your Email
            </Text>
            <Text style={{ fontSize: 16, color: 'text-light-500', textAlign: 'center' }}>
              We've sent a password reset link to {email}
            </Text>
          </VStack>

          <Button onPress={() => navigation.navigate('Login')} style={{ marginTop: 16 }}>
            <ButtonText>Back to Login</ButtonText>
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      style={{
        flex: 1,
        backgroundColor: 'background',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
    >
      <VStack style={{ gap: 16, width: '100%', maxWidth: 400, alignSelf: 'center' }}>
        <VStack style={{ gap: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
            Reset Password
          </Text>
          <Text style={{ fontSize: 16, color: 'text-light-500', textAlign: 'center' }}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </VStack>

        <VStack style={{ gap: 16 }}>
          <VStack style={{ gap: 4 }}>
            <Text style={{ fontSize: 12, fontWeight: 'medium' }}>Email</Text>
            <Input>
              <InputField
                placeholder='Enter your email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
              />
            </Input>
          </VStack>

          <Button
            onPress={handleResetPassword}
            isDisabled={isLoading || !email}
            style={{ marginTop: 8 }}
          >
            <ButtonText>{isLoading ? 'Sending...' : 'Send Reset Link'}</ButtonText>
          </Button>
        </VStack>

        <Link onPress={() => navigation.navigate('Login')} alignSelf='center'>
          <LinkText style={{ fontSize: 12, color: 'primary-500' }}>Back to Login</LinkText>
        </Link>
      </VStack>
    </Box>
  );
}
