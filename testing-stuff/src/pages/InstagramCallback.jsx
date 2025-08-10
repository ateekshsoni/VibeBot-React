import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useAPI } from "../hooks/useAPI";
import { toast } from "react-hot-toast";
import {
  parseInstagramCallback,
  getInstagramErrorMessage,
  generateInstagramOAuthUrl,
  getInstagramOAuthUrl,
  validateOAuthState,
} from "../lib/instagram";

const InstagramCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { post } = useAPI();

  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("Processing Instagram connection...");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Parse callback parameters
        const callbackData = parseInstagramCallback(searchParams);
        
        console.log("Instagram callback data:", callbackData);

        if (callbackData.hasError) {
          const errorMessage = getInstagramErrorMessage(
            callbackData.error, 
            callbackData.errorDescription
          );
          setStatus("error");
          setMessage(errorMessage);
          setDetails({
            error: callbackData.error,
            description: callbackData.errorDescription
          });
          toast.error("Instagram connection failed");
          return;
        }

        if (!callbackData.hasCode) {
          setStatus("error");
          setMessage("No authorization code received from Instagram");
          toast.error("Invalid callback - no authorization code");
          return;
        }

        // Validate state parameter if present
        if (callbackData.state && user) {
          const isValidState = validateOAuthState(callbackData.state, user.id);
          if (!isValidState) {
            setStatus("error");
            setMessage("Invalid state parameter - possible security issue");
            toast.error("Security validation failed");
            return;
          }
        }

        setMessage("Exchanging authorization code...");

        // Send the code to backend for token exchange
        const response = await post("/auth/instagram/callback", {
          code: callbackData.code,
          state: callbackData.state,
          redirectUri: "https://vibeBot-v1.onrender.com/api/auth/instagram/callback",
          metadata: {
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            origin: window.location.origin
          }
        });

        if (response.success || response.data?.success) {
          const connectionData = response.data || response;
          setStatus("success");
          setMessage("Instagram account connected successfully!");
          setDetails({
            username: connectionData.username,
            accountType: connectionData.accountType,
            followers: connectionData.followers
          });
          
          toast.success(`Connected to @${connectionData.username || 'Instagram'}`);

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 3000);
        } else {
          setStatus("error");
          setMessage(response.message || "Failed to connect Instagram account");
          toast.error("Connection failed");
        }
      } catch (error) {
        console.error("Instagram callback error:", error);
        
        let errorMessage = "Failed to process Instagram connection";
        
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.isNetworkError) {
          errorMessage = "Network error - please check your connection";
        } else if (error.statusCode === 400) {
          errorMessage = "Invalid authorization code or request";
        } else if (error.statusCode === 401) {
          errorMessage = "Authentication required - please sign in again";
        }
        
        setStatus("error");
        setMessage(errorMessage);
        setDetails({
          error: error.response?.data?.error || error.message,
          statusCode: error.statusCode
        });
        
        toast.error("Instagram connection failed");
      }
    };

    handleCallback();
  }, [searchParams, user, post, navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        );
      case "success":
        return (
          <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white text-2xl">✓</span>
          </div>
        );
      case "error":
        return (
          <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-white text-2xl">✗</span>
          </div>
        );
      default:
        return (
          <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-white text-2xl">📱</span>
          </div>
        );
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "border-blue-600";
      case "success":
        return "border-green-600";
      case "error":
        return "border-red-600";
      default:
        return "border-gray-600";
    }
  };

  const tryAgain = async () => {
    try {
      setStatus("loading");
      setMessage("Getting new authorization URL...");
      
      const oauthUrl = await getInstagramOAuthUrl();
      window.location.href = oauthUrl;
    } catch (error) {
      console.error("Failed to get OAuth URL:", error);
      // Fallback to hardcoded URL
      const fallbackUrl = generateInstagramOAuthUrl({
        state: user ? `${user.id}_${Date.now()}_retry` : undefined
      });
      window.location.href = fallbackUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 mb-4 shadow-2xl">
            <span className="text-white text-2xl">📱</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Instagram Connection
          </h1>
          <p className="text-gray-400">
            Finalizing your Instagram Business account connection
          </p>
        </div>

        {/* Status Card */}
        <div className={`bg-gray-800 rounded-lg shadow-xl border-l-4 ${getStatusColor()}`}>
          <div className="p-8 text-center space-y-6">
            {/* Status Icon */}
            <div className="flex justify-center">{getStatusIcon()}</div>

            {/* Status Message */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                {status === "loading" && "Connecting..."}
                {status === "success" && "Success!"}
                {status === "error" && "Connection Failed"}
              </h2>
              <p className="text-gray-400 text-sm">{message}</p>
              
              {/* Additional details */}
              {details && status === "success" && (
                <div className="bg-green-900 rounded-lg p-4 mt-4">
                  <p className="text-green-300 text-sm">
                    <strong>Account:</strong> @{details.username}
                  </p>
                  {details.accountType && (
                    <p className="text-green-300 text-sm">
                      <strong>Type:</strong> {details.accountType}
                    </p>
                  )}
                  {details.followers && (
                    <p className="text-green-300 text-sm">
                      <strong>Followers:</strong> {details.followers.toLocaleString()}
                    </p>
                  )}
                </div>
              )}
              
              {details && status === "error" && (
                <div className="bg-red-900 rounded-lg p-4 mt-4">
                  <p className="text-red-300 text-sm">
                    <strong>Error:</strong> {details.error}
                  </p>
                  {details.description && (
                    <p className="text-red-300 text-sm">
                      <strong>Details:</strong> {details.description}
                    </p>
                  )}
                  {details.statusCode && (
                    <p className="text-red-300 text-sm">
                      <strong>Status Code:</strong> {details.statusCode}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {status === "success" && (
                <div className="text-sm text-green-400">
                  Redirecting to dashboard in a moment...
                </div>
              )}

              {status === "error" && (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/dashboard", { replace: true })}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    ← Back to Dashboard
                  </button>
                  <button
                    onClick={tryAgain}
                    className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    📱 Try Again
                  </button>
                </div>
              )}

              {status === "loading" && (
                <button
                  onClick={() => navigate("/dashboard", { replace: true })}
                  className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  ← Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Debug info in development */}
        {import.meta.env.NODE_ENV === "development" && (
          <div className="mt-6 bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Debug Info:</h3>
            <pre className="text-gray-400 text-xs overflow-auto">
              {JSON.stringify({
                searchParams: Object.fromEntries(searchParams),
                status,
                details,
                user: user ? { id: user.id, email: user.emailAddresses[0]?.emailAddress } : null
              }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramCallback;
