import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "@/lib/api";

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

      const token = await getToken();
      const response = await api.post("/auth/sync", {
        email: userData.emailAddresses[0]?.emailAddress,
        firstName: userData.firstName,
        lastName: userData.lastName,
        imageUrl: userData.imageUrl,
        clerkUserId: userData.id,
      });

      console.log("✅ User synced successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to sync user with backend:", error);

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
    const token = await getToken();
    const response = await api.post("/auth/sync", {
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      clerkUserId: user.id,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to sync user:", error);
    throw error;
  }
};
