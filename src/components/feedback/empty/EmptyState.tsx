/**
 * EmptyState Component
 *
 * Generic empty state component with icon, title, description, and action.
 */

import { Box, Button, ButtonText, Heading, Text, VStack } from '@gluestack-ui/themed';
import type { ComponentType } from 'react';

export interface EmptyStateAction {
  /**
   * Action button label
   */
  label: string;
  /**
   * Action button press handler
   */
  onPress: () => void;
  /**
   * Button variant
   * @default 'solid'
   */
  variant?: 'solid' | 'outline';
}

interface EmptyStateProps {
  /**
   * Icon or illustration to display
   * Can be emoji, icon component, or custom component
   */
  icon?: string | ComponentType<{ size?: number }>;
  /**
   * Title text
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Action button configuration
   */
  action?: EmptyStateAction;
  /**
   * Secondary action button
   */
  secondaryAction?: EmptyStateAction;
}

/**
 * Generic empty state component
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon="📭"
 *   title="No messages yet"
 *   description="When you receive messages, they'll appear here"
 *   action={{
 *     label: "Compose Message",
 *     onPress: handleCompose
 *   }}
 * />
 * ```
 */
export function EmptyState({ icon, title, description, action, secondaryAction }: EmptyStateProps) {
  const IconComponent = typeof icon === 'string' ? null : icon;

  return (
    <Box flex={1} justifyContent='center' alignItems='center' style={{ padding: 24 }}>
      <VStack style={{ gap: 24 }} alignItems='center' maxWidth={400}>
        {/* Icon */}
        {icon && (
          <Box
            width={100}
            height={100}
            borderRadius='$full'
            style={{ backgroundColor: '$backgroundLight100' }}
            justifyContent='center'
            alignItems='center'
          >
            {typeof icon === 'string' ? (
              <Text fontSize={48}>{icon}</Text>
            ) : IconComponent ? (
              <IconComponent size={48} />
            ) : null}
          </Box>
        )}

        {/* Content */}
        <VStack style={{ gap: 8 }} alignItems='center'>
          <Heading style={{ textAlign: 'center' }}>{title}</Heading>
          {description && (
            <Text style={{ color: '$textLight500', textAlign: 'center' }}>{description}</Text>
          )}
        </VStack>

        {/* Actions */}
        {(action || secondaryAction) && (
          <VStack style={{ gap: 8, width: '100%', maxWidth: 300 }}>
            {action && (
              <Button
                onPress={action.onPress}
                style={{
                  backgroundColor:
                    action.variant === 'solid' ? '$backgroundLight100' : 'transparent',
                }}
              >
                <ButtonText style={{ color: '$textLight500' }}>{action.label}</ButtonText>
              </Button>
            )}
            {secondaryAction && (
              <Button
                onPress={secondaryAction.onPress}
                style={{
                  backgroundColor:
                    secondaryAction.variant === 'solid' ? '$backgroundLight100' : 'transparent',
                }}
              >
                <ButtonText>{secondaryAction.label}</ButtonText>
              </Button>
            )}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
