/**
 * Common Validation Schemas
 *
 * Reusable Zod schemas for common form fields.
 * Use these schemas to build more complex form validations.
 */

import { z } from 'zod';

/**
 * Email validation schema
 * Validates email format and ensures it's not empty
 */
export const emailSchema = z.string().min(1, 'Email is required').email('Invalid email address');

/**
 * Password validation schema with strength requirements
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

/**
 * Simple password schema (for login or less strict requirements)
 * Only checks minimum length
 */
export const simplePasswordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters');

/**
 * Phone number validation schema
 * Supports various phone number formats with or without country code
 */
export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number format');

/**
 * Optional phone number schema
 */
export const optionalPhoneSchema = z
  .string()
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number format')
  .optional()
  .or(z.literal(''));

/**
 * URL validation schema
 */
export const urlSchema = z.string().url('Invalid URL format');

/**
 * Optional URL schema
 */
export const optionalUrlSchema = z.string().url('Invalid URL format').optional().or(z.literal(''));

/**
 * Date validation schema
 */
export const dateSchema = z.date({
  error: 'Date is required',
  message: 'Invalid date format',
});

/**
 * Optional date schema
 */
export const optionalDateSchema = z.date().optional();

/**
 * Name validation schema
 * Requires at least 2 characters
 */
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must not exceed 50 characters');

/**
 * Optional name schema
 */
export const optionalNameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must not exceed 50 characters')
  .optional()
  .or(z.literal(''));

/**
 * Username validation schema
 * Alphanumeric with underscores and hyphens
 */
export const usernameSchema = z
  .string()
  .min(1, 'Username is required')
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must not exceed 20 characters')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'Username can only contain letters, numbers, underscores, and hyphens',
  );

/**
 * Required string schema
 */
export const requiredStringSchema = z.string().min(1, 'This field is required');

/**
 * Optional string schema
 */
export const optionalStringSchema = z.string().optional().or(z.literal(''));

/**
 * Text area schema with length validation
 */
export const textAreaSchema = z
  .string()
  .min(1, 'This field is required')
  .min(10, 'Please provide at least 10 characters')
  .max(500, 'Text must not exceed 500 characters');

/**
 * Optional text area schema
 */
export const optionalTextAreaSchema = z
  .string()
  .max(500, 'Text must not exceed 500 characters')
  .optional()
  .or(z.literal(''));

/**
 * Terms acceptance schema
 * Must be true
 */
export const termsAcceptanceSchema = z.boolean().refine((val) => val === true, {
  message: 'You must accept the terms and conditions',
});

/**
 * Age validation schema
 * Must be at least 18
 */
export const ageSchema = z
  .number({
    error: 'Age is required',
    message: 'Age must be a number',
  })
  .int('Age must be a whole number')
  .min(18, 'You must be at least 18 years old')
  .max(120, 'Please enter a valid age');

/**
 * Positive number schema
 */
export const positiveNumberSchema = z
  .number({
    error: 'This field is required',
    message: 'Must be a number',
  })
  .positive('Must be a positive number');
