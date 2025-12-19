/**
 * Profile Validation Schemas
 *
 * Zod schemas for user profile and settings forms.
 */

import { z } from 'zod';
import {
  emailSchema,
  nameSchema,
  optionalPhoneSchema,
  optionalStringSchema,
  optionalTextAreaSchema,
  optionalUrlSchema,
  requiredStringSchema,
  textAreaSchema,
} from './common.schema';

/**
 * Edit profile form schema
 */
export const editProfileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  bio: optionalTextAreaSchema,
  website: optionalUrlSchema,
  location: optionalStringSchema,
  company: optionalStringSchema,
  jobTitle: optionalStringSchema,
});

/**
 * Edit profile form data type
 */
export type EditProfileFormData = z.infer<typeof editProfileSchema>;

/**
 * User settings form schema
 */
export const settingsSchema = z.object({
  // Notification preferences
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),

  // Privacy settings
  profileVisibility: z.enum(['public', 'private', 'friends']),
  showEmail: z.boolean(),
  showPhone: z.boolean(),

  // Communication preferences
  marketingEmails: z.boolean(),
  productUpdates: z.boolean(),
  weeklyDigest: z.boolean(),

  // App preferences
  language: z.string().min(1, 'Language is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  dateFormat: z.enum(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']),

  // Display preferences
  theme: z.enum(['light', 'dark', 'auto']),
  compactMode: z.boolean(),
});

/**
 * User settings form data type
 */
export type SettingsFormData = z.infer<typeof settingsSchema>;

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: requiredStringSchema,
  message: textAreaSchema,
});

/**
 * Contact form data type
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Feedback form schema
 */
export const feedbackFormSchema = z.object({
  rating: z
    .number({
      error: 'Rating is required',
      message: 'Rating must be a number',
    })
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  category: z.enum(['bug', 'feature', 'improvement', 'other']),
  title: requiredStringSchema,
  description: textAreaSchema,
  includeScreenshot: z.boolean().optional(),
});

/**
 * Feedback form data type
 */
export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

/**
 * Address form schema
 */
export const addressSchema = z.object({
  street: requiredStringSchema,
  city: requiredStringSchema,
  state: requiredStringSchema,
  postalCode: z
    .string()
    .min(1, 'Postal code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid postal code format'),
  country: requiredStringSchema,
});

/**
 * Address form data type
 */
export type AddressFormData = z.infer<typeof addressSchema>;

/**
 * Profile picture upload schema
 */
export const profilePictureSchema = z.object({
  uri: z.string().min(1, 'Image is required'),
  type: z.string().min(1, 'Image type is required'),
  name: z.string().min(1, 'Image name is required'),
});

/**
 * Profile picture form data type
 */
export type ProfilePictureFormData = z.infer<typeof profilePictureSchema>;

/**
 * Social links schema
 */
export const socialLinksSchema = z.object({
  twitter: optionalUrlSchema,
  linkedin: optionalUrlSchema,
  github: optionalUrlSchema,
  facebook: optionalUrlSchema,
  instagram: optionalUrlSchema,
});

/**
 * Social links form data type
 */
export type SocialLinksFormData = z.infer<typeof socialLinksSchema>;

/**
 * Account deletion schema
 */
export const accountDeletionSchema = z
  .object({
    password: z.string().min(1, 'Password is required for account deletion'),
    confirmation: z.string().min(1, 'Please type DELETE to confirm'),
  })
  .refine((data) => data.confirmation === 'DELETE', {
    message: 'Please type DELETE to confirm account deletion',
    path: ['confirmation'],
  });

/**
 * Account deletion form data type
 */
export type AccountDeletionFormData = z.infer<typeof accountDeletionSchema>;
