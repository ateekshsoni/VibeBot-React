import http from "http";
import app from "./app.js";
import { connectDB, disconnectDB } from "./src/database/connection.js";
import { enhancedConfig as config } from "./src/config/index.js";

const PORT = config.PORT || 5001;
const HOST = config.HOST || "0.0.0.0";

let server;

async function startServer() {
  try {
    console.log("🚀 Starting VibeBot Server...");

    // Connect to database first
    await connectDB();
    console.log("✅ Database connected successfully");

    // Start HTTP server
    server = http.createServer(app);

    // Configure server for production
    server.timeout = config.SERVER_TIMEOUT || 120000;
    server.keepAliveTimeout = config.KEEP_ALIVE_TIMEOUT || 65000;
    server.headersTimeout = config.HEADERS_TIMEOUT || 66000;
    server.maxConnections = config.MAX_CONNECTIONS || 1000;

    // Start listening
    server.listen(PORT, HOST, () => {
      console.log(`🌍 Server running at http://${HOST}:${PORT}`);
      console.log(`📊 Environment: ${config.NODE_ENV}`);
      console.log(`🔍 Health check: http://${HOST}:${PORT}/health`);
      console.log(
        `💾 Memory usage: ${Math.round(
          process.memoryUsage().heapUsed / 1024 / 1024
        )} MB`
      );
      console.log(`⏱️  Startup time: ${process.uptime().toFixed(2)} seconds`);
      console.log("✅ Server is ready to accept connections");
    });

    // Handle server errors
    server.on("error", handleServerError);
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}

function handleServerError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(`❌ ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`❌ ${bind} is already in use`);
      console.log(`💡 Try: lsof -ti:${PORT} | xargs kill -9`);
      process.exit(1);
      break;
    default:
      console.error(`❌ Server error:`, error);
      throw error;
  }
}

// Graceful shutdown
async function gracefulShutdown(signal) {
  console.log(`\n📨 Received ${signal}. Starting graceful shutdown...`);

  if (server) {
    // Stop accepting new connections
    server.close(async () => {
      console.log("🔄 HTTP server closed");

      try {
        // Close database connections
        await disconnectDB();
        console.log("📦 Database disconnected");

        console.log("✅ Graceful shutdown completed");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
        process.exit(1);
      }
    });

    // Force close server after timeout
    setTimeout(() => {
      console.error(
        "❌ Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, config.SHUTDOWN_TIMEOUT || 30000);
  } else {
    process.exit(0);
  }
}

// Handle process signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});

// Memory monitoring
if (config.isProduction) {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    const memUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);

    if (memUsageMB > (config.MEMORY_THRESHOLD || 500)) {
      console.warn(`⚠️  High memory usage: ${memUsageMB} MB`);
    }
  }, config.HEALTH_CHECK_INTERVAL || 60000);
}

// Start the server
startServer();
