/**
 * Login Screen
 *
 * Authentication screen for user login.
 * Navigates to Signup or ForgotPassword screens.
 */

import {
  Box,
  Button,
  ButtonText,
  HStack,
  Input,
  InputField,
  Link,
  LinkText,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthNavigation } from '@/navigation';
import type { AuthStackScreenProps } from '@/navigation/types';

type Props = AuthStackScreenProps<'Login'>;

export function LoginScreen(_props: Props) {
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
            Welcome Back
          </Text>
          <Text style={{ fontSize: 16, color: 'text-light-500', textAlign: 'center' }}>
            Sign in to continue
          </Text>
        </VStack>

        {error && (
          <Box style={{ backgroundColor: 'error-50', padding: 12, borderRadius: 8 }}>
            <Text style={{ fontSize: 12, color: 'error-600' }}>{error}</Text>
          </Box>
        )}

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

          <VStack style={{ gap: 4 }}>
            <Text style={{ fontSize: 12, fontWeight: 'medium' }}>Password</Text>
            <Input>
              <InputField
                placeholder='Enter your password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
                autoComplete='password'
              />
            </Input>
          </VStack>

          <HStack justifyContent='flex-end'>
            <Link onPress={() => navigation.navigate('ForgotPassword')}>
              <LinkText style={{ fontSize: 12, color: 'primary-500' }}>Forgot Password?</LinkText>
            </Link>
          </HStack>

          <Button onPress={handleLogin} isDisabled={isLoading} style={{ marginTop: 8 }}>
            <ButtonText>{isLoading ? 'Signing in...' : 'Sign In'}</ButtonText>
          </Button>
        </VStack>

        <HStack style={{ justifyContent: 'center', gap: 4 }}>
          <Text style={{ fontSize: 12, color: 'text-light-500' }}>Don't have an account?</Text>
          <Link onPress={() => navigation.navigate('Signup')}>
            <LinkText style={{ fontSize: 12, fontWeight: 'semibold', color: 'primary-500' }}>
              Sign Up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
