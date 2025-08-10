import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthRedirectHandler = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only run after Clerk is fully loaded
    if (!isLoaded) {
      console.log("⏳ AuthRedirectHandler: Waiting for Clerk to load...");
      return;
    }

    const currentPath = location.pathname;
    const currentSearch = location.search;
    
    console.log("🔍 AuthRedirectHandler Check:", {
      isLoaded,
      isSignedIn,
      hasUser: !!user,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      currentPath,
      currentSearch,
      timestamp: new Date().toISOString()
    });

    // If user is authenticated and verified
    if (isSignedIn && user) {
      console.log("✅ User is authenticated and loaded");
      
      // Check if user is on landing page or auth pages
      const needsRedirect = ['/', '/sign-in', '/sign-up', '/signup'].includes(currentPath);
      
      if (needsRedirect) {
        console.log("🚀 FORCING redirect to dashboard...");
        
        // Use multiple redirect strategies for reliability
        setTimeout(() => {
          console.log("🔄 Executing navigate to dashboard");
          navigate("/dashboard", { replace: true });
        }, 100);
        
        // Backup redirect method
        setTimeout(() => {
          if (window.location.pathname !== '/dashboard') {
            console.log("🔄 Backup redirect - using window.location");
            window.location.href = '/dashboard';
          }
        }, 1000);
      }
    }

    // Handle unauthenticated users on protected routes
    if (isLoaded && !isSignedIn) {
      const protectedRoutes = ['/dashboard', '/automation', '/analytics', '/test', '/schema', '/project-docs', '/posts', '/webhooks', '/settings'];
      
      if (protectedRoutes.includes(currentPath)) {
        console.log("🔒 Redirecting unauthenticated user to sign-in");
        navigate("/sign-in", { replace: true });
      }
    }

  }, [isLoaded, isSignedIn, user, location.pathname, location.search, navigate]);

  return children;
};

export default AuthRedirectHandler;
