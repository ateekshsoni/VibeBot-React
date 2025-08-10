import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

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

  // If user is not signed in, redirect to sign-in page
  if (!isSignedIn) {
    console.log("🔒 User not authenticated, redirecting to sign-in");
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the protected content
  console.log("✅ User authenticated, rendering protected route");
  return children;
};

export default ProtectedRoute;
