//database config

const config = {
  development: {
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    maxIdleTimeMS: 30000,
    heartbeatFrequencyMS: 10000,
    maxRetryAttempts: 3,
    retryInterval: 5000,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 5000,
    },
    readPreference: "primary",
  },

  production: {
    maxPoolSize: 20,
    minPoolSize: 5,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 60000,
    connectTimeoutMS: 30000,
    maxIdleTimeMS: 60000,
    heartbeatFrequencyMS: 30000,
    maxRetryAttempts: 5,
    retryInterval: 5000,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 10000,
    },
    readPreference: "secondaryPreferred",
    maxStalenessSeconds: 120,
    authSource: "admin",
    compressors: ["zlib"],
  },

  test: {
    maxPoolSize: 5,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 10000,
    maxIdleTimeMS: 10000,
    heartbeatFrequencyMS: 5000,
    maxRetryAttempts: 2,
    retryInterval: 2000,
    writeConcern: {
      w: 1,
      j: false,
      wtimeout: 3000,
    },
    readPreference: "primary",
  },
};

const getDataBaseConfig = (env = process.env.NODE_ENV || "development") => {
  const baseConfig = config[env] || config.development;

  return {
    ...baseConfig,
    maxPoolSize: process.env.DB_MAX_POOL_SIZE
      ? parseInt(process.env.DB_MAX_POOL_SIZE, 10)
      : baseConfig.maxPoolSize,
    minPoolSize: process.env.DB_MIN_POOL_SIZE
      ? parseInt(process.env.DB_MIN_POOL_SIZE, 10)
      : baseConfig.minPoolSize,
    serverSelectionTimeoutMS: process.env.DB_SERVER_SELECTION_TIMEOUT
      ? parseInt(process.env.DB_SERVER_SELECTION_TIMEOUT, 10)
      : baseConfig.serverSelectionTimeoutMS,
    socketTimeoutMS: process.env.DB_SOCKET_TIMEOUT
      ? parseInt(process.env.DB_SOCKET_TIMEOUT, 10)
      : baseConfig.socketTimeoutMS,
    connectTimeoutMS: process.env.DB_CONNECT_TIMEOUT
      ? parseInt(process.env.DB_CONNECT_TIMEOUT, 10)
      : baseConfig.connectTimeoutMS,
    maxIdleTimeMS: process.env.DB_MAX_IDLE_TIME
      ? parseInt(process.env.DB_MAX_IDLE_TIME, 10)
      : baseConfig.maxIdleTimeMS,
    maxRetryAttempts: process.env.DB_CONNECTION_RETRY_ATTEMPTS
      ? parseInt(process.env.DB_CONNECTION_RETRY_ATTEMPTS, 10)
      : baseConfig.maxRetryAttempts,
    retryInterval: process.env.DB_RETRY_INTERVAL
      ? parseInt(process.env.DB_RETRY_INTERVAL, 10)
      : baseConfig.retryInterval,
  };
};
const getConnectionUris = () => {
  const env = (process.env.NODE_ENV || "development").toLowerCase();

  const uriMap = {
    development: [
      process.env.MONGODB_URI,
      "mongodb://127.0.0.1:27017/auth_system",
    ],
    production: [process.env.MONGODB_URI],
    test: [
      process.env.MONGODB_TEST_URI,
      process.env.MONGO_TEST_URI,
      "mongodb://127.0.0.1:27017/auth_system_test",
    ],
  };

  return uriMap[env] || [];
};

export { getDataBaseConfig, getConnectionUris, config };
