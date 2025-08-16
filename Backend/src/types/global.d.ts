// Global type definitions for the backend
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      DATABASE_URL?: string;
      JWT_SECRET?: string;
      // Add more environment variables as needed
    }
  }
}

// Custom types for your application
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Express Request extension for authenticated routes
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export {};
