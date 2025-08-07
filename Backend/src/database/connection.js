import mongoose, { set } from "mongoose";
import { getDataBaseConfig, getConnectionUris } from "../config/database.js";

let isConnected = false;
let connectionsAttempt = 0;
let databaseConfig = getDataBaseConfig();
const MAX_RETRY_ATTEMPTS = databaseConfig.maxRetryAttempts || 5;
const RETRY_INTERVAL = databaseConfig.retryInterval || 2000;

const validateMongoUri = (uri) => {
  if (!uri || typeof uri !== "string") {
    return false;
  }
  const mongoUriRegex = /^mongodb(\+srv)?:\/\//;
  return mongoUriRegex.test(uri);
};

const getMongoUri = () => {
  const uriCandidates = getConnectionUris().filter(Boolean);
  console.log("Available MongoDB URIs:", uriCandidates);
  for (const uri of uriCandidates) {
    if (validateMongoUri(uri)) {
      // Mask credentials in logs
      const maskedUri = uri.replace(/:\/\/([^:]+):([^@]+)@/, "://***:***@");
      console.info(`Using MongoDB URI: ${maskedUri}`);
      return uri;
    }
  }
  throw new Error("No valid MongoDB URI found in environment variables");
};

const getConnectionOptions = () => {
  const config = getDataBaseConfig();

  return {
    // Connection pool optimization
    maxPoolSize: config.maxPoolSize,
    minPoolSize: config.minPoolSize,

    // Timeout settings
    serverSelectionTimeoutMS: config.serverSelectionTimeoutMS,
    socketTimeoutMS: config.socketTimeoutMS,
    connectTimeoutMS: config.connectTimeoutMS,

    // Heartbeat and monitoring
    heartbeatFrequencyMS: config.heartbeatFrequencyMS,
    maxIdleTimeMS: config.maxIdleTimeMS,

    // Write concern for data consistency
    writeConcern: config.writeConcern,

    // Read preference for load balancing
    readPreference: config.readPreference,

    // Additional production optimizations
    ...(config.compressors && { compressors: config.compressors }),
    ...(config.maxStalenessSeconds && {
      maxStalenessSeconds: config.maxStalenessSeconds,
    }),
    ...(config.authSource && { authSource: config.authSource }),
  };
};

const setUpConenectionMonitoring = () => {
  const connection = mongoose.connection;

  connection.on("connected", () => {
    isConnected = true;
    connectionsAttempt = 0;
    console.log("MongoDB connection established successfully");
  });

  connection.on("error", (error) => {
    isConnected = false;
    console.error("MongoDB connection error:", {
      error: error.message,
      stack: error.stack,
      attempts: connectionsAttempt,
    });
  });

  connection.on("disconnected", () => {
    isConnected = false;
    console.warn("MongoDB connection disconnected");
    if (!process.env.SHUTDOWN_INITIATED) {
      handleReconnection();
    }
  });

  connection.on("reconnected", () => {
    isConnected = true;
    console.log("MongoDB connection re-established");
  });

  connection.on("fullsetup", () => {
    console.info("MongoDB connection to all servers established");
  });
  connection.on("timeout", () => {
    console.warn("MongoDB connection timeout");
  });
};

const handleReconnection = async () => {
  if (connectionsAttempt >= MAX_RETRY_ATTEMPTS) {
    console.error(
      `Max retry attempts reached (${MAX_RETRY_ATTEMPTS}). Exiting...`
    );
    process.exit(1);
  }

  connectionsAttempt++;
  const delay = RETRY_INTERVAL * Math.pow(2, connectionsAttempt - 1);
  console.warn(
    `Attempting to reconnect to MongoDB in ${delay}ms... (Attempt ${connectionsAttempt}/${MAX_RETRY_ATTEMPTS})`
  );

  setTimeout(async () => {
    try {
      await connectDB();
    } catch (error) {
      console.error("Failed to reconnect to MongoDB:", error.message);
    }
  }, delay);
};

const gracefulShutdown = async () => {
  // Database cleanup logic only
  // Global process handlers are managed by server.js
  return;
};

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return mongoose.connection;
  }

  try {
    const mongoUri = getMongoUri();
    const options = getConnectionOptions();

    console.log("Connecting to MongoDB with options:", options);
    const conn = await mongoose.connect(mongoUri, options);

    const { host, port, name } = conn.connection;
    console.info(`Connected to MongoDB at ${host}:${port}/${name}`);
    return conn;
  } catch (error) {
    connectionsAttempt++;
    console.error("MongoDB connection error:", {
      message: error.message,
      stack: error.stack,
      attempts: connectionsAttempt,
      maxAttempts: MAX_RETRY_ATTEMPTS,
    });

    if (connectionsAttempt >= MAX_RETRY_ATTEMPTS) {
      console.error("Maximum retry attempts reached. Exiting...");
      process.exit(1);
    }
    const delay = RETRY_INTERVAL * Math.pow(2, connectionsAttempt - 1);
    console.warn(
      `Retrying connection in ${delay}ms... (Attempt ${connectionsAttempt}/${MAX_RETRY_ATTEMPTS})`
    );

    await new Promise((resolve) => setTimeout(resolve, delay));
    return connectDB();
  }
};

const initializeDatabase = async () => {
  setUpConenectionMonitoring();
  return connectDB();
};

const healthCheck = async () => {
  return {
    isConnected: isConnected,
    readyState: mongoose.connection.readyState,
    connectionsAttempt: connectionsAttempt,
    maxRetryAttempts: MAX_RETRY_ATTEMPTS,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
    uri: getMongoUri(),
  };
};

const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      console.log("🔌 Disconnecting from MongoDB...");
      await mongoose.disconnect();
      isConnected = false;
      console.log("✅ Database disconnected successfully");
    }
  } catch (error) {
    console.error("❌ Error disconnecting from database:", error);
    throw error;
  }
};

export {
  initializeDatabase,
  healthCheck,
  connectDB,
  disconnectDB,
  isConnected,
  getMongoUri,
};
export default mongoose;
