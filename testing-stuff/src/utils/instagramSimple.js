/**
 * SIMPLE INSTAGRAM CONNECTION UTILITY
 * No complex hooks, no dependencies, just direct API calls
 */

/**
 * Get token from Clerk with multiple fallback methods
 */
export const getClerkToken = async (auth, user, session) => {
  console.log("🔍 Attempting to get Clerk token...");
  
  // Method 1: auth.getToken()
  if (auth && typeof auth.getToken === 'function') {
    try {
      console.log("🔄 Trying auth.getToken()...");
      const token = await auth.getToken();
      if (token) {
        console.log("✅ Token obtained via auth.getToken()");
        return { token, method: "auth.getToken()" };
      }
    } catch (error) {
      console.warn("❌ auth.getToken() failed:", error.message);
    }
  }

  // Method 2: user.getToken()
  if (user && typeof user.getToken === 'function') {
    try {
      console.log("🔄 Trying user.getToken()...");
      const token = await user.getToken();
      if (token) {
        console.log("✅ Token obtained via user.getToken()");
        return { token, method: "user.getToken()" };
      }
    } catch (error) {
      console.warn("❌ user.getToken() failed:", error.message);
    }
  }

  // Method 3: session.getToken()
  if (session && typeof session.getToken === 'function') {
    try {
      console.log("🔄 Trying session.getToken()...");
      const token = await session.getToken();
      if (token) {
        console.log("✅ Token obtained via session.getToken()");
        return { token, method: "session.getToken()" };
      }
    } catch (error) {
      console.warn("❌ session.getToken() failed:", error.message);
    }
  }

  console.error("❌ All token methods failed");
  return { token: null, method: null };
};

/**
 * Connect to Instagram using multiple approaches
 */
export const connectInstagramSimple = async (auth, user, session) => {
  try {
    console.log("🚀 Starting Instagram connection...");
    
    // Check authentication
    if (!auth?.isSignedIn) {
      throw new Error("User not authenticated");
    }

    // APPROACH 1: Try with token
    const { token, method } = await getClerkToken(auth, user, session);
    
    if (token) {
      console.log(`🔑 Using token from ${method}`);
      
      try {
        const response = await fetch(
          "https://vibeBot-v1.onrender.com/api/auth/instagram/initiate",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        
        if (data.success) {
          console.log("🚀 Instagram OAuth URL received, redirecting...");
          window.location.href = data.authUrl;
          return;
        } else {
          console.error("❌ Initiate endpoint error:", data.error);
        }
      } catch (error) {
        console.error("❌ Token-based approach failed:", error);
      }
    }

    // APPROACH 2: Session-based fallback
    console.log("🔄 Trying session-based authentication...");
    try {
      const response = await fetch(
        "https://vibeBot-v1.onrender.com/api/auth/instagram/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      
      if (data.success) {
        console.log("🚀 Session-based OAuth URL received, redirecting...");
        window.location.href = data.authUrl;
        return;
      } else {
        console.error("❌ Session-based approach failed:", data.error);
      }
    } catch (error) {
      console.error("❌ Session-based approach error:", error);
    }

    // APPROACH 3: Direct redirect fallback
    console.log("🔄 Using direct redirect as final fallback...");
    window.location.href = "https://vibeBot-v1.onrender.com/api/auth/instagram";

  } catch (error) {
    console.error("❌ Instagram connection failed:", error);
    throw error;
  }
};

/**
 * Check Instagram connection status
 */
export const checkInstagramStatusSimple = async (auth, user, session) => {
  try {
    const { token } = await getClerkToken(auth, user, session);
    
    if (!token) {
      return { connected: false, error: "No authentication token available" };
    }

    const response = await fetch(
      "https://vibeBot-v1.onrender.com/api/instagram/status",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        connected: data.connected || false,
        username: data.username || null,
        error: null,
      };
    } else {
      return {
        connected: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  } catch (error) {
    console.error("❌ Error checking Instagram status:", error);
    return { connected: false, error: error.message };
  }
};
