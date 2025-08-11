/**
 * Axios-based API client with proper authentication handling
 */
import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://vibebot-v1.onrender.com/api',
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get authentication token from Clerk with enhanced error handling
 */
export async function getClerkAuthToken(auth, user, session) {
  console.log("🔍 Getting Clerk token...");
  console.log("Auth state:", {
    isSignedIn: auth?.isSignedIn,
    userId: auth?.userId,
  });
  console.log("Session state:", {
    sessionId: session?.id,
    status: session?.status,
  });

  try {
    // Method 1: getToken from session (primary method)
    if (session?.getToken) {
      console.log("🔄 Trying session.getToken()...");
      const token = await session.getToken();
      if (token) {
        console.log("✅ Token obtained from session.getToken()");
        return token;
      }
    }

    // Method 2: getToken with template from session
    if (session?.getToken) {
      console.log("🔄 Trying session.getToken({ template: 'default' })...");
      const token = await session.getToken({ template: "default" });
      if (token) {
        console.log("✅ Token obtained from session.getToken with template");
        return token;
      }
    }

    // Method 3: Try different token approaches
    if (session?.getToken) {
      console.log("🔄 Trying session.getToken({ template: 'convex' })...");
      const token = await session.getToken({ template: "convex" });
      if (token) {
        console.log("✅ Token obtained from session.getToken with convex template");
        return token;
      }
    }

    console.warn("⚠️ No token available from any method");
    throw new Error("Unable to obtain authentication token");
  } catch (error) {
    console.error("❌ Error getting token:", error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

/**
 * Request interceptor to add authentication token
 */
apiClient.interceptors.request.use(
  async (config) => {
    // If auth context is passed in config, use it to get token
    if (config.authContext) {
      const { auth, user, session } = config.authContext;
      try {
        const token = await getClerkAuthToken(auth, user, session);
        config.headers.Authorization = `Bearer ${token}`;
        console.log("🔑 Added auth token to request");
      } catch (error) {
        console.error("❌ Failed to add auth token:", error);
        throw error;
      }
      // Remove authContext from config to avoid sending it to server
      delete config.authContext;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle common errors
 */
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success [${response.config.method?.toUpperCase()}] ${response.config.url} (${response.config.metadata?.duration || 'unknown'}ms)`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`❌ API Error [${error.response.status}] ${error.config?.url}:`, error.response.data);
      
      // Handle specific error cases
      if (error.response.status === 401) {
        console.error("🔒 Authentication failed - token may be invalid or expired");
      } else if (error.response.status === 403) {
        console.error("🚫 Access forbidden - insufficient permissions");
      } else if (error.response.status >= 500) {
        console.error("🔥 Server error - backend issue");
      }
    } else if (error.request) {
      console.error("📡 Network error - no response received:", error.message);
    } else {
      console.error("⚠️ Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Helper function to make authenticated API calls
 */
export async function makeAuthenticatedRequest(auth, user, session, config) {
  return apiClient({
    ...config,
    authContext: { auth, user, session }
  });
}

export default apiClient;
