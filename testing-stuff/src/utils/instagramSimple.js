/**
 * Simplified Instagram integration utilities
 * Using axios for better API handling and direct Meta OAuth URL approach
 */
import { makeAuthenticatedRequest } from '@/lib/apiClient';

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

    console.log("📤 Fetching user profile to get database ID...");

    try {
      // Use axios with proper authentication
      const userResponse = await makeAuthenticatedRequest(auth, user, session, {
        method: 'GET',
        url: '/user/profile',
        timeout: 10000
      });

      console.log("📥 User profile response status:", userResponse.status);
      console.log("👤 User data received:", userResponse.data);

      // Step 2: Create state parameter with user ID
      const userData = userResponse.data;
      const userId =
        userData.user?.id ||
        userData.user?._id ||
        userData.data?.id ||
        userData.data?._id ||
        userData.id ||
        userData._id;

      if (!userId) {
        console.error("❌ No user ID found in response:", userData);
        console.error("❌ Available properties:", Object.keys(userData));
        if (userData.user)
          console.error("❌ User object keys:", Object.keys(userData.user));
        if (userData.data)
          console.error("❌ Data object keys:", Object.keys(userData.data));
        throw new Error(
          "User ID not found in profile response. Please try refreshing and connecting again."
        );
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
      try {
        sessionStorage.setItem("instagram_oauth_state", state);
        // Clean up any old states
        sessionStorage.removeItem("instagram_oauth_error");
        sessionStorage.removeItem("instagram_oauth_code");
      } catch (storageError) {
        console.warn("⚠️ Could not access sessionStorage:", storageError);
      }

      // Redirect to Instagram OAuth
      window.location.href = instagramUrl;
    } catch (error) {
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
    console.log("🔍 Checking Instagram status...");

    const response = await makeAuthenticatedRequest(auth, user, session, {
      method: 'GET',
      url: '/user/instagram/status',
      timeout: 10000
    });

    console.log("Instagram status response:", response.data);

    return {
      connected: response.data.connected || false,
      data: response.data,
    };
  } catch (error) {
    console.error("Error checking Instagram status:", error);
    
    // Provide more specific error messages
    if (error.response?.status === 401) {
      console.error("❌ Authentication failed - please sign out and sign back in");
      return { connected: false, error: "Authentication failed" };
    } else if (error.response?.status === 404) {
      console.error("❌ Endpoint not found - backend may not have this endpoint");
      return { connected: false, error: "Service unavailable" };
    } else if (error.code === 'ECONNABORTED') {
      console.error("❌ Request timeout");
      return { connected: false, error: "Request timeout" };
    }
    
    return { connected: false, error: error.message };
  }
};

/**
 * Disconnect Instagram account
 */
export const disconnectInstagramSimple = async (auth, user, session) => {
  try {
    console.log("🔌 Disconnecting Instagram account...");

    const response = await makeAuthenticatedRequest(auth, user, session, {
      method: 'POST',
      url: '/user/instagram/disconnect',
      timeout: 10000
    });

    console.log("Instagram disconnected:", response.data);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error disconnecting Instagram:", error);
    throw error;
  }
};
