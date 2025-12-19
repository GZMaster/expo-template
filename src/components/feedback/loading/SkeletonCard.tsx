/**
 * SkeletonCard Component
 *
 * Card-shaped skeleton for list items.
 * Mimics typical card layout with image and text.
 */

import { Box, VStack } from '@gluestack-ui/themed';
import { Skeleton } from './Skeleton';

interface SkeletonCardProps {
  /**
   * Whether to show image skeleton
   * @default true
   */
  showImage?: boolean;
  /**
   * Number of text lines to show
   * @default 3
   */
  lines?: number;
}

/**
 * Card skeleton component for lists
 *
 * @example
 * ```tsx
 * <SkeletonCard showImage lines={3} />
 * ```
 */
export function SkeletonCard({ showImage = true, lines = 3 }: SkeletonCardProps) {
  return (
    <Box
      style={{
        backgroundColor: '$backgroundLight0',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '$borderLight200',
        marginBottom: 8,
      }}
    >
      <VStack style={{ gap: 16 }}>
        {showImage && <Skeleton height={150} variant='rounded' />}
        <VStack style={{ gap: 8 }}>
          <Skeleton height={20} width='70%' variant='rounded' />
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={`skeleton-text-${index + 1}`}
              height={16}
              width={index === lines - 1 ? '40%' : '100%'}
              variant='rounded'
            />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

/**
 * List of skeleton cards
 *
 * @example
 * ```tsx
 * <SkeletonCardList count={5} />
 * ```
 */
export function SkeletonCardList({ count = 3 }: { count?: number }) {
  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={`skeleton-card-${index + 1}`} />
      ))}
    </Box>
  );
}
