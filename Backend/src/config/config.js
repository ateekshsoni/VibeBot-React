import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the Backend directory
dotenv.config({ path: path.join(__dirname, "../../.env") });

import fs from "fs";

//enviorment detection
const NODE_ENV = process.env.NODE_ENV || "DEVELOPMENT";
const isDevelopment = NODE_ENV === "DEVELOPMENT";
const isProduction = NODE_ENV === "PRODUCTION";
const isTest = NODE_ENV === "TEST";

//utility function
function parseBoolean(value, defaultValue = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return defaultValue;
}

function parseInteger(value, defaultValue = 0) {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}
function parseArray(value, defaultValue = []) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return defaultValue;
}

//confrigation variables
function validateRequiredEnvVars() {
  const required = {
    development: ["MONGODB_URI"],
    production: [
      "MONGODB_URI",
      "JWT_SECRET",
      "JWT_REFRESH_SECRET",
      "SESSION_SECRET",
    ],
    test: ["MONGODB_TEST_URI"],
  };
  const requiredEnv = required[NODE_ENV.toLowerCase()] || require.development;
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    if (isProduction) {
      throw new Error(
        `Missing required environment variables: ${missing.join(", ")}`
      );
    } else {
      console.warn(
        `Warning: Missing required environment variables: ${missing.join(", ")}`
      );
      console.warn(
        "Using default values for missing variables in development mode."
      );
    }
  }
}

function validateConfiguration(config) {
  const errors = [];
  if (isProduction) {
    if (!config.JWT_SECRET || config.JWT_SECRET.length < 32) {
      errors.push("JWT_SECRET must be at least 32 characters in production");
    }

    if (!config.SESSION_SECRET || config.SESSION_SECRET.length < 32) {
      errors.push(
        "SESSION_SECRET must be at least 32 characters in production"
      );
    }

    if (config.BCRYPT_ROUNDS < 10) {
      errors.push("BCRYPT_ROUNDS should be at least 10 in production");
    }
  }

  if (errors.length > 0) {
    throw Error(`Configuration validation failed:\n${errors.join("\n")}`);
  }
}

//run validation
validateRequiredEnvVars();

const enhancedConfig = {
  NODE_ENV,
  isDevelopment,
  isProduction,
  isTest,

  // Application settings
  APP_NAME: process.env.APP_NAME || "VibeBot API",
  APP_VERSION: process.env.APP_VERSION || "1.0.0",
  PORT: parseInteger(process.env.PORT, 5001),
  HOST: process.env.HOST || "0.0.0.0",

  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vibebot",
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI || "mongodb://127.0.0.1:27017/vibebot_test",
  DISABLE_MONGODB: parseBoolean(process.env.DISABLE_MONGODB, false),

  // Database pool settings
  DB_MAX_POOL_SIZE: parseInteger(process.env.DB_MAX_POOL_SIZE, isProduction ? 20 : 10),
  DB_MIN_POOL_SIZE: parseInteger(process.env.DB_MIN_POOL_SIZE, isProduction ? 5 : 2),
  DB_MAX_IDLE_TIME: parseInteger(process.env.DB_MAX_IDLE_TIME, 30000),
  DB_SERVER_SELECTION_TIMEOUT: parseInteger(process.env.DB_SERVER_SELECTION_TIMEOUT, 10000),
  DB_SOCKET_TIMEOUT: parseInteger(process.env.DB_SOCKET_TIMEOUT, 45000),
  DB_CONNECT_TIMEOUT: parseInteger(process.env.DB_CONNECT_TIMEOUT, 30000),
  DB_CONNECTION_RETRY_ATTEMPTS: parseInteger(process.env.DB_CONNECTION_RETRY_ATTEMPTS, 3),
  DB_RETRY_INTERVAL: parseInteger(process.env.DB_RETRY_INTERVAL, 5000),

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret-change-in-production-2024",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-in-production-2024",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  JWT_ALGORITHM: process.env.JWT_ALGORITHM || "HS256",
  JWT_ISSUER: process.env.JWT_ISSUER || "vibebot-api",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || "vibebot-client",

  // Security Configuration
  BCRYPT_ROUNDS: parseInteger(process.env.BCRYPT_ROUNDS, 12),
  SESSION_SECRET: process.env.SESSION_SECRET || "session-secret-change-in-production",
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  COOKIE_SECURE: parseBoolean(process.env.COOKIE_SECURE, isProduction),
  COOKIE_SAME_SITE: process.env.COOKIE_SAME_SITE || (isProduction ? "strict" : "lax"),
  COOKIE_MAX_AGE: parseInteger(process.env.COOKIE_MAX_AGE, 24 * 60 * 60 * 1000),
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || "default-encryption-key-change-in-production",

  // Rate Limiting Configuration
  RATE_LIMIT_WINDOW: parseInteger(process.env.RATE_LIMIT_WINDOW, 15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: parseInteger(process.env.RATE_LIMIT_MAX_REQUESTS, 100),
  AUTH_RATE_LIMIT_MAX: parseInteger(process.env.AUTH_RATE_LIMIT_MAX, 5),

  // Client configuration
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:5173",
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5001",

  // Meta/Facebook Configuration
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,

  // Instagram Configuration
  INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET: process.env.INSTAGRAM_APP_SECRET,
  INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,
  INSTAGRAM_USER_ID: process.env.INSTAGRAM_USER_ID,
  INSTAGRAM_USERNAME: process.env.INSTAGRAM_USERNAME || "vibebot_user",
  INSTAGRAM_BUSINESS_ID: process.env.INSTAGRAM_BUSINESS_ID,

  // Instagram API URLs
  INSTAGRAM_OAUTH_URL: process.env.INSTAGRAM_OAUTH_URL || "https://www.instagram.com/oauth/authorize",
  INSTAGRAM_TOKEN_URL: process.env.INSTAGRAM_TOKEN_URL || "https://api.instagram.com/oauth/access_token",
  INSTAGRAM_GRAPH_URL: process.env.INSTAGRAM_GRAPH_URL || "https://graph.instagram.com",
  INSTAGRAM_LONG_LIVED_TOKEN_URL: process.env.INSTAGRAM_LONG_LIVED_TOKEN_URL || "https://graph.instagram.com/access_token",
  INSTAGRAM_REFRESH_TOKEN_URL: process.env.INSTAGRAM_REFRESH_TOKEN_URL || "https://graph.instagram.com/refresh_access_token",
  INSTAGRAM_BUSINESS_DISCOVERY_URL: process.env.INSTAGRAM_BUSINESS_DISCOVERY_URL || "https://graph.facebook.com",
  INSTAGRAM_CONTENT_PUBLISHING_URL: process.env.INSTAGRAM_CONTENT_PUBLISHING_URL || "https://graph.facebook.com",

  // Webhook Configuration
  INSTAGRAM_WEBHOOK_SECRET: process.env.INSTAGRAM_WEBHOOK_SECRET,
  WEBHOOK_BASE_URL: process.env.WEBHOOK_BASE_URL,
  WEBHOOK_VERIFY_TOKEN: process.env.WEBHOOK_VERIFY_TOKEN,

  // Clerk Authentication
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

  // Redis configuration
  REDIS_URL: process.env.REDIS_URL,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: parseInteger(process.env.REDIS_PORT, 6379),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: parseInteger(process.env.REDIS_DB, 0),
  REDIS_KEY_PREFIX: process.env.REDIS_KEY_PREFIX || "vibebot:",
  ENABLE_REDIS: parseBoolean(process.env.ENABLE_REDIS, !!process.env.REDIS_URL),

  // Server timeout and limits
  SERVER_TIMEOUT: parseInteger(process.env.SERVER_TIMEOUT, 120000),
  KEEP_ALIVE_TIMEOUT: parseInteger(process.env.KEEP_ALIVE_TIMEOUT, 65000),
  HEADERS_TIMEOUT: parseInteger(process.env.HEADERS_TIMEOUT, 66000),
  SHUTDOWN_TIMEOUT: parseInteger(process.env.SHUTDOWN_TIMEOUT, 30000),
  MAX_LISTENERS: parseInteger(process.env.MAX_LISTENERS, 20),
  MAX_HEADERS_COUNT: parseInteger(process.env.MAX_HEADERS_COUNT, 2000),
  MAX_REQUESTS_PER_SOCKET: parseInteger(process.env.MAX_REQUESTS_PER_SOCKET, 1000),
  HEALTH_CHECK_INTERVAL: parseInteger(process.env.HEALTH_CHECK_INTERVAL, 60000),
  MEMORY_THRESHOLD: parseInteger(process.env.MEMORY_THRESHOLD, 500),
  ENABLE_METRICS: parseBoolean(process.env.ENABLE_METRICS, isProduction),
  METRICS_PORT: parseInteger(process.env.METRICS_PORT, 9090),
};

validateConfiguration(enhancedConfig);

function sanitizeConfigForLogging(config) {
  const sensitiveKeys = [
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
    "SESSION_SECRET",
    "COOKIE_SECRET",
    "ENCRYPTION_KEY",
    "FACEBOOK_APP_SECRET",
    "INSTAGRAM_APP_SECRET",
    "INSTAGRAM_ACCESS_TOKEN",
    "INSTAGRAM_WEBHOOK_SECRET",
    "CLERK_SECRET_KEY",
    "REDIS_PASSWORD",
    "WEBHOOK_VERIFY_TOKEN"
  ];

  const sanitized = { ...config };

  sensitiveKeys.forEach((key) => {
    if (sanitized[key]) {
      sanitized[key] = "[REDACTED]";
    }
  });

  return sanitized;
}

console.log("📋 Enhanced configuration loaded:", {
  environment: enhancedConfig.NODE_ENV,
  port: enhancedConfig.PORT,
  database: enhancedConfig.MONGODB_URI ? "✅ Configured" : "❌ Missing",
  redis: enhancedConfig.REDIS_URL ? "✅ Configured" : "⚠️ Disabled",
});

// export {
//   enhancedConfig,
//   sanitizeConfigForLogging,
//   validateConfiguration,
//   parseBoolean,
//   parseInteger,
//   parseArray,
// };
export {
  enhancedConfig,
  sanitizeConfigForLogging,
  validateConfiguration,
  parseArray,
  parseBoolean,
  parseInteger,
};
