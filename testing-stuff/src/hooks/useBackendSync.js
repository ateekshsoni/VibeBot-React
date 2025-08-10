import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useAPI } from "./useAPI";
import { toast } from "react-hot-toast";

export const useBackendSync = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user: clerkUser } = useUser();
  const { get, post } = useAPI();
  
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

      // First, try to get existing user profile
      let userProfile;
      try {
        const response = await get("/user/profile");
        userProfile = response.user;
        setBackendUser(userProfile);
        setIsBackendSynced(true);
        setBackendConnected(true);
        
        console.log("✅ User already exists in backend:", userProfile);
        return userProfile;
      } catch (error) {
        // If user doesn't exist (404), create new user
        if (error.message?.includes('404') || error.message?.includes('User not found')) {
          console.log("📝 Creating new user in backend...");
          
          const newUserData = {
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            firstName: clerkUser.firstName || "",
            lastName: clerkUser.lastName || "",
            profileImageUrl: clerkUser.imageUrl,
          };

          const createResponse = await post("/auth/sync-user", newUserData);
          userProfile = createResponse.user;
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
      setSyncError(error.message);
      setIsBackendSynced(false);
      
      // Check if it's a connection error
      if (error.message?.includes('fetch') || error.message?.includes('Network')) {
        setBackendConnected(false);
        toast.error("Backend connection failed. Some features may be limited.");
      } else {
        toast.error("Failed to sync with backend");
      }
    } finally {
      setSyncLoading(false);
    }
  };

  // Check backend health
  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL.replace('/api', '')}/health`);
      if (response.ok) {
        const healthData = await response.json();
        setBackendConnected(true);
        console.log("✅ Backend health check passed:", healthData);
        return healthData;
      } else {
        throw new Error(`Health check failed: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Backend health check failed:", error);
      setBackendConnected(false);
      return null;
    }
  };

  // Auto-sync when user is loaded
  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser && !isBackendSynced) {
      // First check backend health, then sync user
      checkBackendHealth().then(() => {
        syncUserWithBackend();
      });
    }
  }, [isLoaded, isSignedIn, clerkUser, isBackendSynced]);

  // Refresh user data from backend
  const refreshBackendUser = async () => {
    if (!isSignedIn) return;
    
    try {
      const response = await get("/user/profile");
      setBackendUser(response.user);
      return response.user;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      throw error;
    }
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
    checkBackendHealth,
  };
};
