/**
 * LoadingOverlay Component
 *
 * Overlay with backdrop and spinner for async actions.
 * Prevents user interaction while loading.
 */

import { Box, Spinner, Text, VStack } from '@gluestack-ui/themed';
import { Modal, StyleSheet } from 'react-native';

interface LoadingOverlayProps {
  /**
   * Whether the overlay is visible
   */
  visible: boolean;
  /**
   * Optional message to display
   */
  message?: string;
  /**
   * Background opacity
   * @default 0.7
   */
  opacity?: number;
}

/**
 * Loading overlay component that blocks interaction
 *
 * @example
 * ```tsx
 * <LoadingOverlay visible={isLoading} message="Saving..." />
 * ```
 */
export function LoadingOverlay({ visible, message, opacity = 0.7 }: LoadingOverlayProps) {
  return (
    <Modal visible={visible} transparent animationType='fade'>
      <Box
        flex={1}
        justifyContent='center'
        alignItems='center'
        style={[styles.backdrop, { opacity }]}
      >
        <Box style={{ backgroundColor: '$backgroundLight0', padding: 24, borderRadius: 8 }}>
          <VStack style={{ gap: 16 }} alignItems='center'>
            <Spinner size='large' accessibilityLabel={message || 'Loading'} />
            {message && (
              <Text style={{ color: '$textLight700', textAlign: 'center' }} fontSize={12}>
                {message}
              </Text>
            )}
          </VStack>
        </Box>
      </Box>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    minWidth: 120,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
