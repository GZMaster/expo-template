/**
 * Toast Component
 *
 * Toast notification component with variants.
 * Uses Gluestack UI Toast component.
 */

import {
  Toast as GluestackToast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastConfig {
  /**
   * Unique ID for the toast
   */
  id: string;
  /**
   * Toast variant
   */
  variant: ToastVariant;
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
  position?: ToastPosition;
  /**
   * Action button
   */
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastProps {
  config: ToastConfig;
  onClose?: () => void;
}

/**
 * Get variant-specific styles
 */
function getVariantStyles(variant: ToastVariant) {
  switch (variant) {
    case 'success':
      return {
        bg: '$success50',
        borderColor: '$success300',
        icon: '✓',
        iconBg: '$success600',
      };
    case 'error':
      return {
        bg: '$error50',
        borderColor: '$error300',
        icon: '✕',
        iconBg: '$error600',
      };
    case 'warning':
      return {
        bg: '$warning50',
        borderColor: '$warning300',
        icon: '⚠',
        iconBg: '$warning600',
      };
    case 'info':
      return {
        bg: '$info50',
        borderColor: '$info300',
        icon: 'ℹ',
        iconBg: '$info600',
      };
    default:
      return {
        bg: '$info50',
        borderColor: '$info300',
        icon: 'ℹ',
        iconBg: '$info600',
      };
  }
}

/**
 * Toast component
 *
 * Internal component used by toast system.
 * Don't use directly - use useToast hook instead.
 */
export function Toast({ config }: ToastProps) {
  const styles = getVariantStyles(config.variant);

  return (
    <GluestackToast
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.borderColor,
        borderWidth: 1,
      }}
    >
      <VStack style={{ gap: 4, flex: 1 }}>
        {config.title && <ToastTitle>{config.title}</ToastTitle>}
        <ToastDescription>{config.message}</ToastDescription>
      </VStack>
    </GluestackToast>
  );
}
