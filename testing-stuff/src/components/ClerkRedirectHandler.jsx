import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

const ClerkRedirectHandler = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const currentPath = location.pathname;
      
      // If user is on auth pages after being signed in, redirect to dashboard
      if (currentPath === '/sign-in' || currentPath === '/sign-up' || currentPath === '/signup') {
        console.log("🔄 ClerkRedirectHandler: User authenticated on auth page, redirecting to dashboard");
        navigate("/dashboard", { replace: true });
      }
      
      // If user lands on root after OAuth (common with Google), redirect to dashboard
      if (currentPath === '/' && location.search.includes('_clerk')) {
        console.log("🔄 ClerkRedirectHandler: OAuth redirect detected, redirecting to dashboard");
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isLoaded, isSignedIn, user, navigate, location.pathname, location.search]);

  return children;
};

export default ClerkRedirectHandler;
