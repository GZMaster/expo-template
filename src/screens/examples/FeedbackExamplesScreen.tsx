/**
 * Feedback Examples Screen
 *
 * Demonstrates all UI feedback patterns:
 * - Loading states and skeletons
 * - Error boundaries
 * - Toast notifications
 * - Pull to refresh
 * - Empty states
 */

import {
  EmptyList,
  EmptySearch,
  LoadingOverlay,
  LoadingSpinner,
  MaintenanceMode,
  NoConnection,
  RefreshableScrollView,
  Skeleton,
  SkeletonCardList,
  SkeletonImage,
  SkeletonText,
  useToast,
} from '@/components/feedback';
import { Box, Button, ButtonText, Card, Heading, Text, VStack } from '@gluestack-ui/themed';
import { useState } from 'react';

/**
 * Feedback Examples Screen
 */
export function FeedbackExamplesScreen() {
  const toast = useToast();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [activeExample, setActiveExample] = useState<string | null>(null);

  function handleRefresh() {
    return new Promise<void>((resolve) => {
      toast.info('Refreshing data...');
      setTimeout(() => {
        toast.success('Data refreshed!');
        resolve();
      }, 2000);
    });
  }

  function simulateError() {
    throw new Error('This is a test error for ErrorBoundary');
  }

  return (
    <>
      <RefreshableScrollView onRefresh={handleRefresh}>
        <Box flex={1} bg='$background' p='$4'>
          <VStack space='lg'>
            {/* Header */}
            <VStack space='sm'>
              <Heading size='2xl'>Feedback Patterns</Heading>
              <Text color='$textLight500'>Interactive examples of all UI feedback components</Text>
            </VStack>

            {/* Toast Examples */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Toast Notifications</Heading>
                <Text size='sm' color='$textLight500'>
                  Show different types of toast messages
                </Text>
                <VStack space='sm'>
                  <Button onPress={() => toast.success('Operation completed successfully!')}>
                    <ButtonText>Success Toast</ButtonText>
                  </Button>
                  <Button
                    onPress={() => toast.error('Something went wrong. Please try again.')}
                    variant='outline'
                  >
                    <ButtonText>Error Toast</ButtonText>
                  </Button>
                  <Button
                    onPress={() => toast.warning('Please save your changes before leaving.')}
                    variant='outline'
                  >
                    <ButtonText>Warning Toast</ButtonText>
                  </Button>
                  <Button
                    onPress={() => toast.info('New feature available! Check it out.')}
                    variant='outline'
                  >
                    <ButtonText>Info Toast</ButtonText>
                  </Button>
                </VStack>
              </VStack>
            </Card>

            {/* Loading States */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Loading States</Heading>
                <Text size='sm' color='$textLight500'>
                  Loading spinners and overlays
                </Text>
                <VStack space='sm'>
                  <Button
                    onPress={() => {
                      setShowLoadingSpinner(true);
                      setTimeout(() => setShowLoadingSpinner(false), 2000);
                    }}
                  >
                    <ButtonText>Show Loading Spinner</ButtonText>
                  </Button>
                  <Button
                    onPress={() => {
                      setShowLoadingOverlay(true);
                      setTimeout(() => setShowLoadingOverlay(false), 2000);
                    }}
                    variant='outline'
                  >
                    <ButtonText>Show Loading Overlay</ButtonText>
                  </Button>
                </VStack>
                {showLoadingSpinner && (
                  <Box mt='$4'>
                    <LoadingSpinner message='Loading data...' fullScreen={false} />
                  </Box>
                )}
              </VStack>
            </Card>

            {/* Skeletons */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Skeleton Loaders</Heading>
                <Text size='sm' color='$textLight500'>
                  Skeleton components with shimmer animation
                </Text>
                <Button
                  onPress={() =>
                    setActiveExample(activeExample === 'skeletons' ? null : 'skeletons')
                  }
                  variant='outline'
                >
                  <ButtonText>
                    {activeExample === 'skeletons' ? 'Hide' : 'Show'} Skeletons
                  </ButtonText>
                </Button>
                {activeExample === 'skeletons' && (
                  <VStack space='md' mt='$4'>
                    <VStack space='sm'>
                      <Text size='sm' fontWeight='bold'>
                        Text Skeletons
                      </Text>
                      <SkeletonText lines={3} />
                    </VStack>
                    <VStack space='sm'>
                      <Text size='sm' fontWeight='bold'>
                        Image Skeleton
                      </Text>
                      <SkeletonImage width='100%' height={150} />
                    </VStack>
                    <VStack space='sm'>
                      <Text size='sm' fontWeight='bold'>
                        Basic Skeleton
                      </Text>
                      <Skeleton width='100%' height={20} />
                      <Skeleton width='80%' height={20} />
                      <Skeleton width={100} height={100} variant='circular' />
                    </VStack>
                  </VStack>
                )}
              </VStack>
            </Card>

            {/* Skeleton Cards */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Skeleton Cards</Heading>
                <Text size='sm' color='$textLight500'>
                  Card-shaped skeletons for lists
                </Text>
                <Button
                  onPress={() =>
                    setActiveExample(activeExample === 'skeleton-cards' ? null : 'skeleton-cards')
                  }
                  variant='outline'
                >
                  <ButtonText>
                    {activeExample === 'skeleton-cards' ? 'Hide' : 'Show'} Skeleton Cards
                  </ButtonText>
                </Button>
                {activeExample === 'skeleton-cards' && (
                  <Box mt='$4'>
                    <SkeletonCardList count={3} />
                  </Box>
                )}
              </VStack>
            </Card>

            {/* Empty States */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Empty States</Heading>
                <Text size='sm' color='$textLight500'>
                  Empty state variations
                </Text>
                <Button
                  onPress={() =>
                    setActiveExample(activeExample === 'empty-list' ? null : 'empty-list')
                  }
                  variant='outline'
                >
                  <ButtonText>
                    {activeExample === 'empty-list' ? 'Hide' : 'Show'} Empty List
                  </ButtonText>
                </Button>
                {activeExample === 'empty-list' && (
                  <Box mt='$4' bg='$backgroundLight100' borderRadius='$lg'>
                    <EmptyList
                      action={{
                        label: 'Add Item',
                        onPress: () => toast.info('Add item pressed'),
                      }}
                    />
                  </Box>
                )}
              </VStack>
            </Card>

            {/* Empty Search */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Empty Search Results</Heading>
                <Text size='sm' color='$textLight500'>
                  No results found state
                </Text>
                <Button
                  onPress={() =>
                    setActiveExample(activeExample === 'empty-search' ? null : 'empty-search')
                  }
                  variant='outline'
                >
                  <ButtonText>
                    {activeExample === 'empty-search' ? 'Hide' : 'Show'} Empty Search
                  </ButtonText>
                </Button>
                {activeExample === 'empty-search' && (
                  <Box mt='$4' bg='$backgroundLight100' borderRadius='$lg'>
                    <EmptySearch
                      query='React Native Components'
                      action={{
                        label: 'Clear Search',
                        onPress: () => toast.info('Search cleared'),
                      }}
                    />
                  </Box>
                )}
              </VStack>
            </Card>

            {/* No Connection */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>No Connection</Heading>
                <Text size='sm' color='$textLight500'>
                  Network error state
                </Text>
                <Button
                  onPress={() =>
                    setActiveExample(activeExample === 'no-connection' ? null : 'no-connection')
                  }
                  variant='outline'
                >
                  <ButtonText>
                    {activeExample === 'no-connection' ? 'Hide' : 'Show'} No Connection
                  </ButtonText>
                </Button>
                {activeExample === 'no-connection' && (
                  <Box mt='$4' bg='$backgroundLight100' borderRadius='$lg'>
                    <NoConnection onRetry={() => toast.info('Retrying connection...')} />
                  </Box>
                )}
              </VStack>
            </Card>

            {/* Maintenance Mode */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Maintenance Mode</Heading>
                <Text size='sm' color='$textLight500'>
                  Under maintenance state
                </Text>
                <Button
                  onPress={() =>
                    setActiveExample(activeExample === 'maintenance' ? null : 'maintenance')
                  }
                  variant='outline'
                >
                  <ButtonText>
                    {activeExample === 'maintenance' ? 'Hide' : 'Show'} Maintenance Mode
                  </ButtonText>
                </Button>
                {activeExample === 'maintenance' && (
                  <Box mt='$4' bg='$backgroundLight100' borderRadius='$lg'>
                    <MaintenanceMode />
                  </Box>
                )}
              </VStack>
            </Card>

            {/* Error Boundary */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Error Boundary</Heading>
                <Text size='sm' color='$textLight500'>
                  Catches JavaScript errors in component tree
                </Text>
                <Text size='xs' color='$warning600'>
                  Warning: This will trigger an error and show the error boundary fallback UI
                </Text>
                <Button onPress={simulateError} bg='$error600'>
                  <ButtonText>Trigger Error (Demo)</ButtonText>
                </Button>
              </VStack>
            </Card>

            {/* Pull to Refresh */}
            <Card p='$4'>
              <VStack space='md'>
                <Heading size='lg'>Pull to Refresh</Heading>
                <Text size='sm' color='$textLight500'>
                  Pull down from the top of this screen to refresh
                </Text>
                <Text size='xs' color='$info600'>
                  This entire screen uses RefreshableScrollView
                </Text>
              </VStack>
            </Card>

            {/* Info */}
            <Card p='$4' bg='$info50'>
              <VStack space='sm'>
                <Heading size='md' color='$info700'>
                  ℹ️ Usage Information
                </Heading>
                <Text size='sm' color='$info700'>
                  All these components are ready to use throughout the app. Import them from
                  @/components/feedback and integrate with your screens and TanStack Query hooks.
                </Text>
              </VStack>
            </Card>
          </VStack>
        </Box>
      </RefreshableScrollView>

      {/* Loading Overlay */}
      <LoadingOverlay visible={showLoadingOverlay} message='Processing...' />
    </>
  );
}
