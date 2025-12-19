/**
 * Form Types
 *
 * Common TypeScript types for form components and validation.
 */

import type { Control, FieldError, FieldValues, Path, UseFormReturn } from 'react-hook-form';

/**
 * Base props for form control components
 */
export interface FormControlProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
}

/**
 * Form submit handler type
 */
export type FormSubmitHandler<T extends FieldValues = FieldValues> = (
  data: T,
) => void | Promise<void>;

/**
 * Form field component base props
 */
export interface FormFieldBaseProps<T extends FieldValues = FieldValues>
  extends FormControlProps<T> {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  testID?: string;
}

/**
 * Form validation error
 */
export interface FormValidationError {
  field: string;
  message: string;
}

/**
 * Form state
 */
export interface FormState<T extends FieldValues = FieldValues> extends UseFormReturn<T> {
  isValid: boolean;
  isDirty: boolean;
  isSubmitted: boolean;
}

/**
 * Form error display props
 */
export interface FormErrorProps {
  error?: FieldError | string;
  testID?: string;
}

/**
 * Form label props
 */
export interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  testID?: string;
}

/**
 * Select option type
 */
export interface SelectOption {
  label: string;
  value: string | number;
}

/**
 * Radio option type
 */
export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * Form input types
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

/**
 * Form validation mode
 */
export type ValidationMode = 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';

/**
 * Re-export commonly used React Hook Form types
 */
export type {
  Control,
  ControllerProps,
  ControllerRenderProps,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormReset,
  UseFormReturn,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
