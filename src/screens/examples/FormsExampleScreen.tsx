/**
 * Forms Example Screen
 *
 * Comprehensive showcase of all form components and validation scenarios.
 * Demonstrates best practices for form implementation with React Hook Form + Zod.
 */

import { useToast } from '@/components/feedback';
import {
  FormCheckbox,
  FormDatePicker,
  FormInput,
  FormRadio,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from '@/components/forms';
import type { RadioOption, SelectOption } from '@/types/form.types';
import {
  Box,
  Button,
  ButtonText,
  Divider,
  Heading,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/**
 * Comprehensive form schema demonstrating all field types
 */
const exampleFormSchema = z.object({
  // Text inputs
  fullName: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),

  // Textarea
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must not exceed 500 characters'),

  // Select
  country: z.string().min(1, 'Country is required'),

  // Radio
  gender: z.string().min(1, 'Gender is required'),

  // Checkbox
  subscribe: z.boolean(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),

  // Switch
  notifications: z.boolean(),

  // Date picker
  birthDate: z.string().optional(),
});

type ExampleFormData = z.infer<typeof exampleFormSchema>;

/**
 * FormsExampleScreen
 *
 * A comprehensive example screen showcasing:
 * - All form components (Input, Textarea, Select, Checkbox, Radio, Switch, DatePicker)
 * - Validation with Zod
 * - Error handling and display
 * - Toast notifications
 * - Form submission
 * - Best practices
 */
export function FormsExampleScreen() {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExampleFormData>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      message: '',
      country: '',
      gender: '',
      subscribe: false,
      acceptTerms: false,
      notifications: true,
      birthDate: '',
    },
    mode: 'onBlur',
  });

  const countryOptions: SelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
  ];

  const genderOptions: RadioOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer-not-to-say' },
  ];

  async function onSubmit(data: ExampleFormData) {
    try {
      console.log('Form data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toast.success('Form submitted successfully!');
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Form submission failed.';
      toast.error(errorMessage);
    }
  }

  return (
    <Box flex={1} bg='$background'>
      <ScrollView>
        <Box p='$4'>
          <VStack space='lg' maxW={600} alignSelf='center' w='100%'>
            {/* Header */}
            <VStack space='sm'>
              <Heading size='xl'>Form Components Example</Heading>
              <Text size='md' color='$textLight500'>
                A comprehensive showcase of all form components with validation
              </Text>
            </VStack>

            <Divider />

            {/* Text Inputs Section */}
            <VStack space='md'>
              <Heading size='lg'>Text Inputs</Heading>

              <FormInput
                control={control}
                name='fullName'
                label='Full Name'
                placeholder='Enter your full name'
                error={errors.fullName}
                autoCapitalize='words'
                required
              />

              <FormInput
                control={control}
                name='email'
                label='Email Address'
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
                required
              />
            </VStack>

            <Divider />

            {/* Textarea Section */}
            <VStack space='md'>
              <Heading size='lg'>Textarea</Heading>

              <FormTextarea
                control={control}
                name='message'
                label='Message'
                placeholder='Enter your message (10-500 characters)'
                error={errors.message}
                numberOfLines={4}
                maxLength={500}
                required
              />
            </VStack>

            <Divider />

            {/* Select Section */}
            <VStack space='md'>
              <Heading size='lg'>Select Dropdown</Heading>

              <FormSelect
                control={control}
                name='country'
                label='Country'
                placeholder='Select your country'
                error={errors.country}
                options={countryOptions}
                required
              />
            </VStack>

            <Divider />

            {/* Radio Section */}
            <VStack space='md'>
              <Heading size='lg'>Radio Buttons</Heading>

              <FormRadio
                control={control}
                name='gender'
                label='Gender'
                error={errors.gender}
                options={genderOptions}
                required
              />
            </VStack>

            <Divider />

            {/* Checkbox Section */}
            <VStack space='md'>
              <Heading size='lg'>Checkboxes</Heading>

              <FormCheckbox
                control={control}
                name='subscribe'
                label='Subscribe to newsletter'
                error={errors.subscribe}
              />

              <FormCheckbox
                control={control}
                name='acceptTerms'
                label='I accept the terms and conditions'
                error={errors.acceptTerms}
                required
              />
            </VStack>

            <Divider />

            {/* Switch Section */}
            <VStack space='md'>
              <Heading size='lg'>Toggle Switch</Heading>

              <FormSwitch
                control={control}
                name='notifications'
                label='Enable push notifications'
                error={errors.notifications}
              />
            </VStack>

            <Divider />

            {/* Date Picker Section */}
            <VStack space='md'>
              <Heading size='lg'>Date Picker</Heading>

              <Text size='sm' color='$textLight500' mb='$2'>
                Note: This is a basic text input for dates. For production, integrate a proper date
                picker library.
              </Text>

              <FormDatePicker
                control={control}
                name='birthDate'
                label='Birth Date'
                placeholder='YYYY-MM-DD'
                error={errors.birthDate}
              />
            </VStack>

            <Divider />

            {/* Submit Section */}
            <VStack space='sm' mt='$4'>
              <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
                <ButtonText>{isSubmitting ? 'Submitting...' : 'Submit Form'}</ButtonText>
              </Button>

              <Button variant='outline' onPress={() => reset()}>
                <ButtonText>Reset Form</ButtonText>
              </Button>
            </VStack>

            {/* Info Section */}
            <Box bg='$info50' p='$4' borderRadius='$md' mt='$4'>
              <Text size='sm' color='$info700'>
                <Text fontWeight='$bold'>Tip:</Text> Try submitting the form with invalid data to
                see the validation errors. All fields are validated using Zod schemas integrated
                with React Hook Form.
              </Text>
            </Box>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
