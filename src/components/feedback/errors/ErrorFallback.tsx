/**
 * ErrorFallback Component
 *
 * Default error UI displayed when ErrorBoundary catches an error.
 */

import { getErrorMessage, getErrorTitle } from '@/utils/errors';
import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';

interface ErrorFallbackProps {
  /**
   * The error that was caught
   */
  error: Error;
  /**
   * Callback to reset the error boundary
   */
  onReset?: () => void;
  /**
   * Whether to show error details (stack trace)
   * @default false
   */
  showDetails?: boolean;
  /**
   * Custom title
   */
  title?: string;
  /**
   * Custom message
   */
  message?: string;
}

/**
 * Error fallback UI component
 *
 * Displays user-friendly error message with option to retry.
 *
 * @example
 * ```tsx
 * <ErrorFallback
 *   error={error}
 *   onReset={handleReset}
 *   showDetails={__DEV__}
 * />
 * ```
 */
export function ErrorFallback({
  error,
  onReset,
  showDetails = false,
  title,
  message,
}: ErrorFallbackProps) {
  const errorTitle = title || getErrorTitle(error);
  const errorMessage = message || getErrorMessage(error);

  return (
    <Box
      flex={1}
      style={{ backgroundColor: '$background' }}
      paddingHorizontal={16}
      paddingVertical={24}
      justifyContent='center'
    >
      <ScrollView>
        <VStack style={{ gap: 24 }} alignItems='center'>
          {/* Error Icon */}
          <Box
            width={80}
            height={80}
            borderRadius='$full'
            style={{ backgroundColor: '$error50' }}
            justifyContent='center'
            alignItems='center'
          >
            <Text fontSize={40}>⚠️</Text>
          </Box>

          {/* Error Content */}
          <VStack style={{ gap: 8 }} alignItems='center'>
            <Heading style={{ textAlign: 'center', color: '$error600' }} fontSize={24}>
              {errorTitle}
            </Heading>
            <Text style={{ textAlign: 'center', color: '$textLight600' }} fontSize={16}>
              {errorMessage}
            </Text>
          </VStack>

          {/* Error Details (Development only) */}
          {showDetails && error.stack && (
            <Card style={{ width: '100%', padding: 16, backgroundColor: '$backgroundLight100' }}>
              <VStack style={{ gap: 8 }}>
                <Heading style={{ color: '$error700' }} fontSize={14}>
                  Error Details
                </Heading>
                <ScrollView horizontal>
                  <Text style={{ fontFamily: 'monospace', color: '$textLight700' }} fontSize={12}>
                    {error.stack}
                  </Text>
                </ScrollView>
              </VStack>
            </Card>
          )}

          {/* Action Button */}
          {onReset && (
            <Button
              onPress={onReset}
              style={{ width: '100%', maxWidth: 300, backgroundColor: '$backgroundLight100' }}
            >
              <ButtonText>Try Again</ButtonText>
            </Button>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
}

/**
 * Simple inline error display (for component-level errors)
 */
export function InlineError({ error, onRetry }: { error: Error | string; onRetry?: () => void }) {
  const message = typeof error === 'string' ? error : getErrorMessage(error);

  return (
    <Card
      padding={16}
      style={{ backgroundColor: '$error50', borderColor: '$error200', borderWidth: 1 }}
    >
      <VStack style={{ gap: 16 }}>
        <Text color='$error700' textAlign='center'>
          {message}
        </Text>
        {onRetry && (
          <Button style={{ backgroundColor: '$backgroundLight100' }} onPress={onRetry}>
            <ButtonText>Retry</ButtonText>
          </Button>
        )}
      </VStack>
    </Card>
  );
}
