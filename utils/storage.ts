import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage key prefix to avoid naming collisions
 * All storage keys should be prefixed with this value
 */
export const STORAGE_PREFIX = '@app:';

/**
 * Storage version for future migration support
 */
export const STORAGE_VERSION = '1.0.0';

/**
 * Type-safe storage keys
 * Add new keys here as needed for type safety
 */
export type StorageKeys =
  | '@app:user'
  | '@app:authToken'
  | '@app:settings'
  | '@app:preferences';

/**
 * Helper function to prefix storage keys
 * @param key - The storage key (with or without prefix)
 * @returns Prefixed storage key
 */
function prefixKey(key: string): string {
  return key.startsWith(STORAGE_PREFIX) ? key : `${STORAGE_PREFIX}${key}`;
}

/**
 * Store a value in AsyncStorage with JSON serialization
 * @param key - Storage key (will be prefixed automatically)
 * @param value - Value to store (will be JSON stringified)
 * @returns Promise that resolves when the value is stored
 * @example
 * ```typescript
 * await setItem('user', { id: 1, name: 'John' });
 * await setItem('@app:authToken', 'token123');
 * ```
 */
export async function setItem(key: string, value: any): Promise<void> {
  try {
    const prefixedKey = prefixKey(key);
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(prefixedKey, serializedValue);
  } catch (error) {
    console.error(`[Storage] Failed to set item "${key}":`, error);
    throw error;
  }
}

/**
 * Retrieve a value from AsyncStorage with JSON deserialization
 * @param key - Storage key (will be prefixed automatically)
 * @returns Promise that resolves to the deserialized value or null if not found
 * @example
 * ```typescript
 * const user = await getItem<User>('user');
 * const token = await getItem<string>('authToken');
 * ```
 */
export async function getItem<T = any>(key: string): Promise<T | null> {
  try {
    const prefixedKey = prefixKey(key);
    const value = await AsyncStorage.getItem(prefixedKey);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`[Storage] Failed to get item "${key}":`, error);
    return null;
  }
}

/**
 * Remove a single item from AsyncStorage
 * @param key - Storage key (will be prefixed automatically)
 * @returns Promise that resolves when the item is removed
 * @example
 * ```typescript
 * await removeItem('user');
 * await removeItem('@app:authToken');
 * ```
 */
export async function removeItem(key: string): Promise<void> {
  try {
    const prefixedKey = prefixKey(key);
    await AsyncStorage.removeItem(prefixedKey);
  } catch (error) {
    console.error(`[Storage] Failed to remove item "${key}":`, error);
    throw error;
  }
}

/**
 * Clear all storage items (only those with the app prefix)
 * @returns Promise that resolves when all items are cleared
 * @example
 * ```typescript
 * await clear();
 * ```
 */
export async function clear(): Promise<void> {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const appKeys = allKeys.filter(key => key.startsWith(STORAGE_PREFIX));

    if (appKeys.length > 0) {
      await AsyncStorage.multiRemove(appKeys);
    }
  } catch (error) {
    console.error('[Storage] Failed to clear storage:', error);
    throw error;
  }
}

/**
 * Retrieve all storage keys (only those with the app prefix)
 * @returns Promise that resolves to an array of storage keys
 * @example
 * ```typescript
 * const keys = await getAllKeys();
 * console.log('All storage keys:', keys);
 * ```
 */
export async function getAllKeys(): Promise<string[]> {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    return allKeys.filter(key => key.startsWith(STORAGE_PREFIX));
  } catch (error) {
    console.error('[Storage] Failed to get all keys:', error);
    return [];
  }
}

/**
 * Batch retrieve multiple items from AsyncStorage
 * @param keys - Array of storage keys (will be prefixed automatically)
 * @returns Promise that resolves to an array of [key, value] pairs
 * @example
 * ```typescript
 * const items = await multiGet(['user', 'authToken', 'settings']);
 * items.forEach(([key, value]) => {
 *   console.log(key, value);
 * });
 * ```
 */
export async function multiGet(keys: string[]): Promise<Array<[string, any]>> {
  try {
    const prefixedKeys = keys.map(prefixKey);
    const items = await AsyncStorage.multiGet(prefixedKeys);

    return items.map(([key, value]) => {
      const originalKey = key.replace(STORAGE_PREFIX, '');
      const parsedValue = value !== null ? JSON.parse(value) : null;
      return [originalKey, parsedValue] as [string, any];
    });
  } catch (error) {
    console.error(`[Storage] Failed to multi-get items:`, error);
    return [];
  }
}

/**
 * Batch store multiple items in AsyncStorage
 * @param keyValuePairs - Array of [key, value] pairs to store
 * @returns Promise that resolves when all items are stored
 * @example
 * ```typescript
 * await multiSet([
 *   ['user', { id: 1, name: 'John' }],
 *   ['authToken', 'token123'],
 *   ['settings', { theme: 'dark' }]
 * ]);
 * ```
 */
export async function multiSet(keyValuePairs: [string, any][]): Promise<void> {
  try {
    const prefixedPairs: [string, string][] = keyValuePairs.map(([key, value]) => {
      const prefixedKey = prefixKey(key);
      const serializedValue = JSON.stringify(value);
      return [prefixedKey, serializedValue];
    });

    await AsyncStorage.multiSet(prefixedPairs);
  } catch (error) {
    console.error(`[Storage] Failed to multi-set items:`, error);
    throw error;
  }
}

// ============================================================================
// Type-Specific Helper Functions
// ============================================================================

/**
 * Store a boolean value in AsyncStorage
 * @param key - Storage key (will be prefixed automatically)
 * @param value - Boolean value to store
 * @returns Promise that resolves when the value is stored
 * @example
 * ```typescript
 * await setBoolean('hasSeenOnboarding', true);
 * ```
 */
export async function setBoolean(key: string, value: boolean): Promise<void> {
  await setItem(key, value);
}

/**
 * Retrieve a boolean value from AsyncStorage
 * @param key - Storage key (will be prefixed automatically)
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns Promise that resolves to the boolean value or default
 * @example
 * ```typescript
 * const hasSeenOnboarding = await getBoolean('hasSeenOnboarding', false);
 * ```
 */
export async function getBoolean(key: string, defaultValue: boolean = false): Promise<boolean> {
  const value = await getItem<boolean>(key);
  return value !== null ? value : defaultValue;
}

/**
 * Store a number value in AsyncStorage
 * @param key - Storage key (will be prefixed automatically)
 * @param value - Number value to store
 * @returns Promise that resolves when the value is stored
 * @example
 * ```typescript
 * await setNumber('userCount', 42);
 * ```
 */
export async function setNumber(key: string, value: number): Promise<void> {
  await setItem(key, value);
}

/**
 * Retrieve a number value from AsyncStorage
 * @param key - Storage key (will be prefixed automatically)
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns Promise that resolves to the number value or default
 * @example
 * ```typescript
 * const userCount = await getNumber('userCount', 0);
 * ```
 */
export async function getNumber(key: string, defaultValue: number = 0): Promise<number> {
  const value = await getItem<number>(key);
  return value !== null ? value : defaultValue;
}

/**
 * Store an object in AsyncStorage with type safety
 * @param key - Storage key (will be prefixed automatically)
 * @param value - Object to store
 * @returns Promise that resolves when the value is stored
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 * }
 * await setObject<User>('user', { id: 1, name: 'John' });
 * ```
 */
export async function setObject<T extends Record<string, any>>(key: string, value: T): Promise<void> {
  await setItem(key, value);
}

/**
 * Retrieve an object from AsyncStorage with type safety
 * @param key - Storage key (will be prefixed automatically)
 * @returns Promise that resolves to the object or null if not found
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 * }
 * const user = await getObject<User>('user');
 * ```
 */
export async function getObject<T extends Record<string, any>>(key: string): Promise<T | null> {
  return getItem<T>(key);
}

/**
 * Store an array in AsyncStorage with type safety
 * @param key - Storage key (will be prefixed automatically)
 * @param value - Array to store
 * @returns Promise that resolves when the value is stored
 * @example
 * ```typescript
 * await setArray<string>('tags', ['react', 'typescript', 'expo']);
 * ```
 */
export async function setArray<T>(key: string, value: T[]): Promise<void> {
  await setItem(key, value);
}

/**
 * Retrieve an array from AsyncStorage with type safety
 * @param key - Storage key (will be prefixed automatically)
 * @returns Promise that resolves to the array or null if not found
 * @example
 * ```typescript
 * const tags = await getArray<string>('tags');
 * ```
 */
export async function getArray<T>(key: string): Promise<T[] | null> {
  return getItem<T[]>(key);
}

// ============================================================================
// Common Data Type Interfaces
// ============================================================================

/**
 * User data structure for storage
 */
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

/**
 * App settings structure for storage
 */
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
  biometricAuth?: boolean;
}

/**
 * User preferences structure for storage
 */
export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large';
  soundEnabled: boolean;
  hapticFeedback: boolean;
  autoSave: boolean;
}
