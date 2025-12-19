/**
 * Skeleton Component
 *
 * Base skeleton component with shimmer animation.
 * Uses react-native-reanimated for smooth animations.
 */

import { useEffect } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface SkeletonProps {
  /**
   * Width of the skeleton
   */
  width?: number | string;
  /**
   * Height of the skeleton
   */
  height?: number | string;
  /**
   * Border radius
   * @default 8
   */
  borderRadius?: number;
  /**
   * Variant of the skeleton
   * @default 'rectangular'
   */
  variant?: 'circular' | 'rectangular' | 'rounded';
  /**
   * Additional styles
   */
  style?: ViewStyle;
}

/**
 * Base skeleton component with shimmer animation
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={20} variant="rounded" />
 * <Skeleton width={50} height={50} variant="circular" />
 * ```
 */
export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius,
  variant = 'rectangular',
  style,
}: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1, // infinite repeat
      true, // reverse
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Determine border radius based on variant
  let calculatedBorderRadius = borderRadius;
  if (!calculatedBorderRadius) {
    switch (variant) {
      case 'circular':
        calculatedBorderRadius = 9999;
        break;
      case 'rounded':
        calculatedBorderRadius = 8;
        break;
      default:
        calculatedBorderRadius = 4;
    }
  }

  const skeletonBaseColor = '#E0E0E0';

  return (
    <View
      style={[
        style,
        {
          width: width as any,
          height: height as any,
          borderRadius: calculatedBorderRadius,
          overflow: 'hidden',
        },
      ]}
      accessibilityLabel='Loading'
      accessibilityRole='progressbar'
    >
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            backgroundColor: skeletonBaseColor,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
