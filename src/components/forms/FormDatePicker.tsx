/**
 * FormDatePicker Component
 *
 * Date picker component integrating React Hook Form with Gluestack UI.
 * Handles validation and error display for date fields.
 *
 * Note: This is a basic implementation. For production use, consider integrating
 * a dedicated date picker library like @react-native-community/datetimepicker
 * or react-native-date-picker.
 */

import { Input, InputField, Pressable, VStack } from '@gluestack-ui/themed';
import { useState } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormError } from './FormError';
import { FormLabel } from './FormLabel';

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  testID?: string;
}

/**
 * FormDatePicker
 *
 * A controlled date picker component that integrates React Hook Form with Gluestack UI.
 * Displays validation errors and supports date selection.
 *
 * Note: This is a basic text input for date. For production apps, integrate a
 * proper date picker library.
 *
 * @example
 * ```tsx
 * <FormDatePicker
 *   control={control}
 *   name="birthDate"
 *   label="Birth Date"
 *   placeholder="YYYY-MM-DD"
 *   error={errors.birthDate}
 *   required
 * />
 * ```
 */
export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'YYYY-MM-DD',
  error,
  required,
  disabled,
  testID,
}: FormDatePickerProps<T>) {
  const hasError = !!error;
  const [_showPicker, _setShowPicker] = useState(false);

  /**
   * Format date to string
   */
  function formatDate(date: Date | string | null | undefined): string {
    if (!date) return '';

    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (Number.isNaN(dateObj.getTime())) return '';

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    } catch {
      return '';
    }
  }

  /**
   * Parse string to date
   */
  function parseDate(dateString: string): Date | null {
    if (!dateString) return null;

    try {
      const date = new Date(dateString);
      return Number.isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  }

  return (
    <VStack gap='$1'>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Pressable
            onPress={() => {
              // In a production app, open a proper date picker here
              // setShowPicker(true);
            }}
            disabled={disabled}
          >
            <Input isInvalid={hasError} isDisabled={disabled} testID={testID} pointerEvents='none'>
              <InputField
                value={formatDate(value)}
                onChangeText={(text) => {
                  const date = parseDate(text);
                  onChange(date);
                }}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor='$textLight400'
                editable={!disabled}
                keyboardType='numbers-and-punctuation'
              />
            </Input>
          </Pressable>
        )}
      />

      <FormError error={error} testID={testID ? `${testID}-error` : undefined} />
    </VStack>
  );
}

/**
 * TODO: For production use, integrate a proper date picker library
 *
 * Recommended libraries:
 * 1. @react-native-community/datetimepicker
 *    - Native date/time picker for iOS and Android
 *    - npm install @react-native-community/datetimepicker
 *
 * 2. react-native-date-picker
 *    - Cross-platform date picker with customizable UI
 *    - npm install react-native-date-picker
 *
 * 3. expo-date-picker (if using Expo)
 *    - Expo's managed date picker component
 *
 * Example integration with @react-native-community/datetimepicker:
 *
 * ```tsx
 * import DateTimePicker from '@react-native-community/datetimepicker';
 *
 * // In the component:
 * {showPicker && (
 *   <DateTimePicker
 *     value={value || new Date()}
 *     mode="date"
 *     display="default"
 *     onChange={(event, selectedDate) => {
 *       setShowPicker(false);
 *       if (selectedDate) {
 *         onChange(selectedDate);
 *       }
 *     }}
 *     minimumDate={minimumDate}
 *     maximumDate={maximumDate}
 *   />
 * )}
 * ```
 */
