/**
 * Edit Profile Screen
 *
 * Screen for editing user profile information.
 * Demonstrates comprehensive form validation with React Hook Form + Zod.
 */

import { useToast } from '@/components/feedback';
import { FormInput, FormTextarea } from '@/components/forms';
import { type EditProfileFormData, editProfileSchema } from '@/schemas';
import { Box, Button, ButtonText, Heading, ScrollView, VStack } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

/**
 * EditProfileScreen
 *
 * A complete profile editing form showcasing:
 * - Form state management with React Hook Form
 * - Validation with Zod schemas
 * - Error handling and display
 * - Toast notifications
 * - Pre-filled form data
 * - Multiple input types
 */
export function EditProfileScreen() {
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '',
      bio: '',
      website: '',
      location: '',
      company: '',
      jobTitle: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(data: EditProfileFormData) {
    try {
      // TODO: Implement actual profile update API call
      console.log('Profile data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toast.success('Profile updated successfully!');
      reset(data); // Reset form with new values to clear isDirty
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile.';
      toast.error(errorMessage);
    }
  }

  function handleCancel() {
    reset();
    toast.info('Changes discarded');
  }

  return (
    <Box flex={1} bg='$background'>
      <ScrollView>
        <Box p='$4'>
          <VStack space='lg' maxW={600} alignSelf='center' w='100%'>
            <VStack space='sm'>
              <Heading size='xl'>Edit Profile</Heading>
            </VStack>

            <VStack space='md'>
              <FormInput
                control={control}
                name='firstName'
                label='First Name'
                placeholder='Enter your first name'
                error={errors.firstName}
                autoCapitalize='words'
                required
              />

              <FormInput
                control={control}
                name='lastName'
                label='Last Name'
                placeholder='Enter your last name'
                error={errors.lastName}
                autoCapitalize='words'
                required
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
                name='phone'
                label='Phone Number'
                placeholder='Enter your phone number'
                error={errors.phone}
                keyboardType='phone-pad'
              />

              <FormTextarea
                control={control}
                name='bio'
                label='Bio'
                placeholder='Tell us about yourself'
                error={errors.bio}
                numberOfLines={4}
              />

              <FormInput
                control={control}
                name='website'
                label='Website'
                placeholder='https://example.com'
                error={errors.website}
                keyboardType='url'
                autoCapitalize='none'
              />

              <FormInput
                control={control}
                name='location'
                label='Location'
                placeholder='City, Country'
                error={errors.location}
              />

              <FormInput
                control={control}
                name='company'
                label='Company'
                placeholder='Your company name'
                error={errors.company}
              />

              <FormInput
                control={control}
                name='jobTitle'
                label='Job Title'
                placeholder='Your job title'
                error={errors.jobTitle}
              />

              <VStack space='sm' mt='$4'>
                <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting || !isDirty}>
                  <ButtonText>{isSubmitting ? 'Saving...' : 'Save Changes'}</ButtonText>
                </Button>

                <Button
                  variant='outline'
                  onPress={handleCancel}
                  isDisabled={isSubmitting || !isDirty}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
