import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, isLoaded } = useAuth();

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

      // If user is signed in, redirect to dashboard
      if (isSignedIn) {
        console.log("✅ User authenticated, redirecting to dashboard");
        navigate("/dashboard", { replace: true });
      } else {
        // If not signed in and no handshake, redirect to login
        console.log("❌ User not authenticated, redirecting to sign-in");
        navigate("/sign-in", { replace: true });
      }
    }
  }, [isLoaded, isSignedIn, navigate, location.search]);

  // Show loading while Clerk processes authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Authenticating...
        </h2>
        <p className="text-gray-400">Please wait while we sign you in</p>
      </div>
    </div>
  );
};

export default AuthHandler;
