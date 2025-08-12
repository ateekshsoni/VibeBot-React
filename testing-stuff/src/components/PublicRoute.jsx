import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already signed in, redirect to dashboard
  if (isSignedIn) {
    console.log("✅ User already authenticated, redirecting to dashboard");
    console.log("📍 Redirecting from public route to /dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  // If user is not signed in, render the public content (auth pages)
  console.log("👤 User not authenticated, rendering auth page");
  return children;
};

export default PublicRoute;
