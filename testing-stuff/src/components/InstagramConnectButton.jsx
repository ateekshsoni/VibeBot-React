import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

/**
 * Instagram Business Connect Button Component
 * Uses the new backend /api/auth/instagram/initiate endpoint
 * for proper OAuth URL generation with user context
 */
const InstagramConnectButton = ({
  onConnect = null,
  className = "",
  variant = "primary",
  children = null,
}) => {
  const { getToken, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleInstagramConnect = async () => {
    try {
      setIsLoading(true);
      console.log("🚀 Connecting to Instagram production endpoint...");

      // Check if user is authenticated
      if (!isSignedIn) {
        toast.error("Please login first");
        return;
      }

      // Get the authenticated user's token from Clerk with fallback
      let token;
      try {
        token = await getToken();
      } catch (error) {
        console.warn("getToken failed, trying fallback approach:", error);
        
        // Fallback: Try without token - let backend handle session-based auth
        try {
          console.log("🔄 Using session-based authentication fallback");
          
          // Call the initiate endpoint without Authorization header
          // Backend should use session cookies for authentication
          const response = await fetch(
            "https://vibeBot-v1.onrender.com/api/auth/instagram/initiate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Include cookies for session-based auth
            }
          );

          const data = await response.json();

          if (data.success) {
            console.log("🚀 Instagram OAuth URL received (session-based), redirecting...");
            toast.success("🔄 Redirecting to Instagram...");
            window.location.href = data.authUrl;
            return;
          } else {
            console.error("❌ Session-based auth also failed:", data.error);
            toast.error(`❌ Authentication failed: ${data.error}`);
            return;
          }
        } catch (sessionError) {
          console.error("❌ Session-based fallback failed:", sessionError);
          toast.error("❌ Authentication error. Please try again.");
          return;
        }
      }

      if (!token) {
        console.warn("No token available, using direct session-based redirect");
        
        // Final fallback: Direct redirect to session-based endpoint
        toast.success("🔄 Connecting via secure session...");
        
        // Use the original endpoint but with session-based authentication
        window.location.href = "https://vibeBot-v1.onrender.com/api/auth/instagram";
        return;
      }

      console.log("🔑 Clerk token obtained: ✅ Available");

      // Call the new initiate endpoint to get OAuth URL
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

      if (data.success) {
        console.log("🚀 Instagram OAuth URL received, redirecting...");
        toast.success("🔄 Redirecting to Instagram...");

        // Now redirect to the OAuth URL
        window.location.href = data.authUrl;
      } else {
        console.error("❌ Failed to get Instagram OAuth URL:", data.error);
        toast.error(`❌ Failed to connect Instagram: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error connecting Instagram:", error);
      toast.error("❌ Failed to connect Instagram. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
