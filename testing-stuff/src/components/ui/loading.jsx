import React from "react";
import { Loader2, Instagram } from "lucide-react";

const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-pink-500`} />
      {text && <span className="text-gray-400">{text}</span>}
    </div>
  );
};

const FullPageLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 mb-4 shadow-2xl animate-pulse">
          <Instagram className="h-8 w-8 text-white" />
        </div>
        <div className="space-y-2">
          <LoadingSpinner size="lg" text="" />
          <p className="text-gray-400">Loading VibeBot...</p>
        </div>
      </div>
    </div>
  );
};

export { LoadingSpinner, FullPageLoader };
