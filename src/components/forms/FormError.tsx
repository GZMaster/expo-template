/**
 * FormError Component
 *
 * Displays validation error messages for form fields.
 * Provides consistent error styling and accessibility.
 */

import type { FormErrorProps } from '@/types/form.types';
import { formatError } from '@/utils/validation';
import { Text } from '@gluestack-ui/themed';

/**
 * FormError
 *
 * Renders an error message for form fields with consistent styling.
 *
 * @example
 * ```tsx
 * <FormError error={errors.email} />
 * ```
 */
export function FormError({ error, testID }: FormErrorProps) {
  const errorMessage = formatError(error);

  if (!errorMessage) return null;

  return (
    <Text
      style={{
        fontSize: 12,
        color: '#dc2626',
        marginTop: 4,
      }}
      testID={testID}
      accessibilityRole='alert'
      accessibilityLiveRegion='polite'
    >
      {errorMessage}
    </Text>
  );
}
