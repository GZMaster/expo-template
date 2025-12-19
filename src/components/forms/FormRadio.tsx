/**
 * FormRadio Component
 *
 * Radio button group component integrating React Hook Form with Gluestack UI.
 * Handles validation and error display for radio selections.
 */

import type { RadioOption } from '@/types/form.types';
import {
  CircleIcon,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  VStack,
} from '@gluestack-ui/themed';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormError } from './FormError';
import { FormLabel } from './FormLabel';

interface FormRadioProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  options: RadioOption[];
  testID?: string;
}

/**
 * FormRadio
 *
 * A controlled radio button group that integrates React Hook Form with Gluestack UI.
 * Displays validation errors and supports radio button selection.
 *
 * @example
 * ```tsx
 * <FormRadio
 *   control={control}
 *   name="gender"
 *   label="Gender"
 *   error={errors.gender}
 *   options={[
 *     { label: 'Male', value: 'male' },
 *     { label: 'Female', value: 'female' },
 *     { label: 'Other', value: 'other' },
 *   ]}
 *   required
 * />
 * ```
 */
export function FormRadio<T extends FieldValues>({
  control,
  name,
  label,
  error,
  required,
  disabled,
  options,
  testID,
}: FormRadioProps<T>) {
  const hasError = !!error;

  return (
    <VStack gap='$1'>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            value={value?.toString() || ''}
            onChange={onChange}
            isDisabled={disabled}
            testID={testID}
          >
            <VStack gap='$2'>
              {options.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value.toString()}
                  isDisabled={disabled || option.disabled}
                  isInvalid={hasError}
                >
                  <RadioIndicator style={{ marginRight: 8 }}>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>{option.label}</RadioLabel>
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        )}
      />

      <FormError error={error} testID={testID ? `${testID}-error` : undefined} />
    </VStack>
  );
}
