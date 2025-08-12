import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useBackendSync } from "../hooks/useBackendSync";
import DashboardLayout from "./layout/DashboardLayout";

const DashboardWrapper = ({ children }) => {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const { isBackendSynced, syncLoading, backendConnected, syncError } = useBackendSync();
  const [allowContinue, setAllowContinue] = useState(false);

  // Wait for auth to load
  if (!authLoaded || !userLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your account...</p>
        </div>
      </div>
    );
  }

  // If not signed in, this will be handled by the route protection
  if (!isSignedIn || !user) {
    return null;
  }

  useEffect(() => {
    // Check if we just came from authentication
    const isPostAuth = window.location.search.includes('__clerk_') || 
                      sessionStorage.getItem('clerk-redirect-in-progress') ||
                      window.location.pathname === '/dashboard';

    if (isPostAuth) {
      console.log('🔄 Post-authentication detected, allowing immediate access');
      setAllowContinue(true);
      // Clear the redirect flag
      sessionStorage.removeItem('clerk-redirect-in-progress');
    } else {
      // For regular dashboard access, allow a brief sync check
      const timer = setTimeout(() => {
        console.log('🔄 Dashboard wrapper allowing access after timeout');
        setAllowContinue(true);
      }, 1000); // Reduced timeout for better UX

      return () => clearTimeout(timer);
    }
  }, [user, authLoaded, userLoaded]); // Fixed: use authLoaded and userLoaded instead of undefined isLoaded

  // Show sync loading for a limited time, then continue even if backend fails
  if (syncLoading && !allowContinue && backendConnected && !syncError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Setting up your account</h2>
          <p className="text-gray-400">Connecting to VibeBot services...</p>
          
          {/* Backend connection status */}
          <div className="mt-6 flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-400">
              {backendConnected ? "Backend connected" : "Backend connecting..."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Show error but allow app to continue
  if (syncError && !isBackendSynced && !backendConnected) {
    console.warn("⚠️ Backend sync failed, continuing with limited functionality");
  }

  // Render the dashboard with children
  return (
    <DashboardLayout>
      {/* Show warning if backend is not connected but continue */}
      {!backendConnected && (
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
            <div>
              <p className="text-yellow-400 text-sm font-medium">Limited connectivity</p>
              <p className="text-yellow-300 text-xs">Some features may be unavailable due to backend connection issues.</p>
            </div>
          </div>
        </div>
      )}
      {children}
    </DashboardLayout>
  );
};

export default DashboardWrapper;
