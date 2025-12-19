/**
 * Validation Utilities
 *
 * Helper functions for form validation and error handling.
 */

import type { FieldError, FieldErrors } from 'react-hook-form';
import type { ZodError } from 'zod';

/**
 * Get error message from FieldError
 *
 * @param error - Field error object from React Hook Form
 * @returns Error message or undefined
 *
 * @example
 * ```tsx
 * const errorMessage = getErrorMessage(errors.email);
 * ```
 */
export function getErrorMessage(error: FieldError | undefined): string | undefined {
  return error?.message;
}

/**
 * Check if form has any errors
 *
 * @param errors - Form errors object
 * @returns True if form has errors
 *
 * @example
 * ```tsx
 * const hasFormErrors = hasErrors(errors);
 * ```
 */
export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Format Zod validation errors for display
 *
 * @param error - Zod error object
 * @returns Object with field names as keys and error messages as values
 *
 * @example
 * ```tsx
 * try {
 *   schema.parse(data);
 * } catch (error) {
 *   const formattedErrors = formatValidationErrors(error as ZodError);
 *   console.log(formattedErrors);
 * }
 * ```
 */
export function formatValidationErrors(error: ZodError): Record<string, string> {
  return error.errors.reduce(
    (acc, err) => {
      const path = err.path.join('.');
      acc[path] = err.message;
      return acc;
    },
    {} as Record<string, string>,
  );
}

/**
 * Get the first error message from form errors
 *
 * @param errors - Form errors object
 * @returns First error message or undefined
 *
 * @example
 * ```tsx
 * const firstError = getFirstError(errors);
 * ```
 */
export function getFirstError(errors: FieldErrors): string | undefined {
  const firstErrorKey = Object.keys(errors)[0];
  if (!firstErrorKey) return undefined;

  const error = errors[firstErrorKey];
  if (!error) return undefined;

  return typeof error === 'object' && 'message' in error ? String(error.message) : undefined;
}

/**
 * Get all error messages from form errors
 *
 * @param errors - Form errors object
 * @returns Array of error messages
 *
 * @example
 * ```tsx
 * const allErrors = getAllErrors(errors);
 * ```
 */
export function getAllErrors(errors: FieldErrors): string[] {
  const errorMessages: string[] = [];

  function extractErrors(obj: FieldErrors | FieldError, prefix = ''): void {
    Object.entries(obj).forEach(([key, value]) => {
      const fieldPath = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === 'object' && 'message' in value && value.message) {
        errorMessages.push(String(value.message));
      } else if (value && typeof value === 'object') {
        extractErrors(value as FieldErrors, fieldPath);
      }
    });
  }

  extractErrors(errors);
  return errorMessages;
}

/**
 * Check if a field has an error
 *
 * @param errors - Form errors object
 * @param fieldName - Field name to check
 * @returns True if field has an error
 *
 * @example
 * ```tsx
 * const hasEmailError = hasFieldError(errors, 'email');
 * ```
 */
export function hasFieldError(errors: FieldErrors, fieldName: string): boolean {
  return fieldName in errors && !!errors[fieldName];
}

/**
 * Get nested field error
 *
 * @param errors - Form errors object
 * @param path - Dot-separated path to nested field
 * @returns Field error or undefined
 *
 * @example
 * ```tsx
 * const addressError = getNestedError(errors, 'address.street');
 * ```
 */
export function getNestedError(errors: FieldErrors, path: string): FieldError | undefined {
  const keys = path.split('.');
  let current: unknown = errors;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current as FieldError | undefined;
}

/**
 * Format error for display
 *
 * @param error - Field error or string
 * @returns Formatted error message
 *
 * @example
 * ```tsx
 * const message = formatError(errors.email);
 * ```
 */
export function formatError(error: FieldError | string | undefined): string | undefined {
  if (!error) return undefined;
  if (typeof error === 'string') return error;
  return error.message;
}

/**
 * Check if value is empty
 *
 * @param value - Value to check
 * @returns True if value is empty
 *
 * @example
 * ```tsx
 * const empty = isEmpty('');  // true
 * const notEmpty = isEmpty('hello');  // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Validate email format
 *
 * @param email - Email string to validate
 * @returns True if email is valid
 *
 * @example
 * ```tsx
 * const valid = isValidEmail('user@example.com');  // true
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 *
 * @param phone - Phone number string to validate
 * @returns True if phone is valid
 *
 * @example
 * ```tsx
 * const valid = isValidPhone('123-456-7890');  // true
 * ```
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate URL format
 *
 * @param url - URL string to validate
 * @returns True if URL is valid
 *
 * @example
 * ```tsx
 * const valid = isValidUrl('https://example.com');  // true
 * ```
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check password strength
 *
 * @param password - Password string to check
 * @returns Strength level: 'weak', 'medium', 'strong'
 *
 * @example
 * ```tsx
 * const strength = getPasswordStrength('MyP@ssw0rd');  // 'strong'
 * ```
 */
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 6) return 'weak';

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}

/**
 * Sanitize string input (remove leading/trailing whitespace)
 *
 * @param value - String to sanitize
 * @returns Sanitized string
 *
 * @example
 * ```tsx
 * const clean = sanitizeString('  hello  ');  // 'hello'
 * ```
 */
export function sanitizeString(value: string): string {
  return value.trim();
}

/**
 * Create a debounced validation function
 *
 * @param validationFn - Validation function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced validation function
 *
 * @example
 * ```tsx
 * const debouncedValidate = debounceValidation(validateEmail, 300);
 * ```
 */
export function debounceValidation<T extends (...args: unknown[]) => unknown>(
  validationFn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      validationFn(...args);
    }, delay);
  };
}
