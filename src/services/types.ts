/**
 * API Types
 *
 * TypeScript interfaces and types for API requests and responses.
 * Provides type safety throughout the API client layer.
 */

import type { User } from '@/contexts/AuthContext';

/**
 * Base API response structure
 * Most API responses follow this pattern
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Error response from API
 */
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
  statusCode: number;
}

/**
 * Authentication request types
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Authentication response types
 */
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SignupResponse extends LoginResponse {}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Example resource types (Item)
 * Replace with your actual resource types
 */
export interface Item {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateItemRequest {
  title: string;
  description?: string;
}

export interface UpdateItemRequest {
  title?: string;
  description?: string;
}

export interface ItemListResponse extends PaginatedResponse<Item> {}

export interface ItemResponse extends ApiResponse<Item> {}

/**
 * User update request
 */
export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

/**
 * User response
 */
export interface UserResponse extends ApiResponse<User> {}

/**
 * Query result state discriminated union
 * Useful for type-safe state handling in components
 */
export type QueryResult<T> =
  | { status: 'idle'; data: undefined; error: null }
  | { status: 'loading'; data: T | undefined; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: T | undefined; error: Error };

/**
 * Mutation result state discriminated union
 */
export type MutationResult<TData, TVariables = unknown> =
  | { status: 'idle'; data: undefined; error: null; variables: undefined }
  | { status: 'loading'; data: TData | undefined; error: null; variables: TVariables | undefined }
  | { status: 'success'; data: TData; error: null; variables: TVariables }
  | { status: 'error'; data: TData | undefined; error: Error; variables: TVariables | undefined };
