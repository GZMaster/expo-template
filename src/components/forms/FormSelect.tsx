/**
 * FormSelect Component
 *
 * Dropdown/picker component integrating React Hook Form with Gluestack UI.
 * Handles validation and error display for select inputs.
 */

import type { SelectOption } from '@/types/form.types';
import {
  ChevronDownIcon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  VStack,
} from '@gluestack-ui/themed';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormError } from './FormError';
import { FormLabel } from './FormLabel';

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  options: SelectOption[];
  testID?: string;
}

/**
 * FormSelect
 *
 * A controlled select component that integrates React Hook Form with Gluestack UI.
 * Displays validation errors and supports dropdown selection.
 *
 * @example
 * ```tsx
 * <FormSelect
 *   control={control}
 *   name="country"
 *   label="Country"
 *   placeholder="Select a country"
 *   error={errors.country}
 *   options={[
 *     { label: 'United States', value: 'us' },
 *     { label: 'Canada', value: 'ca' },
 *   ]}
 *   required
 * />
 * ```
 */
export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  required,
  disabled,
  options,
  testID,
}: FormSelectProps<T>) {
  const hasError = !!error;

  return (
    <VStack gap='$1'>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            isInvalid={hasError}
            isDisabled={disabled}
            selectedValue={value?.toString() || ''}
            onValueChange={onChange}
            testID={testID}
          >
            <SelectTrigger>
              <SelectInput placeholder={placeholder} />
              <SelectIcon style={{ marginRight: 12 }} as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    label={option.label}
                    value={option.value.toString()}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        )}
      />

      <FormError error={error} testID={testID ? `${testID}-error` : undefined} />
    </VStack>
  );
}
