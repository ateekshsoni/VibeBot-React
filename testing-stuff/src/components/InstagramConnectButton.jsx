import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  getMetaBusinessLoginUrl,
  getInstagramOAuthUrl,
} from "../lib/instagram";
import { toast } from "react-hot-toast";

/**
 * Instagram Business Connect Button Component
 * Uses the exact Instagram Business Login URL from Meta Console
 */
const InstagramConnectButton = ({
  onConnect = null,
  className = "",
  variant = "primary",
  children = null,
}) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleInstagramConnect = async () => {
    try {
      setIsLoading(true);

      // Check if user is authenticated
      if (!user) {
        toast.error("Please login first");
        return;
      }

      // Get the authenticated user's token from Clerk
      const token = await user.getToken();

      if (!token) {
        toast.error("Unable to get authentication token. Please try again.");
        return;
      }

      console.log("📸 Connecting Instagram account...");
      console.log(
        "🔑 Clerk token obtained:",
        token ? "✅ Available" : "❌ Missing"
      );

      // Redirect to the PRODUCTION Instagram OAuth endpoint
      const productionEndpoint =
        "https://vibeBot-v1.onrender.com/api/auth/instagram";

      console.log(
        "🚀 Redirecting to PRODUCTION Instagram endpoint:",
        productionEndpoint
      );
      toast.success("🔄 Connecting to Instagram...");

      // Create URL with token parameter for backend authentication
      const authenticatedUrl = `${productionEndpoint}?token=${encodeURIComponent(
        token
      )}`;

      // Direct redirect to production endpoint with authentication
      window.location.href = authenticatedUrl;
    } catch (error) {
      console.error("❌ Error initiating Instagram OAuth:", error);
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
