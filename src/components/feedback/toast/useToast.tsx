/**
 * useToast Hook
 *
 * Custom hook for showing toast notifications.
 * Provides simple API for success, error, warning, and info toasts.
 */

import { useToast as useGluestackToast } from '@gluestack-ui/themed';
import React from 'react';
import { Toast, type ToastConfig, type ToastVariant } from './Toast';

interface ShowToastOptions {
  /**
   * Toast title
   */
  title?: string;
  /**
   * Toast message
   */
  message: string;
  /**
   * Duration in milliseconds
   * @default 3000
   */
  duration?: number;
  /**
   * Position on screen
   * @default 'top'
   */
  position?: 'top' | 'bottom';
  /**
   * Action button
   */
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastReturn {
  /**
   * Show a toast notification
   */
  show: (variant: ToastVariant, options: ShowToastOptions) => void;
  /**
   * Show a success toast
   */
  success: (message: string, options?: Omit<ShowToastOptions, 'message'>) => void;
  /**
   * Show an error toast
   */
  error: (message: string, options?: Omit<ShowToastOptions, 'message'>) => void;
  /**
   * Show a warning toast
   */
  warning: (message: string, options?: Omit<ShowToastOptions, 'message'>) => void;
  /**
   * Show an info toast
   */
  info: (message: string, options?: Omit<ShowToastOptions, 'message'>) => void;
  /**
   * Close a specific toast
   */
  close: (id: string) => void;
  /**
   * Close all toasts
   */
  closeAll: () => void;
}

/**
 * Toast hook
 *
 * Provides methods to show different types of toast notifications.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   const handleSuccess = () => {
 *     toast.success('Operation completed successfully!');
 *   };
 *
 *   const handleError = () => {
 *     toast.error('Failed to complete operation', {
 *       duration: 5000,
 *     });
 *   };
 *
 *   return (
 *     <View>
 *       <Button onPress={handleSuccess}>Show Success</Button>
 *       <Button onPress={handleError}>Show Error</Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useToast(): ToastReturn {
  const gluestackToast = useGluestackToast();

  const show = (variant: ToastVariant, options: ShowToastOptions) => {
    const config: ToastConfig = {
      id: `toast-${Date.now()}`,
      variant,
      title: options.title,
      message: options.message,
      duration: options.duration || 3000,
      position: options.position || 'top',
      action: options.action,
    };

    gluestackToast.show({
      id: config.id,
      placement: config.position,
      duration: config.duration,
      render: () => <Toast config={config} />,
    });
  };

  const success = (message: string, options?: Omit<ShowToastOptions, 'message'>) => {
    show('success', { ...options, message });
  };

  const error = (message: string, options?: Omit<ShowToastOptions, 'message'>) => {
    show('error', { ...options, message });
  };

  const warning = (message: string, options?: Omit<ShowToastOptions, 'message'>) => {
    show('warning', { ...options, message });
  };

  const info = (message: string, options?: Omit<ShowToastOptions, 'message'>) => {
    show('info', { ...options, message });
  };

  const close = (id: string) => {
    gluestackToast.close(id);
  };

  const closeAll = () => {
    gluestackToast.closeAll();
  };

  return {
    show,
    success,
    error,
    warning,
    info,
    close,
    closeAll,
  };
}
