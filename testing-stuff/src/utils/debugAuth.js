/**
 * Debug utility to test different authentication approaches
 */
import { makeAuthenticatedRequest } from '@/lib/apiClient';

export const debugAuthentication = async (auth, user, session) => {
  console.log("🔍 Starting authentication debug...");
  
  // Test 1: Try the /user/profile endpoint which seems to work
  try {
    console.log("🧪 Test 1: Testing /user/profile endpoint...");
    const profileResponse = await makeAuthenticatedRequest(auth, user, session, {
      method: 'GET',
      url: '/user/profile',
    });
    console.log("✅ /user/profile works:", profileResponse.data);
  } catch (error) {
    console.error("❌ /user/profile failed:", error.response?.data || error.message);
  }

  // Test 2: Try the problematic /user/instagram/status endpoint
  try {
    console.log("🧪 Test 2: Testing /user/instagram/status endpoint...");
    const statusResponse = await makeAuthenticatedRequest(auth, user, session, {
      method: 'GET',
      url: '/user/instagram/status',
    });
    console.log("✅ /user/instagram/status works:", statusResponse.data);
  } catch (error) {
    console.error("❌ /user/instagram/status failed:", error.response?.data || error.message);
  }

  // Test 3: Try the health endpoint without auth
  try {
    console.log("🧪 Test 3: Testing health endpoint (no auth)...");
    const response = await fetch('https://vibebot-v1.onrender.com/health');
    const healthData = await response.json();
    console.log("✅ Health check works:", healthData);
  } catch (error) {
    console.error("❌ Health check failed:", error);
  }

  // Test 4: Check what we get from different token methods
  console.log("🧪 Test 4: Checking token methods...");
  
  try {
    if (session?.getToken) {
      const token1 = await session.getToken();
      console.log("Token from session.getToken():", token1 ? "✅ Got token" : "❌ No token");
      
      const token2 = await session.getToken({ template: 'default' });
      console.log("Token from session.getToken({template: 'default'}):", token2 ? "✅ Got token" : "❌ No token");
      
      // Check if tokens are different
      if (token1 && token2) {
        console.log("Tokens are identical:", token1 === token2 ? "✅ Yes" : "❌ No");
      }
    }
  } catch (error) {
    console.error("❌ Token method test failed:", error);
  }

  console.log("🏁 Authentication debug complete");
};

export default debugAuthentication;
