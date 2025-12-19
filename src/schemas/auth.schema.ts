/**
 * Authentication Validation Schemas
 *
 * Zod schemas for authentication-related forms.
 */

import { z } from 'zod';
import {
  emailSchema,
  nameSchema,
  optionalNameSchema,
  passwordSchema,
  simplePasswordSchema,
  termsAcceptanceSchema,
} from './common.schema';

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

/**
 * Login form data type
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Signup form schema
 */
export const signupSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: termsAcceptanceSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/**
 * Signup form data type
 */
export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Simple signup schema (with optional name)
 */
export const simpleSignupSchema = z
  .object({
    name: optionalNameSchema,
    email: emailSchema,
    password: simplePasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/**
 * Simple signup form data type
 */
export type SimpleSignupFormData = z.infer<typeof simpleSignupSchema>;

/**
 * Forgot password form schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

/**
 * Forgot password form data type
 */
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password form schema
 */
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/**
 * Reset password form data type
 */
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Change password form schema
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

/**
 * Change password form data type
 */
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

/**
 * Email verification schema
 */
export const emailVerificationSchema = z.object({
  code: z
    .string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d+$/, 'Verification code must contain only numbers'),
});

/**
 * Email verification form data type
 */
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;

/**
 * Two-factor authentication schema
 */
export const twoFactorAuthSchema = z.object({
  code: z
    .string()
    .min(1, 'Authentication code is required')
    .length(6, 'Authentication code must be 6 digits')
    .regex(/^\d+$/, 'Authentication code must contain only numbers'),
});

/**
 * Two-factor authentication form data type
 */
export type TwoFactorAuthFormData = z.infer<typeof twoFactorAuthSchema>;
