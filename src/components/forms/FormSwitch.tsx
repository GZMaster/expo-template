/**
 * FormSwitch Component
 *
 * Toggle switch component integrating React Hook Form with Gluestack UI.
 * Handles validation and error display for boolean toggle fields.
 */

import { HStack, Switch, Text, VStack } from '@gluestack-ui/themed';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormError } from './FormError';

interface FormSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: FieldError;
  disabled?: boolean;
  testID?: string;
}

/**
 * FormSwitch
 *
 * A controlled switch component that integrates React Hook Form with Gluestack UI.
 * Displays validation errors and supports boolean toggle fields.
 *
 * @example
 * ```tsx
 * <FormSwitch
 *   control={control}
 *   name="notifications"
 *   label="Enable notifications"
 *   error={errors.notifications}
 * />
 * ```
 */
export function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  error,
  disabled,
  testID,
}: FormSwitchProps<T>) {
  return (
    <VStack gap='$1'>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <HStack gap={12} alignItems='center' justifyContent='space-between'>
            <Text style={{ fontSize: 14, fontWeight: '500', flex: 1 }}>{label}</Text>
            <Switch
              value={!!value}
              onValueChange={onChange}
              isDisabled={disabled}
              testID={testID}
            />
          </HStack>
        )}
      />

      <FormError error={error} testID={testID ? `${testID}-error` : undefined} />
    </VStack>
  );
}
