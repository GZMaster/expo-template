/**
 * API Error Handling
 *
 * Custom error classes for different HTTP status codes and error scenarios.
 * Provides structured error handling throughout the application.
 */

import { HTTP_STATUS } from '@/constants/api';
import type { ApiErrorResponse } from './types';

/**
 * Base API error class
 * All API errors extend this class
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public response?: ApiErrorResponse,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    if (this.response?.message) {
      return this.response.message;
    }
    return this.message || 'An unexpected error occurred';
  }

  /**
   * Get validation errors if available
   */
  getValidationErrors(): Record<string, string[]> | null {
    return this.response?.errors || null;
  }
}

/**
 * 400 Bad Request Error
 */
export class BadRequestError extends ApiError {
  constructor(message: string, response?: ApiErrorResponse, originalError?: unknown) {
    super(HTTP_STATUS.BAD_REQUEST, message, response, originalError);
    this.name = 'BadRequestError';
  }
}

/**
 * 401 Unauthorized Error
 * Indicates authentication is required or has failed
 */
export class UnauthorizedError extends ApiError {
  constructor(
    message: string = 'Authentication required',
    response?: ApiErrorResponse,
    originalError?: unknown,
  ) {
    super(HTTP_STATUS.UNAUTHORIZED, message, response, originalError);
    this.name = 'UnauthorizedError';
  }
}

/**
 * 403 Forbidden Error
 * Indicates the user doesn't have permission to access the resource
 */
export class ForbiddenError extends ApiError {
  constructor(
    message: string = 'Access forbidden',
    response?: ApiErrorResponse,
    originalError?: unknown,
  ) {
    super(HTTP_STATUS.FORBIDDEN, message, response, originalError);
    this.name = 'ForbiddenError';
  }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends ApiError {
  constructor(
    message: string = 'Resource not found',
    response?: ApiErrorResponse,
    originalError?: unknown,
  ) {
    super(HTTP_STATUS.NOT_FOUND, message, response, originalError);
    this.name = 'NotFoundError';
  }
}

/**
 * 409 Conflict Error
 */
export class ConflictError extends ApiError {
  constructor(
    message: string = 'Resource conflict',
    response?: ApiErrorResponse,
    originalError?: unknown,
  ) {
    super(HTTP_STATUS.CONFLICT, message, response, originalError);
    this.name = 'ConflictError';
  }
}

/**
 * 500 Internal Server Error
 */
export class ServerError extends ApiError {
  constructor(
    message: string = 'Internal server error',
    response?: ApiErrorResponse,
    originalError?: unknown,
  ) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message, response, originalError);
    this.name = 'ServerError';
  }
}

/**
 * Network Error
 * Indicates a network connectivity issue
 */
export class NetworkError extends ApiError {
  constructor(
    message: string = 'Network error. Please check your connection.',
    originalError?: unknown,
  ) {
    super(0, message, undefined, originalError);
    this.name = 'NetworkError';
  }
}

/**
 * Timeout Error
 * Indicates the request timed out
 */
export class TimeoutError extends ApiError {
  constructor(message: string = 'Request timeout. Please try again.', originalError?: unknown) {
    super(0, message, undefined, originalError);
    this.name = 'TimeoutError';
  }
}

/**
 * Create appropriate error instance based on status code
 */
export function createApiError(
  statusCode: number,
  message: string,
  response?: ApiErrorResponse,
  originalError?: unknown,
): ApiError {
  switch (statusCode) {
    case HTTP_STATUS.BAD_REQUEST:
      return new BadRequestError(message, response, originalError);
    case HTTP_STATUS.UNAUTHORIZED:
      return new UnauthorizedError(message, response, originalError);
    case HTTP_STATUS.FORBIDDEN:
      return new ForbiddenError(message, response, originalError);
    case HTTP_STATUS.NOT_FOUND:
      return new NotFoundError(message, response, originalError);
    case HTTP_STATUS.CONFLICT:
      return new ConflictError(message, response, originalError);
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return new ServerError(message, response, originalError);
    default:
      return new ApiError(statusCode, message, response, originalError);
  }
}

/**
 * Format error message for user display
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.getUserMessage();
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
