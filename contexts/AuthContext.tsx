/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the app.
 * Integrates with AsyncStorage for persistence.
 */

import { getBoolean, getItem, multiSet, removeItem } from '@/utils/storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * User interface
 * Extend this interface based on your user model
 */
export interface User {
  id: string;
  email: string;
  name?: string;
}

/**
 * Authentication context value interface
 */
interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  // Setters for API hooks integration (optional, for use by API hooks)
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
}

/**
 * Authentication context
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthContext Provider Component
 * 
 * Manages authentication state and provides auth methods to children.
 * Automatically checks for existing auth state on mount.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Check authentication status from storage
   */
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      // Check if user is logged in
      const [isLoggedIn, storedUser, authToken] = await Promise.all([
        getBoolean('isLoggedIn', false),
        getItem<User>('user'),
        getItem<string>('authToken'),
      ]);

      if (isLoggedIn && storedUser && authToken) {
        setIsAuthenticated(true);
        setUser(storedUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('[Auth] Failed to check auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login function
   * In a real app, this would make an API call
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      // For now, simulate a successful login
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      const mockToken = 'mock-auth-token-' + Date.now();

      // Store auth data
      await multiSet([
        ['user', mockUser],
        ['authToken', mockToken],
        ['isLoggedIn', true],
      ]);

      setIsAuthenticated(true);
      setUser(mockUser);
    } catch (error) {
      console.error('[Auth] Login failed:', error);
      throw error;
    }
  }, []);

  /**
   * Signup function
   * In a real app, this would make an API call
   */
  const signup = useCallback(async (email: string, password: string, name?: string) => {
    try {
      // TODO: Replace with actual API call
      // For now, simulate a successful signup
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: name || email.split('@')[0],
      };
      const mockToken = 'mock-auth-token-' + Date.now();

      // Store auth data
      await multiSet([
        ['user', mockUser],
        ['authToken', mockToken],
        ['isLoggedIn', true],
      ]);

      setIsAuthenticated(true);
      setUser(mockUser);
    } catch (error) {
      console.error('[Auth] Signup failed:', error);
      throw error;
    }
  }, []);

  /**
   * Logout function
   * Clears all auth-related data from storage
   */
  const logout = useCallback(async () => {
    try {
      // Remove auth data
      await Promise.all([
        removeItem('user'),
        removeItem('authToken'),
        removeItem('isLoggedIn'),
      ]);

      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('[Auth] Logout failed:', error);
      throw error;
    }
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextValue = {
    isAuthenticated,
    isLoading,
    user,
    login,
    signup,
    logout,
    checkAuth,
    // Expose setters for API hooks integration
    setIsAuthenticated,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication context
 * 
 * @throws Error if used outside AuthProvider
 * @returns AuthContextValue
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isAuthenticated, login, logout } = useAuth();
 *   // ...
 * }
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
