/**
 * Production-ready error handling utilities
 */

export class APIError extends Error {
  constructor(message, status, endpoint, response) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.endpoint = endpoint;
    this.response = response;
    this.timestamp = new Date().toISOString();
  }
}

export class AuthError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'AuthError';
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

export class NetworkError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'NetworkError';
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
  }
}

// Error reporting service (replace with your error tracking service)
export const reportError = (error, context = {}) => {
  // In production, send to error tracking service like Sentry
  if (import.meta.env.VITE_APP_ENV === 'production') {
    // Sentry.captureException(error, { extra: context });
    console.error('[PRODUCTION ERROR]', error, context);
  } else {
    console.error('[DEV ERROR]', error, context);
  }
};

// Retry logic for API calls
export const withRetry = async (fn, maxAttempts = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on auth errors or client errors
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      if (attempt === maxAttempts) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }
  
  throw lastError;
};

// Safe async function wrapper
export const safeAsync = (fn, fallback = null) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      reportError(error, { function: fn.name, args });
      return fallback;
    }
  };
};

export default {
  APIError,
  AuthError, 
  NetworkError,
  reportError,
  withRetry,
  safeAsync
};
