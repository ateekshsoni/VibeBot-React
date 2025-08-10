import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useBackendSync } from "../hooks/useBackendSync";
import { Loader2 } from "lucide-react";

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, isLoaded } = useAuth();
  const { isBackendSynced, syncLoading, backendConnected, syncError } = useBackendSync();

  useEffect(() => {
    if (isLoaded) {
      // Check if we have a Clerk handshake in the URL
      const urlParams = new URLSearchParams(location.search);
      const handshakeParam = urlParams.get("__clerk_handshake");

      if (handshakeParam) {
        // Clerk is processing authentication, wait for it to complete
        console.log("🔄 Processing Clerk authentication handshake...");
        return;
      }

      // If user is signed in and backend is synced, redirect to dashboard
      if (isSignedIn && isBackendSynced) {
        console.log("✅ User authenticated and synced, redirecting to dashboard");
        navigate("/dashboard", { replace: true });
      } else if (!isSignedIn) {
        // If not signed in and no handshake, redirect to login
        console.log("❌ User not authenticated, redirecting to sign-in");
        navigate("/sign-in", { replace: true });
      }
      // If signed in but not synced yet, keep showing loading
    }
  }, [isLoaded, isSignedIn, isBackendSynced, navigate, location.search]);

  // Show loading while Clerk processes authentication or backend sync
  const isProcessing = !isLoaded || syncLoading || (isSignedIn && !isBackendSynced);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            {!isLoaded ? "Authenticating..." : syncLoading ? "Syncing with backend..." : "Setting up your account..."}
          </h2>
          <p className="text-gray-400">
            {!isLoaded ? "Please wait while we sign you in" : 
             syncLoading ? "Connecting to VibeBot services..." :
             "Almost ready!"}
          </p>
          
          {/* Backend connection status */}
          {isSignedIn && (
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-400">
                {backendConnected ? "Backend connected" : "Backend connecting..."}
              </span>
            </div>
          )}
          
          {/* Show sync error if any */}
          {syncError && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">
                Sync error: {syncError}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default AuthHandler;
