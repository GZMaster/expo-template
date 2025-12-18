/**
 * AsyncStorage Usage Examples
 * 
 * This file demonstrates how to use the storage utility functions
 * in your Expo React Native application.
 * 
 * Note: This is an example file and should not be imported directly.
 * Import from '@/utils/storage' instead.
 */

import {
  clear,
  getAllKeys,
  getArray,
  getBoolean,
  getItem,
  getNumber,
  getObject,
  multiGet,
  multiSet,
  removeItem,
  setArray,
  setBoolean,
  setItem,
  setNumber,
  setObject,
  type AppSettings,
  type User,
  type UserPreferences,
} from './storage';

// ============================================================================
// Example 1: Storing and Retrieving User Data
// ============================================================================

/**
 * Store user information
 */
export async function exampleStoreUser() {
  const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg',
  };

  // Using setItem with automatic JSON serialization
  await setItem('user', user);

  // Or using the type-safe setObject helper
  await setObject<User>('user', user);
}

/**
 * Retrieve user information
 */
export async function exampleGetUser() {
  // Using getItem with type inference
  const user = await getItem<User>('user');

  if (user) {
    console.log('User:', user.name, user.email);
  } else {
    console.log('No user found');
  }

  // Or using the type-safe getObject helper
  const user2 = await getObject<User>('user');
}

// ============================================================================
// Example 2: Storing and Retrieving Auth Token
// ============================================================================

/**
 * Store authentication token
 */
export async function exampleStoreAuthToken() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

  await setItem('authToken', token);
}

/**
 * Retrieve authentication token
 */
export async function exampleGetAuthToken() {
  const token = await getItem<string>('authToken');

  if (token) {
    // Use token for API requests
    console.log('Token retrieved:', token.substring(0, 20) + '...');
  } else {
    // Redirect to login
    console.log('No token found, redirecting to login');
  }
}

/**
 * Remove authentication token on logout
 */
export async function exampleLogout() {
  await removeItem('authToken');
  await removeItem('user');
}

// ============================================================================
// Example 3: Storing and Retrieving App Settings
// ============================================================================

/**
 * Store app settings
 */
export async function exampleStoreSettings() {
  const settings: AppSettings = {
    theme: 'dark',
    language: 'en',
    notifications: true,
    biometricAuth: true,
  };

  await setObject<AppSettings>('settings', settings);
}

/**
 * Retrieve app settings with defaults
 */
export async function exampleGetSettings() {
  const settings = await getObject<AppSettings>('settings');

  // Provide defaults if settings don't exist
  const defaultSettings: AppSettings = {
    theme: 'auto',
    language: 'en',
    notifications: true,
  };

  return settings || defaultSettings;
}

/**
 * Update a single setting
 */
export async function exampleUpdateTheme() {
  const settings = await getObject<AppSettings>('settings');

  if (settings) {
    settings.theme = 'dark';
    await setObject<AppSettings>('settings', settings);
  }
}

// ============================================================================
// Example 4: Storing and Retrieving User Preferences
// ============================================================================

/**
 * Store user preferences
 */
export async function exampleStorePreferences() {
  const preferences: UserPreferences = {
    fontSize: 'medium',
    soundEnabled: true,
    hapticFeedback: true,
    autoSave: false,
  };

  await setObject<UserPreferences>('preferences', preferences);
}

/**
 * Retrieve user preferences
 */
export async function exampleGetPreferences() {
  const preferences = await getObject<UserPreferences>('preferences');
  return preferences;
}

// ============================================================================
// Example 5: Using Boolean Helpers
// ============================================================================

/**
 * Store boolean values (e.g., onboarding status)
 */
export async function exampleStoreBooleans() {
  // Store onboarding status
  await setBoolean('hasSeenOnboarding', true);

  // Store feature flags
  await setBoolean('isPremiumUser', false);
  await setBoolean('hasEnabledNotifications', true);
}

/**
 * Retrieve boolean values with defaults
 */
export async function exampleGetBooleans() {
  // Get onboarding status (defaults to false if not set)
  const hasSeenOnboarding = await getBoolean('hasSeenOnboarding', false);

  // Get premium status (defaults to false)
  const isPremiumUser = await getBoolean('isPremiumUser', false);

  if (!hasSeenOnboarding) {
    // Show onboarding screen
    console.log('Showing onboarding');
  }
}

// ============================================================================
// Example 6: Using Number Helpers
// ============================================================================

/**
 * Store number values (e.g., counters, scores)
 */
export async function exampleStoreNumbers() {
  await setNumber('userCount', 42);
  await setNumber('highScore', 1000);
  await setNumber('lastSyncTimestamp', Date.now());
}

/**
 * Retrieve number values with defaults
 */
export async function exampleGetNumbers() {
  const userCount = await getNumber('userCount', 0);
  const highScore = await getNumber('highScore', 0);
  const lastSync = await getNumber('lastSyncTimestamp', 0);

  console.log(`Users: ${userCount}, High Score: ${highScore}`);

  // Check if sync is needed (older than 1 hour)
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  if (lastSync < oneHourAgo) {
    console.log('Sync needed');
  }
}

// ============================================================================
// Example 7: Using Array Helpers
// ============================================================================

/**
 * Store array values (e.g., tags, favorites, history)
 */
export async function exampleStoreArrays() {
  // Store tags
  await setArray<string>('tags', ['react', 'typescript', 'expo', 'react-native']);

  // Store favorite items
  await setArray<number>('favoriteIds', [1, 5, 12, 23]);

  // Store search history
  await setArray<string>('searchHistory', ['react native', 'expo', 'async storage']);
}

/**
 * Retrieve and manipulate arrays
 */
export async function exampleGetArrays() {
  const tags = await getArray<string>('tags');
  const favorites = await getArray<number>('favoriteIds');
  const history = await getArray<string>('searchHistory');

  if (tags) {
    console.log('Tags:', tags.join(', '));
  }

  if (favorites) {
    const isFavorite = favorites.includes(5);
    console.log('Is item 5 favorite?', isFavorite);
  }

  if (history) {
    // Limit history to last 10 items
    const limitedHistory = history.slice(-10);
    await setArray<string>('searchHistory', limitedHistory);
  }
}

// ============================================================================
// Example 8: Batch Operations
// ============================================================================

/**
 * Store multiple items at once
 */
export async function exampleBatchStore() {
  await multiSet([
    ['user', { id: 1, name: 'John', email: 'john@example.com' }],
    ['authToken', 'token123'],
    ['settings', { theme: 'dark', language: 'en' }],
    ['hasSeenOnboarding', true],
  ]);
}

/**
 * Retrieve multiple items at once
 */
export async function exampleBatchGet() {
  const items = await multiGet(['user', 'authToken', 'settings']);

  items.forEach(([key, value]) => {
    console.log(`${key}:`, value);
  });

  // Convert to object for easier access
  const data = Object.fromEntries(items);
  console.log('User:', data.user);
  console.log('Token:', data.authToken);
}

// ============================================================================
// Example 9: Storage Management
// ============================================================================

/**
 * Get all storage keys
 */
export async function exampleGetAllKeys() {
  const keys = await getAllKeys();
  console.log('All storage keys:', keys);
  // Output: ['@app:user', '@app:authToken', '@app:settings', ...]
}

/**
 * Clear all storage
 */
export async function exampleClearStorage() {
  // Clear all app storage (only items with @app: prefix)
  await clear();
  console.log('All storage cleared');
}

/**
 * Remove specific items
 */
export async function exampleRemoveItems() {
  await removeItem('authToken');
  await removeItem('user');
}

// ============================================================================
// Example 10: Complete Authentication Flow
// ============================================================================

/**
 * Complete example: Login flow
 */
export async function exampleLogin() {
  // Simulate API call
  const apiResponse = {
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  };

  // Store user data and token
  await multiSet([
    ['user', apiResponse.user],
    ['authToken', apiResponse.token],
    ['isLoggedIn', true],
  ]);

  console.log('Login successful');
}

/**
 * Complete example: Check authentication status
 */
export async function exampleCheckAuth() {
  const [user, token, isLoggedIn] = await Promise.all([
    getObject<User>('user'),
    getItem<string>('authToken'),
    getBoolean('isLoggedIn', false),
  ]);

  if (isLoggedIn && user && token) {
    console.log('User is authenticated:', user.name);
    return { authenticated: true, user, token };
  }

  return { authenticated: false, user: null, token: null };
}

/**
 * Complete example: Logout flow
 */
export async function exampleLogoutComplete() {
  // Remove all auth-related data
  await removeItem('authToken');
  await removeItem('user');
  await removeItem('isLoggedIn');

  console.log('Logout successful');
}

// ============================================================================
// Example 11: Error Handling
// ============================================================================

/**
 * Example with proper error handling
 */
export async function exampleWithErrorHandling() {
  try {
    const user = await getItem<User>('user');

    if (!user) {
      console.log('No user found, creating default user');
      const defaultUser: User = {
        id: 0,
        name: 'Guest',
        email: 'guest@example.com',
      };
      await setObject<User>('user', defaultUser);
      return defaultUser;
    }

    return user;
  } catch (error) {
    console.error('Failed to get user:', error);
    // Return default or handle error appropriately
    return null;
  }
}
