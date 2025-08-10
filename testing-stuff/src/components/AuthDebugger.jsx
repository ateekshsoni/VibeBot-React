import React from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const AuthDebugger = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const location = useLocation();

  // Only show in development
  if (import.meta.env.VITE_NODE_ENV !== "development") {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#000',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div><strong>Auth Debug:</strong></div>
      <div>Loaded: {isLoaded ? '✅' : '❌'}</div>
      <div>Signed In: {isSignedIn ? '✅' : '❌'}</div>
      <div>User: {user ? user.primaryEmailAddress?.emailAddress : 'None'}</div>
      <div>Path: {location.pathname}</div>
      <div>Search: {location.search}</div>
      <div>Time: {new Date().toLocaleTimeString()}</div>
    </div>
  );
};

export default AuthDebugger;
