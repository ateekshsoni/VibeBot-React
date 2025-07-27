import React, { useEffect } from "react";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();

  useEffect(() => {
    if (isLoaded && user) {
      const currentPath = location.pathname;
      
      // If user is on old routes without userId, redirect to user-specific route
      if (!currentPath.includes('/user/') && currentPath !== '/') {
        const newPath = `/user/${user.id}${currentPath}`;
        navigate(newPath, { replace: true });
      }
      
      // If user ID in URL doesn't match current user, redirect to correct user route
      if (userId && userId !== user.id) {
        const newPath = currentPath.replace(`/user/${userId}`, `/user/${user.id}`);
        navigate(newPath, { replace: true });
      }
    }
  }, [user, isLoaded, navigate, location.pathname, userId]);

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;
