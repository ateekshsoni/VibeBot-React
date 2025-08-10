import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://vibeBot-v1.onrender.com/api",
  timeout: 30000, // Increased timeout for production
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // Try to get Clerk token from window.Clerk if available
    if (typeof window !== "undefined" && window.Clerk?.session) {
      try {
        const token = await window.Clerk.session.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error getting Clerk token:", error);
      }
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    // Log successful requests in development
    if (import.meta.env.VITE_NODE_ENV === "development") {
      const duration = new Date() - response.config.metadata.startTime;
      console.log(
        `✅ API Success [${response.config.method?.toUpperCase()}] ${
          response.config.url
        } (${duration}ms)`
      );
    }
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.config) {
      const duration = new Date() - error.config.metadata.startTime;
      console.error(
        `❌ API Error [${error.config.method?.toUpperCase()}] ${
          error.config.url
        } (${duration}ms):`,
        error.response?.data || error.message
      );
    }

    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized access
          console.warn("Unauthorized access detected");
          
          // Only redirect if we're actually on a protected route and not during initial auth flow
          if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            
            // Don't redirect if:
            // 1. Already on auth pages
            // 2. On landing page
            // 3. During initial load (within first 5 seconds of page load)
            const isOnAuthPage = ['/sign-in', '/sign-up', '/signup', '/'].includes(currentPath);
            const isRecentPageLoad = (Date.now() - window.performance.timing.navigationStart) < 5000;
            
            if (!isOnAuthPage && !isRecentPageLoad) {
              console.warn("Redirecting to sign-in due to 401 on protected route:", currentPath);
              window.location.href = "/sign-in";
            } else {
              console.log("Skipping redirect - on auth page or recent page load");
            }
          }
          break;
        case 403:
          console.error("Forbidden - insufficient permissions");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 429:
          console.error("Rate limit exceeded");
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error(`HTTP ${status}:`, data?.message || "Unknown error");
      }

      // Enhance error object with more details
      error.isApiError = true;
      error.statusCode = status;
      error.apiMessage = data?.message || "Unknown error";
    } else if (error.request) {
      // Network error
      console.error("Network error - no response received:", error.message);
      error.isNetworkError = true;
    } else {
      // Request setup error
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Helper function to check if error is network-related
export const isNetworkError = (error) => {
  return (
    error.code === "NETWORK_ERROR" || error.isNetworkError || !error.response
  );
};

// Helper function to check if error is authentication-related
export const isAuthError = (error) => {
  return error.response?.status === 401 || error.statusCode === 401;
};

// Helper function to get user-friendly error message
export const getErrorMessage = (error) => {
  if (isNetworkError(error)) {
    return "Network connection error. Please check your internet connection.";
  }

  if (isAuthError(error)) {
    return "Authentication required. Please sign in again.";
  }

  return (
    error.apiMessage ||
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred"
  );
};

export default api;
