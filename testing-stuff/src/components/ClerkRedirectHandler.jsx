import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

const ClerkRedirectHandler = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Wait for Clerk to fully load
    if (!isLoaded) return;

    const currentPath = location.pathname;
    console.log("🔄 ClerkRedirectHandler:", {
      isLoaded,
      isSignedIn,
      hasUser: !!user,
      currentPath,
    });

    // Handle authenticated users
    if (isSignedIn && user) {
      console.log(
        "✅ User authenticated:",
        user.primaryEmailAddress?.emailAddress
      );

      // Redirect authenticated users away from auth pages and landing page
      const shouldRedirect = ["/sign-in", "/sign-up", "/signup", "/"].includes(
        currentPath
      );

      if (shouldRedirect) {
        console.log("🔄 Redirecting authenticated user to dashboard");
        navigate("/dashboard", { replace: true });
      }
    }

    // Handle unauthenticated users on protected routes
    if (isLoaded && !isSignedIn) {
      const protectedRoutes = [
        "/dashboard",
        "/automation",
        "/analytics",
        "/test",
        "/schema",
        "/project-docs",
        "/posts",
        "/webhooks",
        "/settings",
      ];

      if (protectedRoutes.includes(currentPath)) {
        console.log("🔄 Redirecting unauthenticated user to sign-in");
        navigate("/sign-in", { replace: true });
      }
    }
  }, [isLoaded, isSignedIn, user, location.pathname, navigate]);

  return children;
};

export default ClerkRedirectHandler;
