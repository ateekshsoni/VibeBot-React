import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

export const useAPI = () => {
  const { getToken } = useAuth();
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://vibeBot-v1.onrender.com/api";

  const apiCall = async (endpoint, options = {}) => {
    try {
      const token = await getToken();

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);

      // Don't show toast for 401 errors (handled by auth system)
      if (!error.message?.includes("401")) {
        toast.error(error.message || "Something went wrong");
      }

      throw error;
    }
  };

  const get = (endpoint) => apiCall(endpoint);
  const post = (endpoint, data) =>
    apiCall(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  const put = (endpoint, data) =>
    apiCall(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  const del = (endpoint) => apiCall(endpoint, { method: "DELETE" });

  return { apiCall, get, post, put, del };
};
