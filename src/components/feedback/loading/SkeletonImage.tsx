/**
 * SkeletonImage Component
 *
 * Image placeholder skeleton with aspect ratio support.
 */

import { Box } from '@gluestack-ui/themed';
import { Skeleton } from './Skeleton';

interface SkeletonImageProps {
  /**
   * Width of the image skeleton
   */
  width?: number | string;
  /**
   * Height of the image skeleton
   */
  height?: number | string;
  /**
   * Aspect ratio (e.g., 16/9, 4/3, 1)
   * If provided, height is calculated from width
   */
  aspectRatio?: number;
  /**
   * Border radius
   * @default 8
   */
  borderRadius?: number;
  /**
   * Variant style
   * @default 'rectangular'
   */
  variant?: 'rectangular' | 'rounded' | 'circular';
}

/**
 * Image skeleton component
 *
 * @example
 * ```tsx
 * <SkeletonImage width={200} height={200} variant="circular" />
 * <SkeletonImage width="100%" aspectRatio={16/9} />
 * ```
 */
export function SkeletonImage({
  width = '100%',
  height = 200,
  aspectRatio,
  borderRadius,
  variant = 'rectangular',
}: SkeletonImageProps) {
  // Calculate height from aspect ratio if provided
  const calculatedHeight = aspectRatio && typeof width === 'number' ? width / aspectRatio : height;

  return (
    <Box
      width={width as any}
      height={calculatedHeight as any}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Skeleton width='100%' height='100%' borderRadius={borderRadius} variant={variant} />
    </Box>
  );
}

/**
 * Avatar skeleton - circular image
 */
export function SkeletonAvatar({ size = 50 }: { size?: number }) {
  return <SkeletonImage width={size} height={size} variant='circular' />;
}
