/**
 * Signup Screen
 *
 * Registration screen for new users.
 * Navigates back to Login screen.
 */

import { useToast } from '@/components/feedback';
import { FormInput } from '@/components/forms';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthNavigation } from '@/navigation';
import type { AuthStackScreenProps } from '@/navigation/types';
import { type SimpleSignupFormData, simpleSignupSchema } from '@/schemas';
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

type Props = AuthStackScreenProps<'Signup'>;

export function SignupScreen(_props: Props) {
  const navigation = useAuthNavigation();
  const { signup } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SimpleSignupFormData>({
    resolver: zodResolver(simpleSignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(data: SimpleSignupFormData) {
    try {
      await signup(data.email, data.password, data.name || undefined);
      toast.success('Account created successfully!');
      // Navigation will happen automatically via RootNavigator when isAuthenticated changes
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      toast.error(errorMessage);
    }
  }

  return (
    <Box flex={1} bg='$background' justifyContent='center' px='$4'>
      <VStack space='lg' w='100%' maxW={400} alignSelf='center'>
        <VStack space='sm'>
          <Text size='3xl' fontWeight='$bold' textAlign='center'>
            Create Account
          </Text>
          <Text size='md' color='$textLight500' textAlign='center'>
            Sign up to get started
          </Text>
        </VStack>

        <VStack space='md'>
          <FormInput
            control={control}
            name='name'
            label='Name (Optional)'
            placeholder='Enter your name'
            error={errors.name}
            autoCapitalize='words'
          />

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
            autoComplete='password-new'
            required
          />

          <FormInput
            control={control}
            name='confirmPassword'
            label='Confirm Password'
            placeholder='Confirm your password'
            error={errors.confirmPassword}
            secureTextEntry
            autoCapitalize='none'
            autoComplete='password-new'
            required
          />

          <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting} mt='$2'>
            <ButtonText>{isSubmitting ? 'Creating account...' : 'Sign Up'}</ButtonText>
          </Button>
        </VStack>

        <HStack justifyContent='center' space='xs'>
          <Text size='sm' color='$textLight500'>
            Already have an account?
          </Text>
          <Link onPress={() => navigation.navigate('Login')}>
            <LinkText size='sm' fontWeight='$semibold' color='$primary500'>
              Sign In
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
