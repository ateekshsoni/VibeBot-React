import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/api";

// Hook to automatically sync user with backend on login/signup
export const useUserSync = () => {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const syncUserWithBackend = async (userData) => {
    try {
      console.log(
        "🔄 Syncing user with backend...",
        userData.emailAddresses[0]?.emailAddress
      );

      const response = await api.post("/auth/sync", {
        email: userData.emailAddresses[0]?.emailAddress,
        firstName: userData.firstName,
        lastName: userData.lastName,
        imageUrl: userData.imageUrl,
        clerkUserId: userData.id,
        profileImageUrl: userData.imageUrl,
        username: userData.username || "",
        phoneNumber: userData.phoneNumbers[0]?.phoneNumber || "",
        metadata: {
          syncedAt: new Date().toISOString(),
          source: "auto-sync",
          version: "1.0.0"
        }
      });

      console.log("✅ User synced successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to sync user with backend:", error);

      // Enhanced error handling
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Network error:", error.message);
      }

      // Don't throw error to prevent app from breaking
      // Backend sync failure shouldn't block user from using the app
      return null;
    }
  };

  // Auto-sync when user signs in
  useEffect(() => {
    if (isSignedIn && user) {
      syncUserWithBackend(user);
    }
  }, [isSignedIn, user]);

  return { syncUserWithBackend };
};

// Manual sync function for testing
export const syncUser = async (user, getToken) => {
  try {
    const response = await api.post("/auth/sync", {
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      clerkUserId: user.id,
      profileImageUrl: user.imageUrl,
      username: user.username || "",
      phoneNumber: user.phoneNumbers[0]?.phoneNumber || "",
      metadata: {
        syncedAt: new Date().toISOString(),
        source: "manual-sync",
        version: "1.0.0"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to sync user:", error);
    throw error;
  }
};
