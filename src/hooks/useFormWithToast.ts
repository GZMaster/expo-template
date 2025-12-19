/**
 * useFormWithToast Hook
 *
 * Wrapper hook that combines React Hook Form with toast notifications.
 * Automatically shows success/error toasts on form submission.
 */

import { useToast } from '@/components/feedback';
import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface UseFormWithToastOptions {
  /**
   * Success message to show on successful submission
   */
  successMessage?: string;
  /**
   * Error message to show on failed submission
   */
  errorMessage?: string;
  /**
   * Whether to show success toast
   * @default true
   */
  showSuccessToast?: boolean;
  /**
   * Whether to show error toast
   * @default true
   */
  showErrorToast?: boolean;
}

interface UseFormWithToastReturn<T extends FieldValues> extends UseFormReturn<T> {
  /**
   * Handle form submission with automatic toast notifications
   */
  handleSubmitWithToast: (
    onSubmit: (data: T) => Promise<void> | void,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

/**
 * useFormWithToast
 *
 * A wrapper around React Hook Form's useForm that automatically handles
 * success and error toast notifications on form submission.
 *
 * @example
 * ```tsx
 * function LoginForm() {
 *   const {
 *     control,
 *     handleSubmitWithToast,
 *     formState: { errors, isSubmitting },
 *   } = useFormWithToast<LoginFormData>(
 *     {
 *       resolver: zodResolver(loginSchema),
 *       defaultValues: { email: '', password: '' },
 *     },
 *     {
 *       successMessage: 'Login successful!',
 *       errorMessage: 'Login failed. Please try again.',
 *     }
 *   );
 *
 *   const onSubmit = async (data: LoginFormData) => {
 *     await loginMutation.mutateAsync(data);
 *   };
 *
 *   return (
 *     <form onPress={handleSubmitWithToast(onSubmit)}>
 *       <FormInput control={control} name="email" error={errors.email} />
 *       <Button onPress={handleSubmitWithToast(onSubmit)}>Login</Button>
 *     </form>
 *   );
 * }
 * ```
 */
export function useFormWithToast<T extends FieldValues>(
  formProps?: UseFormProps<T>,
  options?: UseFormWithToastOptions,
): UseFormWithToastReturn<T> {
  const toast = useToast();
  const form = useForm<T>(formProps);

  const {
    successMessage,
    errorMessage = 'An error occurred. Please try again.',
    showSuccessToast = true,
    showErrorToast = true,
  } = options || {};

  /**
   * Handle form submission with automatic toast notifications
   */
  const handleSubmitWithToast = (
    onSubmit: (data: T) => Promise<void> | void,
  ): ((e?: React.BaseSyntheticEvent) => Promise<void>) => {
    return form.handleSubmit(async (data: T) => {
      try {
        await onSubmit(data);

        if (showSuccessToast && successMessage) {
          toast.success(successMessage);
        }
      } catch (error) {
        if (showErrorToast) {
          const message = error instanceof Error ? error.message : errorMessage;
          toast.error(message);
        }

        // Re-throw the error so the caller can handle it if needed
        throw error;
      }
    });
  };

  return {
    ...form,
    handleSubmitWithToast,
  };
}
