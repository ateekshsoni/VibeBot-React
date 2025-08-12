import { useState, useEffect, useCallback } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useAPI } from "./useAPI";
import { toast } from "react-hot-toast";
import { withCircuitBreaker, circuitBreakers } from "../utils/circuitBreaker";

export const useBackendSync = () => {
  const { user, isLoaded } = useUser();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle"); // 'idle', 'syncing', 'success', 'error'
  const [isBackendSynced, setIsBackendSynced] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const { makeAuthenticatedRequest } = useAPI();

  // Circuit breaker state
  const [syncCircuitBreakerActive, setSyncCircuitBreakerActive] =
    useState(false);
  const MAX_SYNC_RETRIES = 2;
  const SYNC_CIRCUIT_BREAKER_DURATION = 300000; // 5 minutes

  const syncUserWithBackend = useCallback(
    async (manualSync = false) => {
      if (!user || !isLoaded) {
        console.log("🔄 Backend sync skipped - user not ready");
        return;
      }

      if (syncCircuitBreakerActive) {
        console.log("🚨 Backend sync circuit breaker active - skipping sync");
        // Set synced to true to prevent UI blocking
        setIsBackendSynced(true);
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

        const result = await withCircuitBreaker("backendSync", async () => {
          const response = await makeAuthenticatedRequest("/backend/sync", {
            method: "POST",
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error(`Sync failed: ${response.status}`);
          }

          return await response.json();
        });

        console.log("✅ Backend sync successful:", result);
        setSyncStatus("success");
        setIsBackendSynced(true);
        setBackendConnected(true);
        setBackendUser(result.user || result);
        setSyncError(null);
      } catch (error) {
        console.error("❌ Backend sync error:", error);
        setSyncStatus("error");
        setSyncError(error.message);
        setBackendConnected(false);

        // Check if it's a circuit breaker error
        if (error.message.includes("Circuit breaker")) {
          setSyncCircuitBreakerActive(true);
          // Reset circuit breaker after timeout
          setTimeout(() => {
            setSyncCircuitBreakerActive(false);
          }, SYNC_CIRCUIT_BREAKER_DURATION);
        }

        // Don't block the app on sync failure - allow limited functionality
        setIsBackendSynced(true);
      } finally {
        setIsSyncing(false);
      }
    },
    [
      user,
      isLoaded,
      makeAuthenticatedRequest,
      isSyncing,
      syncCircuitBreakerActive,
    ]
  );

  // Auto-sync when user data is available
  useEffect(() => {
    if (user && isLoaded && !syncCircuitBreakerActive) {
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

        if (!stillInAuthFlow && !syncCircuitBreakerActive) {
          syncUserWithBackend();
        } else {
          console.log(
            "🔄 Backend sync skipped - still in auth flow after delay"
          );
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, isLoaded, syncUserWithBackend, syncCircuitBreakerActive]);

  return {
    syncUserWithBackend,
    isSyncing,
    syncStatus,
    isBackendSynced,
    backendConnected,
    syncError,
    backendUser,
    syncLoading: isSyncing,
    syncCircuitBreakerActive,
  };
};
