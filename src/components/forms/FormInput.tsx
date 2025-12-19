/**
 * FormInput Component
 *
 * Controlled input component integrating React Hook Form with Gluestack UI.
 * Handles validation, error display, and various input types.
 */

import { Input, InputField, VStack } from '@gluestack-ui/themed';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import { FormError } from './FormError';
import { FormLabel } from './FormLabel';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: string;
  autoCorrect?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  testID?: string;
}

/**
 * FormInput
 *
 * A controlled input component that integrates React Hook Form with Gluestack UI.
 * Displays validation errors and supports various input configurations.
 *
 * @example
 * ```tsx
 * <FormInput
 *   control={control}
 *   name="email"
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   error={errors.email}
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 *   required
 * />
 * ```
 */
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  required,
  disabled,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  maxLength,
  multiline,
  numberOfLines,
  returnKeyType,
  onSubmitEditing,
  testID,
}: FormInputProps<T>) {
  const hasError = !!error;

  return (
    <VStack gap='$1'>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input isInvalid={hasError} isDisabled={disabled} testID={testID}>
            <InputField
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor='$textLight400'
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              autoComplete={autoComplete as any}
              autoCorrect={autoCorrect}
              maxLength={maxLength}
              multiline={multiline}
              numberOfLines={numberOfLines}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              editable={!disabled}
            />
          </Input>
        )}
      />

      <FormError error={error} testID={testID ? `${testID}-error` : undefined} />
    </VStack>
  );
}
