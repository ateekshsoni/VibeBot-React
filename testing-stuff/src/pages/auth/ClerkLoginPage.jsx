import React from "react";
import { SignIn, useUser } from "@clerk/clerk-react";

const ClerkLoginPage = () => {
  const { user } = useUser();

  // If user is already signed in, redirect to dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 text-center text-white max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
            Welcome back, {user.firstName}!
          </h2>
          <p className="mb-6 text-gray-300">You are already signed in.</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your VibeBot account</p>
          </div>

          <SignIn
            routing="path"
            path="/sign-in"
            fallbackRedirectUrl="/dashboard"
            forceRedirectUrl="/dashboard"
            signUpUrl="/signup"
            appearance={{
              elements: {
                rootBox: {
                  width: "100%",
                },
                card: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  border: "none",
                  padding: "0",
                },
                header: {
                  display: "none", // Hide the default Clerk header
                },
                headerTitle: {
                  display: "none", // Hide default title
                },
                headerSubtitle: {
                  display: "none", // Hide default subtitle
                },
                formButtonPrimary: {
                  backgroundColor: "#2563eb",
                  fontSize: "16px",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "600",
                  "&:hover": {
                    backgroundColor: "#1d4ed8",
                  },
                },
                formFieldInput: {
                  backgroundColor: "#374151",
                  border: "1px solid #4b5563",
                  color: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  "&:focus": {
                    borderColor: "#2563eb",
                    outline: "none",
                    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                  },
                },
                formFieldLabel: {
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                },
                footerActionText: {
                  color: "#9ca3af",
                },
                footerActionLink: {
                  color: "#2563eb",
                  "&:hover": {
                    color: "#1d4ed8",
                  },
                },
                socialButtonsBlockButton: {
                  backgroundColor: "#374151",
                  border: "1px solid #4b5563",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#4b5563",
                  },
                },
                dividerLine: {
                  backgroundColor: "#4b5563",
                },
                dividerText: {
                  color: "#9ca3af",
                },
                formFieldErrorText: {
                  color: "#ef4444",
                },
                alertText: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClerkLoginPage;
