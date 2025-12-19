# UI Feedback Components

Comprehensive UI feedback patterns for React Native applications built with Expo, Gluestack UI, and TanStack Query.

## Overview

This library provides five essential UI feedback patterns:

1. **Loading States & Skeletons** - Loading indicators and skeleton screens
2. **Error Boundaries** - Error catching and fallback UI
3. **Toast Notifications** - Success, error, warning, and info messages
4. **Pull-to-Refresh** - Refresh control for lists and scrollviews
5. **Empty States** - Empty state components for various scenarios

## Installation

All components are already integrated into the project. Simply import from `@/components/feedback`:

```typescript
import {
  LoadingSpinner,
  ErrorBoundary,
  useToast,
  EmptyList,
  RefreshableFlatList,
} from '@/components/feedback';
```

## Components

### 1. Loading States & Skeletons

#### LoadingSpinner

Full-screen or inline loading spinner with optional message.

```tsx
import { LoadingSpinner } from '@/components/feedback';

// Full-screen loading
<LoadingSpinner message="Loading data..." />

// Inline loading
<LoadingSpinner message="Loading..." fullScreen={false} size="small" />
```

**Props:**
- `message?: string` - Optional loading message
- `size?: 'small' | 'large'` - Spinner size (default: 'large')
- `fullScreen?: boolean` - Whether to show full screen (default: true)

#### LoadingOverlay

Overlay with backdrop and spinner for blocking async actions.

```tsx
import { LoadingOverlay } from '@/components/feedback';

function MyComponent() {
  const [saving, setSaving] = useState(false);

  return (
    <>
      <YourContent />
      <LoadingOverlay visible={saving} message="Saving changes..." />
    </>
  );
}
```

**Props:**
- `visible: boolean` - Whether overlay is visible
- `message?: string` - Optional message
- `opacity?: number` - Background opacity (default: 0.7)

#### Skeleton Components

Skeleton loaders with shimmer animation for content placeholders.

```tsx
import {
  Skeleton,
  SkeletonText,
  SkeletonImage,
  SkeletonCard,
  SkeletonCardList,
} from '@/components/feedback';

// Basic skeleton
<Skeleton width={200} height={20} variant="rounded" />

// Text skeleton
<SkeletonText lines={3} />

// Image skeleton
<SkeletonImage width="100%" aspectRatio={16/9} />

// Card skeleton (for lists)
<SkeletonCard showImage lines={3} />

// List of skeleton cards
<SkeletonCardList count={5} />
```

**When to use:**
- Use during initial data loading
- Show while images are loading
- Display during content transitions
- Match skeleton layout to actual content

### 2. Error Boundaries

#### ErrorBoundary

Catches JavaScript errors in component tree and displays fallback UI.

```tsx
import { ErrorBoundary } from '@/components/feedback';

// Wrap your app or specific sections
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>

// With error callback
<ErrorBoundary onError={(error, errorInfo) => logToService(error)}>
  <YourComponent />
</ErrorBoundary>
```

**Props:**
- `children: ReactNode` - Components to wrap
- `fallback?: ReactNode | ((error, reset) => ReactNode)` - Custom fallback UI
- `onError?: (error, errorInfo) => void` - Error callback
- `showDetailsInProduction?: boolean` - Show error details in production

#### ErrorFallback

Default error UI component with retry button.

```tsx
import { ErrorFallback, InlineError } from '@/components/feedback';

// Full error page
<ErrorFallback
  error={error}
  onReset={handleReset}
  showDetails={__DEV__}
/>

// Inline error (for component-level errors)
<InlineError
  error="Failed to load data"
  onRetry={handleRetry}
/>
```

#### QueryErrorBoundary

Specialized error boundary for TanStack Query errors.

```tsx
import { QueryErrorBoundary } from '@/components/feedback';

<QueryErrorBoundary>
  <ComponentWithQueries />
</QueryErrorBoundary>
```

**When to use:**
- Wrap root App component with top-level ErrorBoundary
- Use QueryErrorBoundary around screens with queries
- Use InlineError for component-level errors
- Show stack traces in development only

### 3. Toast Notifications

#### useToast Hook

Show toast notifications for user feedback.

```tsx
import { useToast } from '@/components/feedback';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };

  const handleError = () => {
    toast.error('Something went wrong', {
      duration: 5000,
    });
  };

  const handleWarning = () => {
    toast.warning('Please save your changes');
  };

  const handleInfo = () => {
    toast.info('New feature available!');
  };

  return (
    <Button onPress={handleSuccess}>
      Save
    </Button>
  );
}
```

**Methods:**
- `toast.success(message, options?)` - Success toast (green)
- `toast.error(message, options?)` - Error toast (red)
- `toast.warning(message, options?)` - Warning toast (yellow)
- `toast.info(message, options?)` - Info toast (blue)
- `toast.close(id)` - Close specific toast
- `toast.closeAll()` - Close all toasts

**Options:**
- `title?: string` - Toast title
- `duration?: number` - Duration in ms (default: 3000)
- `position?: 'top' | 'bottom'` - Position on screen
- `action?: { label: string, onPress: () => void }` - Action button

**When to use:**
- Success: Operation completed successfully
- Error: Operation failed, network errors
- Warning: Important information, confirmations needed
- Info: General information, tips, updates

### 4. Pull-to-Refresh

#### RefreshableScrollView

ScrollView with built-in pull-to-refresh.

```tsx
import { RefreshableScrollView } from '@/components/feedback';

function MyScreen() {
  const { refetch } = useQuery(...);

  return (
    <RefreshableScrollView onRefresh={refetch}>
      <YourContent />
    </RefreshableScrollView>
  );
}
```

#### RefreshableFlatList

FlatList with built-in pull-to-refresh.

```tsx
import { RefreshableFlatList } from '@/components/feedback';

function MyScreen() {
  const { data, refetch, isRefetching } = useGetItems();

  return (
    <RefreshableFlatList
      data={data}
      onRefresh={refetch}
      refreshing={isRefetching}
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
```

#### useRefresh Hook

Custom hook for refresh logic with haptic feedback.

```tsx
import { useRefresh } from '@/components/feedback';

function MyComponent() {
  const { data, refetch } = useQuery(...);
  const { refreshing, onRefresh } = useRefresh(refetch);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data}
    </ScrollView>
  );
}
```

**When to use:**
- List screens with dynamic data
- Screens with frequently updated content
- Allow users to manually refresh data
- Integrate with TanStack Query refetch

### 5. Empty States

#### EmptyState

Generic empty state with icon, title, description, and actions.

```tsx
import { EmptyState } from '@/components/feedback';

<EmptyState
  icon="📭"
  title="No messages yet"
  description="When you receive messages, they'll appear here"
  action={{
    label: "Compose Message",
    onPress: handleCompose
  }}
  secondaryAction={{
    label: "Learn More",
    onPress: handleLearnMore,
    variant: "outline"
  }}
/>
```

#### EmptyList

Empty state for lists with no data.

```tsx
import { EmptyList, EmptyInbox, EmptyFavorites } from '@/components/feedback';

// Generic list
<EmptyList
  action={{
    label: "Add Item",
    onPress: handleAdd
  }}
/>

// Inbox zero
<EmptyInbox />

// No favorites
<EmptyFavorites
  action={{
    label: "Browse Items",
    onPress: handleBrowse
  }}
/>
```

#### EmptySearch

No search results state.

```tsx
import { EmptySearch } from '@/components/feedback';

<EmptySearch
  query={searchQuery}
  action={{
    label: "Clear Search",
    onPress: handleClear
  }}
/>
```

#### NoConnection

No internet connection state.

```tsx
import { NoConnection, ServerError, MaintenanceMode } from '@/components/feedback';

// No connection
<NoConnection onRetry={handleRetry} />

// Server error
<ServerError onRetry={handleRetry} />

// Maintenance mode
<MaintenanceMode />
```

**When to use:**
- Show when data arrays are empty
- Display when search returns no results
- Show when offline/no connection
- Use for first-time user experiences

### 6. QueryWrapper

Unified wrapper for TanStack Query states.

```tsx
import { QueryWrapper } from '@/components/feedback';

function MyScreen() {
  const query = useGetItems();

  return (
    <QueryWrapper
      query={query}
      loading={<SkeletonCardList count={5} />}
      empty={<EmptyList />}
      error={(error) => <ErrorFallback error={error} />}
    >
      {(data) => (
        <FlatList
          data={data}
          renderItem={({ item }) => <ItemCard item={item} />}
        />
      )}
    </QueryWrapper>
  );
}
```

**Props:**
- `query: UseQueryResult` - TanStack Query result
- `loading?: ReactElement` - Custom loading component
- `error?: ReactElement | ((error) => ReactElement)` - Custom error component
- `empty?: ReactElement` - Custom empty state
- `isEmpty?: (data) => boolean` - Custom empty check
- `children: (data) => ReactNode` - Render function for data

**QueryListWrapper** - Specialized wrapper for list data:

```tsx
import { QueryListWrapper } from '@/components/feedback';

<QueryListWrapper query={useGetItems()}>
  {(items) => (
    <FlatList
      data={items}
      renderItem={({ item }) => <ItemCard item={item} />}
    />
  )}
</QueryListWrapper>
```

## Best Practices

### Loading States

1. **Use skeletons for content areas** - Better UX than spinners
2. **Match skeleton layout to content** - Reduces layout shift
3. **Show loading for async operations** - Use LoadingOverlay for blocking actions
4. **Keep loading messages concise** - "Loading..." is usually sufficient

### Error Handling

1. **Wrap app with ErrorBoundary** - Catch all JavaScript errors
2. **Show error details in dev only** - Hide stack traces in production
3. **Provide retry actions** - Let users attempt to recover
4. **Log errors to tracking service** - Use onError callback for logging
5. **Use InlineError for component errors** - Less disruptive than full-page errors

### Toast Notifications

1. **Keep messages brief** - One sentence maximum
2. **Use appropriate variants** - Success (green), Error (red), Warning (yellow), Info (blue)
3. **Don't overuse toasts** - Too many can be annoying
4. **Set appropriate durations** - 3s for success, 5s+ for errors
5. **Position based on context** - Top for general, bottom for actions

### Pull-to-Refresh

1. **Integrate with TanStack Query** - Use refetch from queries
2. **Show refreshing state** - Use isRefetching from queries
3. **Enable haptic feedback** - Improves user experience on iOS
4. **Use on list screens** - Great for data that updates frequently

### Empty States

1. **Be helpful and friendly** - Explain why it's empty and what to do next
2. **Provide clear actions** - CTA buttons to guide users
3. **Use relevant icons** - Visual cues improve understanding
4. **Customize for context** - Different messages for different scenarios
5. **Consider first-time users** - Help them get started

## Accessibility

All components include:

- Proper accessibility labels
- Screen reader announcements for toasts
- ARIA live regions for loading states
- Keyboard navigation support
- High contrast theme support

## Theme Support

All components automatically support light and dark themes using:

- Gluestack UI tokens
- React Navigation theme
- System color scheme detection

## Examples

See `src/screens/examples/FeedbackExamplesScreen.tsx` for interactive examples of all patterns.

## Integration with TanStack Query

All feedback components integrate seamlessly with TanStack Query:

```tsx
function MyScreen() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useGetItems();
  const toast = useToast();

  // Loading state
  if (isLoading) {
    return <LoadingSpinner message="Loading items..." />;
  }

  // Error state
  if (isError) {
    return <ErrorFallback error={error} onReset={refetch} />;
  }

  // Empty state
  if (data.length === 0) {
    return <EmptyList />;
  }

  // Data state with refresh
  return (
    <RefreshableFlatList
      data={data}
      onRefresh={refetch}
      refreshing={isRefetching}
      renderItem={({ item }) => <ItemCard item={item} />}
    />
  );
}
```

Or use QueryWrapper for automatic state handling:

```tsx
function MyScreen() {
  return (
    <QueryWrapper
      query={useGetItems()}
      loading={<SkeletonCardList />}
      empty={<EmptyList />}
    >
      {(data) => (
        <RefreshableFlatList
          data={data}
          onRefresh={refetch}
          renderItem={({ item }) => <ItemCard item={item} />}
        />
      )}
    </QueryWrapper>
  );
}
```

## Performance Considerations

1. **Skeleton animations** - Use react-native-reanimated for smooth 60fps animations
2. **Toast queuing** - Multiple toasts are queued automatically
3. **Error boundary isolation** - Use multiple boundaries to isolate errors
4. **Refresh debouncing** - Built into RefreshControl
5. **Lazy loading** - All components are tree-shakeable

## Troubleshooting

### Toast not showing

- Ensure `ToastProvider` is wrapped around your app in `App.tsx`
- Check that you're calling toast methods inside a component

### Error boundary not catching errors

- Error boundaries only catch errors during rendering, not in event handlers
- Use try/catch for event handlers and async code

### Skeleton animation not smooth

- Ensure `react-native-reanimated` is properly installed
- Check that the app is not in debug mode (animations are slower)

### RefreshControl not working

- Ensure you're passing a promise-returning function to `onRefresh`
- Check that `refreshing` state is properly managed

## Support

For issues or questions, refer to:
- Gluestack UI: https://gluestack.io/ui/docs
- TanStack Query: https://tanstack.com/query/latest
- React Native: https://reactnative.dev/docs
