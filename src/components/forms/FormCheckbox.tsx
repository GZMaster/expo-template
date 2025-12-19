/**
 * FormCheckbox Component
 *
 * Checkbox component integrating React Hook Form with Gluestack UI.
 * Handles validation and error display for boolean fields.
 */

import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormError } from './FormError';

interface FormCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  testID?: string;
}

/**
 * FormCheckbox
 *
 * A controlled checkbox component that integrates React Hook Form with Gluestack UI.
 * Displays validation errors and supports boolean field validation.
 *
 * @example
 * ```tsx
 * <FormCheckbox
 *   control={control}
 *   name="acceptTerms"
 *   label="I accept the terms and conditions"
 *   error={errors.acceptTerms}
 *   required
 * />
 * ```
 */
export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  error,
  required,
  disabled,
  testID,
}: FormCheckboxProps<T>) {
  const hasError = !!error;

  return (
    <VStack gap='$1'>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <HStack gap='$2' alignItems='flex-start'>
            <Checkbox
              value={name}
              isChecked={!!value}
              onChange={onChange}
              isDisabled={disabled}
              isInvalid={hasError}
              testID={testID}
            >
              <CheckboxIndicator style={{ marginRight: 8 }}>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>
                {label}
                {required && ' *'}
              </CheckboxLabel>
            </Checkbox>
          </HStack>
        )}
      />

      <FormError error={error} testID={testID ? `${testID}-error` : undefined} />
    </VStack>
  );
}
