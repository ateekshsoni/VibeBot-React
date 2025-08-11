import React, { useState } from "react";
import { useAuth, useUser, useSession } from "@clerk/clerk-react";
// import { useInstagram } from "../hooks/useInstagram";
import { toast } from "react-hot-toast";

/**
 * Instagram Business Connect Button Component
 * Uses direct Meta Console URL with state parameter as per backend team's instructions
 */
const InstagramConnectButton = ({
  onConnect = null,
  className = "",
  variant = "primary",
  children = null,
}) => {
  const auth = useAuth();
  const { user } = useUser();
  const { session } = useSession();
  // const { connectInstagram } = useInstagram();
  const [isLoading, setIsLoading] = useState(false);

  const handleInstagramConnect = async () => {
    try {
      setIsLoading(true);
      console.log("� Connecting to Instagram production endpoint...");

      // Enhanced logging for debugging
      console.log("🔍 Debug Info:", {
        isSignedIn: auth.isSignedIn,
        hasGetToken: typeof auth.getToken === "function",
        hasUser: !!user,
        hasSession: !!session,
        userMethods: user
          ? Object.getOwnPropertyNames(Object.getPrototypeOf(user))
          : [],
        sessionMethods: session
          ? Object.getOwnPropertyNames(Object.getPrototypeOf(session))
          : [],
        authMethods: Object.getOwnPropertyNames(Object.getPrototypeOf(auth)),
      });

      // Check if user is authenticated
      if (!auth.isSignedIn) {
        console.error("❌ User not signed in");
        toast.error("Please login first");
        return;
      }

      // APPROACH 1: Try to get token via multiple methods with extensive logging
      let token = null;
      let tokenMethod = null;

      // Method 1: useAuth getToken
      if (!token && typeof auth.getToken === "function") {
        try {
          console.log("🔄 Trying auth.getToken()...");
          token = await auth.getToken();
          tokenMethod = "auth.getToken()";
          console.log("✅ Method 1 success:", tokenMethod);
        } catch (error) {
          console.warn("❌ Method 1 failed (auth.getToken):", error.message);
        }
      }

      // Method 2: user getToken
      if (!token && user && typeof user.getToken === "function") {
        try {
          console.log("� Trying user.getToken()...");
          token = await user.getToken();
          tokenMethod = "user.getToken()";
          console.log("✅ Method 2 success:", tokenMethod);
        } catch (error) {
          console.warn("❌ Method 2 failed (user.getToken):", error.message);
        }
      }

      // Method 3: session getToken
      if (!token && session && typeof session.getToken === "function") {
        try {
          console.log("🔄 Trying session.getToken()...");
          token = await session.getToken();
          tokenMethod = "session.getToken()";
          console.log("✅ Method 3 success:", tokenMethod);
        } catch (error) {
          console.warn("❌ Method 3 failed (session.getToken):", error.message);
        }
      }

      // APPROACH 2: If token available, use it
      if (token) {
        console.log(`🔑 Token obtained via ${tokenMethod}: ✅ Available`);

        try {
          console.log("🔄 Calling /api/auth/instagram/initiate with token...");

          const response = await fetch(
            "https://vibeBot-v1.onrender.com/api/auth/instagram/initiate",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          console.log("📥 Response from initiate endpoint:", data);

          if (data.success) {
            console.log("🚀 Instagram OAuth URL received, redirecting...");
            toast.success("🔄 Redirecting to Instagram...");
            window.location.href = data.authUrl;
            return;
          } else {
            console.error("❌ Initiate endpoint returned error:", data.error);
            // Fall through to next approach
          }
        } catch (error) {
          console.error("❌ Error calling initiate endpoint:", error);
          // Fall through to next approach
        }
      }

      // APPROACH 3: Session-based authentication (no token)
      console.log("🔄 Trying session-based authentication...");
      try {
        const response = await fetch(
          "https://vibeBot-v1.onrender.com/api/auth/instagram/initiate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log("📥 Session-based response:", data);

        if (data.success) {
          console.log("🚀 Session-based OAuth URL received, redirecting...");
          toast.success("🔄 Redirecting to Instagram...");
          window.location.href = data.authUrl;
          return;
        } else {
          console.error("❌ Session-based approach failed:", data.error);
          // Fall through to final approach
        }
      } catch (error) {
        console.error("❌ Session-based approach error:", error);
        // Fall through to final approach
      }

      // APPROACH 4: Direct redirect (ultimate fallback)
      console.log("🔄 Using direct redirect as final fallback...");
      toast.success("🔄 Connecting via secure session...");

      // Use the original endpoint for direct redirect
      window.location.href =
        "https://vibeBot-v1.onrender.com/api/auth/instagram";
    } catch (error) {
      console.error("❌ Fatal error in Instagram connect:", error);
      toast.error("❌ Failed to connect Instagram. Please try again.");
    } finally {
      setIsLoading(false);
    }

    // Disable problematic useInstagram hook
    // try {
    //   setIsLoading(true);
    //   console.log("🔄 Connecting to Instagram using production OAuth flow...");
    //   console.log("📋 Following backend team's implementation guide");
    //   await connectInstagram();
    //   if (onConnect) {
    //     onConnect();
    //   }
    // } catch (error) {
    //   console.error("❌ Failed to initiate Instagram connection:", error);
    //   toast.error(`❌ Connection failed: ${error.message}`);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const getButtonStyles = () => {
    const baseStyles =
      "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    switch (variant) {
      case "primary":
        return `${baseStyles} bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl`;
      case "outline":
        return `${baseStyles} border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white`;
      case "ghost":
        return `${baseStyles} text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20`;
      default:
        return `${baseStyles} bg-blue-600 hover:bg-blue-700 text-white`;
    }
  };

  return (
    <button
      onClick={handleInstagramConnect}
      disabled={isLoading}
      className={`${getButtonStyles()} ${className}`}
      type="button"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Connecting...
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          {children || "📸 Connect Instagram Business"}
        </>
      )}
    </button>
  );
};

export default InstagramConnectButton;
