import { useState, useEffect, useCallback } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useAPI } from "./useAPI";
import { toast } from "react-hot-toast";

export const useBackendSync = () => {
  const { user, isLoaded } = useUser();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle"); // 'idle', 'syncing', 'success', 'error'
  const [isBackendSynced, setIsBackendSynced] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const { makeAuthenticatedRequest } = useAPI();

  const syncUserWithBackend = useCallback(
    async (manualSync = false) => {
      if (!user || !isLoaded) {
        console.log("🔄 Backend sync skipped - user not ready");
        return;
      }

      // Skip auto-sync if already syncing to prevent conflicts
      if (!manualSync && isSyncing) {
        console.log("🔄 Backend sync skipped - already syncing");
        return;
      }

      try {
        setIsSyncing(true);
        setSyncStatus("syncing");
        setSyncError(null);
        console.log("🔄 Starting backend sync for user:", user.id);

        const userData = {
          clerkUserId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: user.imageUrl,
          createdAt: user.createdAt
            ? new Date(user.createdAt).toISOString()
            : null,
          updatedAt: new Date().toISOString(),
        };

        const response = await makeAuthenticatedRequest("/user/sync", {
          method: "POST",
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Backend sync successful:", result);
          setSyncStatus("success");
          setIsBackendSynced(true);
          setBackendConnected(true);
          setBackendUser(result.user || result);
        } else {
          throw new Error(`Sync failed: ${response.status}`);
        }
      } catch (error) {
        console.error("❌ Backend sync error:", error);
        setSyncStatus("error");
        setSyncError(error.message);
        setBackendConnected(false);
        // Don't block the app on sync failure
        setIsBackendSynced(true); // Allow app to continue with limited functionality
      } finally {
        setIsSyncing(false);
      }
    },
    [user, isLoaded, makeAuthenticatedRequest] // Removed isSyncing to prevent infinite loops
  );

  // Auto-sync when user data is available
  // Disable auto-sync temporarily to prevent interference with Clerk redirects
  useEffect(() => {
    if (user && isLoaded) {
      // Check if we're in the middle of an authentication flow
      const isAuthenticationFlow =
        window.location.pathname.includes("/sign-") ||
        window.location.search.includes("__clerk_") ||
        sessionStorage.getItem("clerk-redirect-in-progress");

      if (isAuthenticationFlow) {
        console.log(
          "🔄 Backend sync skipped - authentication flow in progress"
        );
        return;
      }

      // Add a delay and only sync if we're not in auth flow
      const timer = setTimeout(() => {
        // Double-check we're not in auth flow after the delay
        const stillInAuthFlow =
          window.location.pathname.includes("/sign-") ||
          window.location.search.includes("__clerk_");

        if (!stillInAuthFlow) {
          syncUserWithBackend();
        } else {
          console.log(
            "🔄 Backend sync skipped - still in auth flow after delay"
          );
        }
      }, 2000); // Increased back to 2 seconds to give Clerk time to complete redirect

      return () => clearTimeout(timer);
    }
  }, [user, isLoaded, syncUserWithBackend]);

  return {
    syncUserWithBackend,
    isSyncing,
    syncStatus,
    isBackendSynced,
    backendConnected,
    syncError,
    backendUser,
    syncLoading: isSyncing,
  };
};
