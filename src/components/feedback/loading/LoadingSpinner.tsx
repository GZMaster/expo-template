/**
 * LoadingSpinner Component
 *
 * Full-screen loading spinner with optional message.
 * Uses Gluestack UI Spinner component.
 */

import { Box, Spinner, Text, VStack } from '@gluestack-ui/themed';

interface LoadingSpinnerProps {
  /**
   * Optional message to display below the spinner
   */
  message?: string;
  /**
   * Size of the spinner
   * @default 'large'
   */
  size?: 'small' | 'large';
  /**
   * Whether to show as full screen or inline
   * @default true
   */
  fullScreen?: boolean;
}

/**
 * Full-screen loading spinner component
 *
 * @example
 * ```tsx
 * <LoadingSpinner message="Loading data..." />
 * ```
 */
export function LoadingSpinner({
  message,
  size = 'large',
  fullScreen = true,
}: LoadingSpinnerProps) {
  const content = (
    <VStack style={{ gap: 16 }} alignItems='center'>
      <Spinner size={size} accessibilityLabel={message || 'Loading'} />
      {message && (
        <Text style={{ color: '$textLight500', textAlign: 'center' }} fontSize={12}>
          {message}
        </Text>
      )}
    </VStack>
  );

  if (!fullScreen) {
    return content;
  }

  return (
    <Box
      flex={1}
      justifyContent='center'
      alignItems='center'
      style={{ backgroundColor: '$background' }}
    >
      {content}
    </Box>
  );
}
