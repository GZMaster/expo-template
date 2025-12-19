/**
 * SkeletonText Component
 *
 * Text line skeleton with configurable lines and widths.
 */

import { VStack } from '@gluestack-ui/themed';
import { Skeleton } from './Skeleton';

interface SkeletonTextProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
  /**
   * Width of each line (can be array for different widths)
   */
  width?: string | string[];
  /**
   * Height of each line
   * @default 16
   */
  lineHeight?: number;
  /**
   * Spacing between lines
   * @default 'sm'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg';
}

/**
 * Text skeleton component for multiple lines
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} />
 * <SkeletonText lines={2} width={['80%', '60%']} />
 * ```
 */
export function SkeletonText({
  lines = 3,
  width,
  lineHeight = 16,
  spacing = 'sm',
}: SkeletonTextProps) {
  const getLineWidth = (index: number): string => {
    if (Array.isArray(width)) {
      return width[index] || width[width.length - 1] || '100%';
    }
    if (width) {
      return width;
    }
    // Default: last line is shorter
    return index === lines - 1 ? '60%' : '100%';
  };

  return (
    <VStack style={{ gap: spacing }}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={`skeleton-text-${index + 1}`}
          height={lineHeight}
          width={getLineWidth(index)}
          variant='rounded'
        />
      ))}
    </VStack>
  );
}
