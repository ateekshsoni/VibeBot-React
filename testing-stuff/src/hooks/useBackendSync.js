import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useAPI } from "./useAPI";
import { toast } from "react-hot-toast";

export const useBackendSync = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user: clerkUser } = useUser();
  const { get, post, healthCheck } = useAPI();
  
  const [backendUser, setBackendUser] = useState(null);
  const [isBackendSynced, setIsBackendSynced] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [backendConnected, setBackendConnected] = useState(true);

  // Sync user with backend
  const syncUserWithBackend = async () => {
    if (!isSignedIn || !clerkUser) return;

    try {
      setSyncLoading(true);
      setSyncError(null);
      console.log("🔄 Syncing user with backend...", clerkUser.emailAddresses[0]?.emailAddress);

      // First, try to get existing user profile
      let userProfile;
      try {
        const response = await get("/user/profile");
        userProfile = response.user || response.data?.user || response;
        setBackendUser(userProfile);
        setIsBackendSynced(true);
        setBackendConnected(true);
        
        console.log("✅ User already exists in backend:", userProfile);
        return userProfile;
      } catch (error) {
        // If user doesn't exist (404), create new user
        const isNotFound = error.response?.status === 404 || 
                          error.statusCode === 404 ||
                          error.message?.includes('404') || 
                          error.message?.includes('User not found') ||
                          error.message?.includes('not found');
        
        if (isNotFound) {
          console.log("📝 Creating new user in backend...");
          
          const newUserData = {
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            firstName: clerkUser.firstName || "",
            lastName: clerkUser.lastName || "",
            profileImageUrl: clerkUser.imageUrl,
            username: clerkUser.username || "",
            phoneNumber: clerkUser.phoneNumbers[0]?.phoneNumber || "",
            metadata: {
              createdAt: new Date().toISOString(),
              source: "frontend",
              version: "1.0.0"
            }
          };

          const createResponse = await post("/auth/sync", newUserData);
          userProfile = createResponse.user || createResponse.data?.user || createResponse;
          setBackendUser(userProfile);
          setIsBackendSynced(true);
          setBackendConnected(true);
          
          console.log("✅ New user created in backend:", userProfile);
          toast.success("Welcome! Your account has been set up.");
          return userProfile;
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("❌ Backend sync error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown sync error";
      setSyncError(errorMessage);
      setIsBackendSynced(false);
      
      // Check if it's a connection error
      if (error.isNetworkError || error.code === 'NETWORK_ERROR' || !error.response) {
        setBackendConnected(false);
        console.warn("🔌 Backend connection failed - app will work with limited functionality");
        // Don't show error toast for network issues in production
        if (import.meta.env.NODE_ENV === "development") {
          toast.error("Backend connection failed. Some features may be limited.");
        }
      } else if (error.response?.status !== 401) {
        // Don't show toast for auth errors as they're handled by the auth system
        toast.error("Failed to sync with backend: " + errorMessage);
      }
    } finally {
      setSyncLoading(false);
    }
  };

  // Check backend health using the useAPI health check method
  const checkBackendHealth = async () => {
    try {
      const healthData = await healthCheck();
      setBackendConnected(true);
      console.log("✅ Backend health check passed:", healthData);
      return healthData;
    } catch (error) {
      console.error("❌ Backend health check failed:", error);
      setBackendConnected(false);
      return null;
    }
  };

  // Auto-sync when user is loaded
  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser && !isBackendSynced && !syncLoading) {
      // Add a longer delay to prevent conflicts with Clerk's internal processes and redirects
      const timer = setTimeout(() => {
        // Double-check user is still signed in before attempting sync
        if (isSignedIn && clerkUser) {
          // First check backend health, then sync user
          checkBackendHealth().then((isHealthy) => {
            if (isHealthy !== null) {
              // Only attempt sync if backend is healthy
              syncUserWithBackend();
            } else {
              console.warn("⚠️ Backend unhealthy - skipping user sync");
              setBackendConnected(false);
              // Still mark as "synced" to allow app to function
              setIsBackendSynced(true);
            }
          });
        }
      }, 2000); // Increased delay to 2 seconds to avoid conflicts with auth flow

      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn, clerkUser, isBackendSynced, syncLoading]);

  // Refresh user data from backend
  const refreshBackendUser = async () => {
    if (!isSignedIn) return;
    
    try {
      setSyncLoading(true);
      const response = await get("/user/profile");
      const userData = response.user || response.data?.user || response;
      setBackendUser(userData);
      setIsBackendSynced(true);
      setBackendConnected(true);
      console.log("🔄 Refreshed user data from backend:", userData);
      return userData;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      if (error.isNetworkError) {
        setBackendConnected(false);
      }
      throw error;
    } finally {
      setSyncLoading(false);
    }
  };

  // Update user profile in backend
  const updateBackendUser = async (updates) => {
    if (!isSignedIn) throw new Error("User not signed in");
    
    try {
      setSyncLoading(true);
      const response = await post("/user/profile", updates);
      const updatedUser = response.user || response.data?.user || response;
      setBackendUser(updatedUser);
      console.log("✅ Updated user profile in backend:", updatedUser);
      toast.success("Profile updated successfully");
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user profile:", error);
      toast.error("Failed to update profile");
      throw error;
    } finally {
      setSyncLoading(false);
    }
  };

  // Force re-sync (useful for debugging or manual refresh)
  const forceSync = async () => {
    setIsBackendSynced(false);
    setSyncError(null);
    return syncUserWithBackend();
  };

  return {
    // User data
    backendUser,
    clerkUser,
    
    // Sync states
    isBackendSynced,
    syncLoading,
    syncError,
    backendConnected,
    
    // Actions
    syncUserWithBackend,
    refreshBackendUser,
    updateBackendUser,
    checkBackendHealth,
    forceSync,
  };
};
