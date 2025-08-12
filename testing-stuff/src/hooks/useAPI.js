import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API_CONFIG, ENDPOINTS } from "../lib/config";

export const useAPI = () => {
  const { getToken, signOut } = useAuth();

  // Create axios instance for this hook using centralized config
  const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add request interceptor to include auth token
  apiClient.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to get auth token:", error);
      }
      
      // Add request timestamp for performance monitoring
      config.metadata = { startTime: new Date() };
      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  apiClient.interceptors.response.use(
    (response) => {
      // Log successful requests in development
      if (import.meta.env.NODE_ENV === "development") {
        const duration = new Date() - response.config.metadata.startTime;
        console.log(`✅ API Success [${response.config.method?.toUpperCase()}] ${response.config.url} (${duration}ms)`);
      }
      return response;
    },
    async (error) => {
      // Enhanced error handling
      if (error.config) {
        const duration = new Date() - error.config.metadata.startTime;
        console.error(`❌ API Error [${error.config.method?.toUpperCase()}] ${error.config.url} (${duration}ms):`, error.response?.data || error.message);
      }

      // Handle authentication errors - Backend team fixed these!
      if (error.response?.status === 401) {
        const errorMessage = error.response?.data?.error || error.response?.data?.message;
        
        // Check if it's a temporary auth issue vs real authentication failure
        if (errorMessage?.includes('Token validation') || errorMessage?.includes('Authentication not implemented')) {
          console.warn("🔧 Backend authentication temporarily unavailable:", errorMessage);
          // Don't sign out - just show user-friendly message
          toast.error("Authentication system temporarily unavailable. Please try again in a moment.");
        } else {
          console.warn("🔐 Authentication failed - signing out user");
          try {
            await signOut();
          } catch (signOutError) {
            console.error("Failed to sign out:", signOutError);
          }
        }
        return Promise.reject(error);
      }

      // Handle 404 errors with helpful messages
      if (error.response?.status === 404) {
        const availableEndpoints = error.response?.data?.available_endpoints;
        if (availableEndpoints) {
          console.error("🔍 Available endpoints:", availableEndpoints);
          toast.error("API endpoint not found. Check console for available endpoints.");
        } else {
          toast.error("Resource not found");
        }
        return Promise.reject(error);
      }

      // Show user-friendly error messages for other errors
      const message = error.response?.data?.message || error.response?.data?.error || error.message || "An unexpected error occurred";
      
      // Don't show toast for network errors on GET requests or circuit breaker errors
      const isNetworkError = error.code === "NETWORK_ERROR" || !error.response;
      const isCircuitBreakerError = message.includes('Circuit breaker');
      const isGetRequest = error.config?.method === 'get';
      
      if (!((isNetworkError && isGetRequest) || isCircuitBreakerError)) {
        toast.error(message);
      }

      return Promise.reject(error);
    }
  );

  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await apiClient({
        url: endpoint,
        ...options,
      });

      return response.data;
    } catch (error) {
      // Re-throw with additional context
      throw {
        ...error,
        endpoint,
        timestamp: new Date().toISOString(),
      };
    }
  };

  // HTTP method helpers
  const get = async (endpoint, params = {}) => {
    return apiCall(endpoint, {
      method: "GET",
      params,
    });
  };

  const post = async (endpoint, data = {}) => {
    return apiCall(endpoint, {
      method: "POST",
      data,
    });
  };

  const put = async (endpoint, data = {}) => {
    return apiCall(endpoint, {
      method: "PUT", 
      data,
    });
  };

  const patch = async (endpoint, data = {}) => {
    return apiCall(endpoint, {
      method: "PATCH",
      data,
    });
  };

  const del = async (endpoint) => {
    return apiCall(endpoint, {
      method: "DELETE",
    });
  };

  // Health check method
  const healthCheck = async () => {
    try {
      const response = await apiClient({
        url: "/health",
        method: "GET",
        baseURL: API_CONFIG.BASE_URL.replace('/api', ''), // Remove /api for health endpoint
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.error("Health check failed:", error);
      throw error;
    }
  };

  return { 
    apiCall, 
    get, 
    post, 
    put, 
    patch, 
    del, 
    healthCheck,
    // Expose the axios instance for advanced usage
    client: apiClient,
    // Compatibility method for existing code
    makeAuthenticatedRequest: async (endpoint, options = {}) => {
      return apiClient({
        url: endpoint,
        ...options,
      });
    }
  };
};
