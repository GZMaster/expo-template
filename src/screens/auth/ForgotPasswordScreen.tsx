/**
 * Forgot Password Screen
 *
 * Screen for password reset functionality.
 * Navigates back to Login screen.
 */

import { useToast } from '@/components/feedback';
import { FormInput } from '@/components/forms';
import { useAuthNavigation } from '@/navigation';
import type { AuthStackScreenProps } from '@/navigation/types';
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/schemas';
import { Box, Button, ButtonText, Link, LinkText, Text, VStack } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = AuthStackScreenProps<'ForgotPassword'>;

export function ForgotPasswordScreen(_props: Props) {
  const navigation = useAuthNavigation();
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    try {
      // TODO: Implement actual password reset API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success('Password reset link sent!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset link.';
      toast.error(errorMessage);
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
              We've sent a password reset link to {submittedEmail}
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

          <Button
            onPress={handleSubmit(onSubmit)}
            isDisabled={isSubmitting}
            style={{ marginTop: 8 }}
          >
            <ButtonText>{isSubmitting ? 'Sending...' : 'Send Reset Link'}</ButtonText>
          </Button>
        </VStack>

        <Link onPress={() => navigation.navigate('Login')} alignSelf='center'>
          <LinkText style={{ fontSize: 12, color: 'primary-500' }}>Back to Login</LinkText>
        </Link>
      </VStack>
    </Box>
  );
}
