/**
 * FormLabel Component
 *
 * Consistent label component for form fields.
 * Displays field label with optional required indicator.
 */

import type { FormLabelProps } from '@/types/form.types';
import { Text } from '@gluestack-ui/themed';

/**
 * FormLabel
 *
 * Renders a label for form fields with consistent styling.
 *
 * @example
 * ```tsx
 * <FormLabel required>Email Address</FormLabel>
 * ```
 */
export function FormLabel({ children, required, testID }: FormLabelProps) {
  return (
    <Text
      style={{
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
      }}
      testID={testID}
    >
      {children}
      {required && <Text style={{ color: '#dc2626', marginLeft: 4 }}>*</Text>}
    </Text>
  );
}
