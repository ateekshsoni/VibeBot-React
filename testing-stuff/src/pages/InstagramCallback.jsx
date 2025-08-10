import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import api from "@/lib/api";
import {
  generateInstagramOAuthUrl,
  getInstagramOAuthUrl,
} from "@/lib/instagram";

const InstagramCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("Processing Instagram connection...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error) {
          setStatus("error");
          setMessage(`Instagram authorization failed: ${error}`);
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("No authorization code received from Instagram");
          return;
        }

        // Send the code to your backend
        const token = await getToken();
        const response = await api.post(
          "/integrations/instagram/callback",
          {
            code: code,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setStatus("success");
          setMessage("Instagram account connected successfully!");

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(
            response.data.message || "Failed to connect Instagram account"
          );
        }
      } catch (err) {
        console.error("Instagram callback error:", err);
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Failed to process Instagram connection"
        );
      }
    };

    handleCallback();
  }, [searchParams, getToken, navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-12 w-12 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle2 className="h-12 w-12 text-green-500" />;
      case "error":
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return <Instagram className="h-12 w-12 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "border-blue-500";
      case "success":
        return "border-green-500";
      case "error":
        return "border-red-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 mb-4 shadow-2xl">
            <Instagram className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Instagram Connection
          </h1>
          <p className="text-gray-400">
            Finalizing your Instagram Business account connection
          </p>
        </div>

        {/* Status Card */}
        <Card
          className={`bg-gray-800/50 border-gray-700 backdrop-blur-xl shadow-2xl border-l-4 ${getStatusColor()}`}
        >
          <CardContent className="p-8 text-center space-y-6">
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
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        const oauthUrl = await getInstagramOAuthUrl();
                        window.location.href = oauthUrl;
                      } catch (error) {
                        // Fallback to hardcoded URL
                        window.location.href = generateInstagramOAuthUrl();
                      }
                    }}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Instagram className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              )}

              {status === "loading" && (
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstagramCallback;
