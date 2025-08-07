//importing necessary modules
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { clerkMiddleware, requireAuth } from "@clerk/express";

//importing database connection
import { enhancedConfig as config } from "./src/config/index.js";

//importing routes
// import authRoutes from "./src/routes/auth.routes.js";
// import userRoutes from "./src/routes/user.routes.js";
// import instagramRoutes from "./src/routes/instagram.routes.js";
// import dashboardRoutes from "./src/routes/dashboard.routes.js";
// import integrationRoutes from "./src/routes/integration.routes.js";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initializing express app
const app = express();

//trust proxy settings for production environment
app.set("trust proxy", 1);

// Request ID middleware for tracking
app.use((req, res, next) => {
  req.id = Math.random().toString(36).substring(2, 15);
  res.setHeader("x-request-id", req.id);
  next();
});

//request logging in production
if (config.isProduction) {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

//security middlewares
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    contentSecurityPolicy: false, // Allow inline styles for legal documents in production
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

//general protection
const generalLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  max: config.RATE_LIMIT_MAX_REQUESTS || 100,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);
app.use(hpp());
app.use(compression());

//cors configuration
const allowedOrigins = config.CLIENT_URL
  ? config.CLIENT_URL.split(",")
  : ["http://localhost:5001", "http://localhost:5173", "https://vibebot.com"];

console.log("🌍 Allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else if (origin && origin.includes("instagram.com")) {
        // Allow Instagram webhooks
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-HTTP-Method-Override",
      "Accept",
      "Cache-Control",
      "clerk-session-id",
      "x-request-id",
    ],
    exposedHeaders: ["X-Total-Count", "clerk-session-id", "x-request-id"],
    maxAge: 86400, // 24 hours
  })
);

//request parsers middlewares
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({
          success: false,
          message: "Invalid JSON",
        });
        return;
      }
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Session configuration for production with MongoDB
const sessionConfig = {
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.isProduction,
    httpOnly: true,
    maxAge: config.COOKIE_MAX_AGE || 24 * 60 * 60 * 1000, // 24 hours
    sameSite: config.isProduction ? "none" : "lax",
  },
};

// Production-ready session configuration with MongoDB Atlas
if (config.MONGODB_URI && !config.DISABLE_MONGODB) {
  try {
    console.log("🔧 Configuring MongoDB session store...");
    sessionConfig.store = MongoStore.create({
      mongoUrl: config.MONGODB_URI,
      dbName: "vibebot_sessions",
      collectionName: "user_sessions",

      // Session lifecycle management
      touchAfter: 24 * 3600, // Update session once per day (performance)
      ttl: 7 * 24 * 60 * 60, // 7 days session expiry
      autoRemove: "native", // Let MongoDB handle expired sessions
      autoRemoveInterval: 30, // Check every 30 minutes

      // Connection options for production reliability
      mongoOptions: {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 30000,
        maxPoolSize: 5,
        retryWrites: true,
        authSource: "admin",
      },

      // Error handling
      stringify: false, // Better performance
      serialize: (session) => {
        return {
          ...session,
          lastAccess: new Date(),
        };
      },

      // Indexing for performance
      createIndexes: true,
    });

    console.log("💾 MongoDB session store configured successfully");
    console.log("📊 Session database: vibebot_sessions");
    console.log("📂 Session collection: user_sessions");
    console.log("⏰ Session TTL: 7 days");
  } catch (error) {
    console.error("❌ Failed to create MongoDB session store:", error.message);
    console.log("🧠 Falling back to memory session store");
    console.log("⚠️  Sessions will not persist across server restarts");
  }
} else {
  console.log(
    "🧠 Using memory session store (MongoDB disabled or not configured)"
  );
}

app.use(session(sessionConfig));

//routes
app.use("/api/auth", authRoutes);

// Legal document routes (required for Meta app approval)
app.get("/privacy-policy", (req, res) => {
  const privacyPath = path.join(__dirname, "..", "privacy-policy.html");
  if (fs.existsSync(privacyPath)) {
    res.sendFile(privacyPath);
  } else {
    res.status(404).send(`
      <html>
        <head><title>Privacy Policy</title></head>
        <body style="font-family: Arial, sans-serif; margin: 40px;">
          <h1>Privacy Policy</h1>
          <p>Privacy policy document not found. Please contact support.</p>
        </body>
      </html>
    `);
  }
});

app.get("/terms-of-service", (req, res) => {
  const termsPath = path.join(__dirname, "..", "terms-of-service.html");
  if (fs.existsSync(termsPath)) {
    res.sendFile(termsPath);
  } else {
    res.status(404).send(`
      <html>
        <head><title>Terms of Service</title></head>
        <body style="font-family: Arial, sans-serif; margin: 40px;">
          <h1>Terms of Service</h1>
          <p>Terms of service document not found. Please contact support.</p>
        </body>
      </html>
    `);
  }
});

app.get("/data-deletion", (req, res) => {
  const deletionPath = path.join(__dirname, "..", "data-deletion.html");
  if (fs.existsSync(deletionPath)) {
    res.sendFile(deletionPath);
  } else {
    res.status(404).send(`
      <html>
        <head><title>Data Deletion</title></head>
        <body style="font-family: Arial, sans-serif; margin: 40px;">
          <h1>Data Deletion</h1>
          <p>Data deletion instructions not found. Please contact support.</p>
        </body>
      </html>
    `);
  }
});

// Store for selected posts (in production, use database)
const selectedPostsForAutomation = new Set();

//root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to VibeBot Backend! 🌟\n");
});

//health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "VibeBot server is running smoothly",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
    },
    environment: config.NODE_ENV,
    version: config.APP_VERSION || "1.0.0",
    features: {
      comment_to_dm: "active",
      webhooks: "active",
      automation: "active",
      analytics: "active",
      auth: "active",
    },
    database: {
      mongodb: config.MONGODB_URI ? "configured" : "not configured",
      redis: config.REDIS_URL ? "configured" : "not configured",
    },
  });
});

//404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    requestedUrl: req.originalUrl,
    method: req.method,
    requestId: req.id,
    availableEndpoints: {
      auth: "/api/auth",
      health: "/health",
      instagram: "/api/instagram",
      legal: {
        privacy: "/privacy-policy",
        terms: "/terms-of-service",
        deletion: "/data-deletion",
      },
    },
    timestamp: new Date().toISOString(),
  });
});

//enhanced global error handler
app.use((error, req, res, next) => {
  console.error(`Error ${req.id}:`, error);

  // Don't leak sensitive information in production
  const isDevelopment = config.NODE_ENV === "development";

  let statusCode = error.statusCode || error.status || 500;
  let message = error.message || "Internal Server Error";

  // Handle specific error types
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value";
  } else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  } else if (error.name === "MongoError" || error.name === "MongoServerError") {
    statusCode = 503;
    message = "Database service unavailable";
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    requestId: req.id,
    timestamp: new Date().toISOString(),
    ...(isDevelopment && {
      stack: error.stack,
      details: error,
    }),
  });
});

//exporting the app
export default app;
