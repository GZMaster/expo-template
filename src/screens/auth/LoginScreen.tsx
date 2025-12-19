/**
 * Login Screen
 *
 * Authentication screen for user login.
 * Navigates to Signup or ForgotPassword screens.
 */

import { useToast } from '@/components/feedback';
import { FormInput } from '@/components/forms';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthNavigation } from '@/navigation';
import type { AuthStackScreenProps } from '@/navigation/types';
import { type LoginFormData, loginSchema } from '@/schemas';
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Link,
  LinkText,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = AuthStackScreenProps<'Login'>;

export function LoginScreen(_props: Props) {
  const navigation = useAuthNavigation();
  const { login } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      // Navigation will happen automatically via RootNavigator when isAuthenticated changes
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      toast.error(errorMessage);
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

        <VStack style={{ gap: 16 }}>
          <FormInput
            control={control}
            name='email'
            label='Email'
            placeholder='Enter your email'
            error={errors.email}
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete='email'
            required
          />

          <FormInput
            control={control}
            name='password'
            label='Password'
            placeholder='Enter your password'
            error={errors.password}
            secureTextEntry
            autoCapitalize='none'
            autoComplete='password'
            required
          />

          <HStack justifyContent='flex-end'>
            <Link onPress={() => navigation.navigate('ForgotPassword')}>
              <LinkText style={{ fontSize: 12, color: 'primary-500' }}>Forgot Password?</LinkText>
            </Link>
          </HStack>

          <Button
            onPress={handleSubmit(onSubmit)}
            isDisabled={isSubmitting}
            style={{ marginTop: 8 }}
          >
            <ButtonText>{isSubmitting ? 'Signing in...' : 'Sign In'}</ButtonText>
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
