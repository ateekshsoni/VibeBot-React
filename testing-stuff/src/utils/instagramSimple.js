/**
 * Simplified Instagram integration utilities
 * Using direct Meta OAuth URL approach as specified by backend team
 */

/**
 * Get authentication token from Clerk
 * Supports multiple approaches to handle different auth scenarios
 */
export async function getClerkToken(auth, user, session) {
  console.log("🔍 Getting Clerk token...");
  console.log("Auth state:", { isSignedIn: auth?.isSignedIn, userId: auth?.userId });
  console.log("Session state:", { sessionId: session?.id, status: session?.status });

  try {
    // Method 1: getToken from session (primary method)
    if (session?.getToken) {
      console.log("🔄 Trying session.getToken()...");
      const token = await session.getToken();
      if (token) {
        console.log("✅ Token obtained from session.getToken()");
        return { token, method: "session.getToken" };
      }
    }

    // Method 2: getToken with template from session 
    if (session?.getToken) {
      console.log("🔄 Trying session.getToken({ template: 'default' })...");
      const token = await session.getToken({ template: "default" });
      if (token) {
        console.log("✅ Token obtained from session.getToken with template");
        return { token, method: "session.getToken.template" };
      }
    }

    // Method 3: Direct user token
    if (user?.__internal?.token) {
      console.log("🔄 Trying user.__internal.token...");
      console.log("✅ Token obtained from user.__internal.token");
      return { token: user.__internal.token, method: "user.__internal.token" };
    }

    // Method 4: Try auth.getToken if available
    if (auth?.getToken) {
      console.log("🔄 Trying auth.getToken()...");
      const token = await auth.getToken();
      if (token) {
        console.log("✅ Token obtained from auth.getToken()");
        return { token, method: "auth.getToken" };
      }
    }

    console.warn("⚠️ No token available from any method");
    return { token: null, method: "none" };
  } catch (error) {
    console.error("❌ Error getting token:", error);
    return { token: null, method: "error", error };
  }
}

/**
 * Connect Instagram using direct Meta OAuth URL
 * This replaces the non-existent /api/auth/instagram/initiate endpoint
 */
export const connectInstagramSimple = async (auth, user, session) => {
  try {
    console.log("🚀 Starting Instagram connection with direct Meta URL...");

    // Check authentication
    if (!auth?.isSignedIn) {
      throw new Error("User not authenticated");
    }

    // Step 1: Get user database ID from backend
    const { token } = await getClerkToken(auth, user, session);
    
    if (!token) {
      throw new Error("Unable to obtain authentication token");
    }

    console.log("📤 Fetching user profile to get database ID...");
    
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const userResponse = await fetch(
        "https://vibeBot-v1.onrender.com/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      console.log("📥 User profile response status:", userResponse.status);

      if (!userResponse.ok) {
        throw new Error(`Failed to fetch user profile: ${userResponse.status} ${userResponse.statusText}`);
      }

      const userData = await userResponse.json();
      console.log("👤 User data received:", userData);

      // Step 2: Create state parameter with user ID
      const userId = userData.user?.id || userData.user?._id || userData.data?.id || userData.data?._id || userData.id || userData._id;
      
      if (!userId) {
        console.error("❌ No user ID found in response:", userData);
        throw new Error("User ID not found in profile response");
      }

      // Create state parameter - trying simpler format that backend can parse
      const state = `user_${userId}_${Date.now()}`;
      console.log("🔐 Generated state parameter:", state);
      console.log("🔍 User ID being used:", userId);
      console.log("🔍 User ID type:", typeof userId);
      console.log("🔍 User ID length:", userId.length);

      // Step 3: Direct redirect to Instagram OAuth URL (provided by backend team)
      const instagramUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=1807810336807413&redirect_uri=https%3A%2F%2FvibeBot-v1.onrender.com%2Fapi%2Fauth%2Finstagram%2Fcallback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights&state=${state}`;

      console.log("🔗 Redirecting to Instagram OAuth URL:", instagramUrl);
      
      // Store state for verification if needed
      sessionStorage.setItem('instagram_oauth_state', state);
      
      // Redirect to Instagram OAuth
      window.location.href = instagramUrl;
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("❌ Request timed out");
        throw new Error("Request timeout - please try again");
      }
      console.error("❌ Error during OAuth initiation:", error);
      throw error;
    }

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

    if (!response.ok) {
      console.error("Status check failed:", response.status, response.statusText);
      return { connected: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    console.log("Instagram status:", data);

    return {
      connected: data.connected || false,
      data: data,
    };
  } catch (error) {
    console.error("Error checking Instagram status:", error);
    return { connected: false, error: error.message };
  }
};

/**
 * Disconnect Instagram account
 */
export const disconnectInstagramSimple = async (auth, user, session) => {
  try {
    const { token } = await getClerkToken(auth, user, session);

    if (!token) {
      throw new Error("No authentication token available");
    }

    const response = await fetch(
      "https://vibeBot-v1.onrender.com/api/instagram/disconnect",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Instagram disconnected:", data);

    return { success: true, data };
  } catch (error) {
    console.error("Error disconnecting Instagram:", error);
    throw error;
  }
};
