/**
 * FormTextarea Component
 *
 * Multi-line text input component integrating React Hook Form with Gluestack UI.
 * Handles validation and error display for longer text content.
 */

import { Textarea, TextareaInput, VStack } from '@gluestack-ui/themed';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormError } from './FormError';
import { FormLabel } from './FormLabel';

interface FormTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
}

/**
 * FormTextarea
 *
 * A controlled textarea component that integrates React Hook Form with Gluestack UI.
 * Displays validation errors and supports multi-line text input.
 *
 * @example
 * ```tsx
 * <FormTextarea
 *   control={control}
 *   name="message"
 *   label="Message"
 *   placeholder="Enter your message"
 *   error={errors.message}
 *   numberOfLines={4}
 *   required
 * />
 * ```
 */
export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  required,
  disabled,
  maxLength,
  numberOfLines = 4,
  autoCapitalize = 'sentences',
  testID,
}: FormTextareaProps<T>) {
  const hasError = !!error;

  return (
    <VStack gap='$1'>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Textarea isInvalid={hasError} isDisabled={disabled} testID={testID}>
            <TextareaInput
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor='$textLight400'
              maxLength={maxLength}
              numberOfLines={numberOfLines}
              autoCapitalize={autoCapitalize}
              editable={!disabled}
            />
          </Textarea>
        )}
      />

      <FormError error={error} testID={testID ? `${testID}-error` : undefined} />
    </VStack>
  );
}
