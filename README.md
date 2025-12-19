# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Gluestack UI

This project includes [Gluestack UI v3](https://gluestack.io/ui/docs/home/overview/quick-start), a universal UI library for React Native that provides styled and accessible components.

### Installation

Gluestack UI v3 is already installed and configured in this project. The following dependencies are included:

- `@gluestack-ui/themed` - Core Gluestack UI components
- `react-native-reanimated` - Required for animations
- `react-native-gesture-handler` - Required for gesture handling
- `react-native-svg` - Required for icon components

### Configuration

The app is wrapped with `GluestackUIProvider` in `app/_layout.tsx`, which provides the necessary context for all Gluestack UI components. The provider is configured to automatically support light and dark modes based on the system color scheme.

Theme configuration can be customized in `theme/gluestack-theme.config.ts`.

### Usage

Import Gluestack UI components from `@gluestack-ui/themed`:

```tsx
import { Box, Text, Button, ButtonText, VStack, HStack } from '@gluestack-ui/themed';

function MyComponent() {
  return (
    <Box p="$4">
      <VStack space="md">
        <Text size="lg">Hello, Gluestack UI!</Text>
        <Button>
          <ButtonText>Click Me</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
```

### Available Components

Gluestack UI provides a wide range of components including:

- **Layout**: `Box`, `VStack`, `HStack`, `Center`, `View`
- **Typography**: `Text`, `Heading`
- **Buttons**: `Button`, `ButtonText`
- **Forms**: `Input`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Select`
- **Feedback**: `Alert`, `Toast`, `Spinner`, `Progress`
- **Overlays**: `Modal`, `Popover`, `Actionsheet`, `AlertDialog`
- **Navigation**: `Tabs`, `Menu`
- **Data Display**: `Card`, `Avatar`, `Badge`, `Divider`
- **And many more...**

### Demo Screen

A demo screen showcasing basic Gluestack UI components is available in the app. Navigate to the "Gluestack" tab to see examples of:

- Box component with styling
- Text component with different sizes
- VStack and HStack layout components
- Button component with various variants

### Theme Customization

The theme can be customized by modifying `theme/gluestack-theme.config.ts`. Gluestack UI uses a token-based design system that supports:

- Custom colors
- Typography scales
- Spacing scales
- Border radius values
- And more

For detailed theme customization, refer to the [Gluestack UI Theme Documentation](https://gluestack.io/ui/docs/home/overview/quick-start).

### Documentation

For complete documentation and component APIs, visit:

- [Gluestack UI Documentation](https://gluestack.io/ui/docs/home/overview/quick-start)
- [Component Examples](https://gluestack.io/ui/docs/home/components)
- [GitHub Repository](https://github.com/gluestack/gluestack-ui)

## API Client Architecture

This project includes a production-ready API client layer built with **Axios** and **TanStack Query (React Query)**. The API client provides type-safe data fetching, caching, error handling, and authentication integration.

### Overview

The API client is organized into several key components:

```
/src/services
  ├── client.ts              # Axios instance with interceptors
  ├── queryClient.ts         # TanStack Query configuration
  ├── endpoints.ts           # API endpoint constants
  ├── types.ts               # TypeScript interfaces
  ├── errors.ts              # Error handling utilities
  ├── queryKeys.ts           # Query keys factory
  └── hooks/
      ├── useAuth.ts         # Authentication hooks
      ├── useUser.ts         # User management hooks
      └── useItems.ts        # Example resource hooks
```

### Setup

1. **Environment Configuration**

   Create a `.env` file in the root directory (see `.env.example`):

   ```env
   EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

   Or configure it in `app.json`:

   ```json
   {
     "expo": {
       "extra": {
         "apiBaseUrl": "https://api.example.com/api"
       }
     }
   }
   ```

2. **QueryClientProvider**

   The app is already wrapped with `QueryClientProvider` in `App.tsx`, which enables TanStack Query throughout the application.

### Usage Examples

#### Authentication Hooks

```tsx
import { useLogin, useLogout } from '@services/hooks';

function LoginScreen() {
  const { mutate: login, isPending, error } = useLogin();
  
  const handleLogin = () => {
    login(
      { email: 'user@example.com', password: 'password' },
      {
        onSuccess: () => {
          // Navigation happens automatically via AuthContext
        },
        onError: (error) => {
          console.error('Login failed:', error);
        },
      }
    );
  };
  
  return <Button onPress={handleLogin}>Login</Button>;
}
```

#### Query Hooks (GET requests)

```tsx
import { useGetItems } from '@/api/hooks';

function ItemsScreen() {
  const { data, isLoading, error, refetch } = useGetItems({ page: 1, limit: 10 });
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <FlatList
      data={data?.data}
      renderItem={({ item }) => <ItemCard item={item} />}
      refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
    />
  );
}
```

#### Mutation Hooks (POST, PUT, DELETE)

```tsx
import { useCreateItem, useUpdateItem, useDeleteItem } from '@/api/hooks';

function CreateItemForm() {
  const { mutate: createItem, isPending } = useCreateItem();
  
  const handleCreate = () => {
    createItem(
      { title: 'New Item', description: 'Item description' },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Item created!');
        },
        onError: (error) => {
          Alert.alert('Error', error.message);
        },
      }
    );
  };
  
  return <Button onPress={handleCreate}>Create</Button>;
}
```

### Creating New API Hooks

1. **Define Types** (`api/types.ts`)

   ```typescript
   export interface MyResource {
     id: string;
     name: string;
   }
   
   export interface CreateMyResourceRequest {
     name: string;
   }
   ```

2. **Add Endpoints** (`api/endpoints.ts`)

   ```typescript
   export const apiEndpoints = {
     myResources: {
       list: () => '/my-resources',
       byId: (id: string) => `/my-resources/${id}`,
       create: () => '/my-resources',
       update: (id: string) => `/my-resources/${id}`,
       delete: (id: string) => `/my-resources/${id}`,
     },
   };
   ```

3. **Add Query Keys** (`api/queryKeys.ts`)

   ```typescript
   export const queryKeys = {
     myResources: {
       all: ['myResources'] as const,
       lists: () => [...queryKeys.myResources.all, 'list'] as const,
       list: (filters?: Record<string, unknown>) =>
         [...queryKeys.myResources.lists(), filters] as const,
       details: () => [...queryKeys.myResources.all, 'detail'] as const,
       detail: (id: string) => [...queryKeys.myResources.details(), id] as const,
     },
   };
   ```

4. **Create Hooks** (`api/hooks/useMyResources.ts`)

   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { apiClient } from '../client';
   import { queryKeys } from '../queryKeys';
   import { apiEndpoints } from '../endpoints';
   import type { MyResource, CreateMyResourceRequest } from '../types';
   
   export function useGetMyResources() {
     return useQuery({
       queryKey: queryKeys.myResources.list(),
       queryFn: async () => {
         const response = await apiClient.get(apiEndpoints.myResources.list());
         return response.data;
       },
     });
   }
   
   export function useCreateMyResource() {
     const queryClient = useQueryClient();
     
     return useMutation({
       mutationFn: async (data: CreateMyResourceRequest) => {
         const response = await apiClient.post(
           apiEndpoints.myResources.create(),
           data
         );
         return response.data;
       },
       onSuccess: () => {
         // Invalidate list to refetch
         queryClient.invalidateQueries({ 
           queryKey: queryKeys.myResources.lists() 
         });
       },
     });
   }
   ```

### Features

#### Authentication Integration

- Automatic token attachment to requests via request interceptor
- Token refresh on 401 errors
- Automatic logout and cache clearing on authentication failure
- Integration with `AuthContext` for state management

#### Error Handling

- Custom error classes for different HTTP status codes
- User-friendly error messages
- Network and timeout error handling
- Centralized error formatting

#### Caching Strategy

- Automatic caching with configurable stale times
- Cache invalidation after mutations
- Optimistic updates for better UX
- Query key factory for consistent cache management

#### Type Safety

- Full TypeScript support throughout
- Typed request/response interfaces
- Type-safe query keys and endpoints
- Generic hooks for reusability

### Configuration

API configuration can be adjusted in `constants/api.ts`:

```typescript
export const API_CONFIG = {
  timeout: 10000,        // Request timeout in ms
  maxRetries: 3,         // Maximum retry attempts
  retryDelay: 1000,      // Base retry delay in ms
  enableLogging: __DEV__, // Enable request/response logging
};
```

Query client defaults can be configured in `api/queryClient.ts`:

```typescript
defaultOptions: {
  queries: {
    staleTime: 5 * 60 * 1000,  // 5 minutes
    gcTime: 10 * 60 * 1000,    // 10 minutes
    retry: 3,
  },
}
```

### Example Screen

A complete example screen demonstrating all API hook patterns is available at `screens/main/ApiDemoScreen.tsx`. This screen shows:

- Query hooks with loading and error states
- Mutation hooks for create, update, and delete
- Optimistic updates
- Cache invalidation
- Pull-to-refresh functionality

### Best Practices

1. **Use Query Keys Factory**: Always use the query keys factory pattern for consistent cache management
2. **Invalidate After Mutations**: Always invalidate related queries after mutations
3. **Handle Loading States**: Always handle loading and error states in your components
4. **Type Everything**: Define TypeScript interfaces for all API requests and responses
5. **Error Handling**: Use the provided error formatting utilities for user-friendly messages
6. **Optimistic Updates**: Use optimistic updates for better UX when appropriate

### Documentation

For more information, refer to:

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Code Quality and Formatting

This project uses **Biome** for formatting and **ESLint** for code quality checks. Both tools are configured to work together seamlessly.

### Tools

- **Biome**: Fast formatter and linter that handles code formatting and import organization
- **ESLint**: Code quality linter with TypeScript, React, and React Native specific rules

### Available Scripts

Run these commands from the project root:

```bash
# Format code with Biome
npm run format

# Check formatting without modifying files
npm run format:check

# Lint code with ESLint
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Run both Biome check and ESLint
npm run check

# Run both with auto-fix
npm run check:fix
```

### Editor Setup (VSCode)

The project includes VSCode settings for automatic formatting and linting:

1. **Install recommended extensions** (VSCode will prompt you):
   - `biomejs.biome` - Biome formatter and linter
   - `dbaeumer.vscode-eslint` - ESLint integration

2. **Automatic formatting** is enabled:
   - Format on save is enabled
   - Biome is set as the default formatter for TypeScript/JavaScript files
   - ESLint auto-fix runs on save
   - Imports are automatically organized on save

3. **Manual formatting**: Use `Shift + Alt + F` (Windows/Linux) or `Shift + Option + F` (Mac) to format the current file

### Configuration

#### Biome Configuration (`biome.json`)

- **Formatter settings**:
  - Line width: 100 characters
  - Indent width: 2 spaces
  - Single quotes for strings
  - Semicolons: required
  - Trailing commas: all

- **Linter**: Recommended rules enabled with React and TypeScript support
- **Organize imports**: Automatically enabled

#### ESLint Configuration (`eslint.config.js`)

- **TypeScript**: Full TypeScript support with type-aware linting
- **React**: React and React Hooks rules enabled
- **React Native**: React Native specific rules and best practices
- **Rules**:
  - React Hooks exhaustive-deps and rules-of-hooks enforced
  - TypeScript `no-explicit-any` as warning
  - Console statements allowed in development
  - Formatting rules disabled (handled by Biome)

### Git Hooks

The project uses **Husky** and **lint-staged** to automatically format and lint code before commits:

- **Pre-commit hook**: Runs Biome formatter and ESLint on staged files
- **Automatic setup**: Husky is initialized when you run `npm install`

If linting fails, the commit will be blocked. Fix the issues and try committing again.

### Disabling Rules

#### Disable a rule for a specific line

**ESLint:**
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();
```

**Biome:**
```typescript
// biome-ignore lint/suspicious/noExplicitAny: <reason>
const data: any = fetchData();
```

#### Disable a rule for a file

**ESLint:**
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
```

**Biome:**
```typescript
/* biome-ignore lint/suspicious/noExplicitAny: <reason> */
```

### Troubleshooting

#### Formatting not working in VSCode

1. Ensure the Biome extension is installed
2. Check that Biome is set as the default formatter in VSCode settings
3. Reload VSCode window: `Ctrl+Shift+P` → "Reload Window"

#### ESLint errors not showing

1. Ensure the ESLint extension is installed
2. Check the ESLint output panel: `View` → `Output` → Select "ESLint"
3. Restart ESLint server: `Ctrl+Shift+P` → "ESLint: Restart ESLint Server"

#### Pre-commit hook not running

1. Ensure Husky is installed: `npm install`
2. Check that `.husky/pre-commit` file exists and is executable
3. Verify `lint-staged` is configured in `package.json`

#### Conflicts between Biome and ESLint

Biome handles formatting, ESLint handles code quality. If you see conflicts:
- Formatting issues → Use Biome (`npm run format`)
- Code quality issues → Use ESLint (`npm run lint:fix`)

### CI/CD Integration

To run linting and formatting checks in your CI/CD pipeline:

```bash
# Check formatting
npm run format:check

# Run linting
npm run lint

# Or run both
npm run check
```

If any check fails, the build should fail. This ensures code quality standards are maintained.

### Migration Notes

After initial setup, you may want to:

1. **Format the entire codebase**: `npm run format`
2. **Fix auto-fixable ESLint issues**: `npm run lint:fix`
3. **Review remaining warnings**: Some rules may be set to "warn" instead of "error" for a grace period
4. **Adjust rules as needed**: Modify `eslint.config.js` or `biome.json` to match your team's preferences

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
