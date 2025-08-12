import api from './api';
import { API_CONFIG, INSTAGRAM_CONFIG } from './config';

// Instagram OAuth configuration and utilities - now using centralized config
export const LEGACY_INSTAGRAM_CONFIG = {
  CLIENT_ID: INSTAGRAM_CONFIG.CLIENT_ID,
  REDIRECT_URI: INSTAGRAM_CONFIG.REDIRECT_URI,
  SCOPES: INSTAGRAM_CONFIG.SCOPES,
  OAUTH_BASE_URL: "https://www.instagram.com/oauth/authorize",
};

/**
 * Get Instagram OAuth URL from backend (Recommended)
 * Backend should return the OAuth URL configured for your app
 * @param {string} userId - Optional user ID for state parameter
 * @returns {Promise<string>} Instagram OAuth URL from backend
 */
export const getInstagramOAuthUrl = async (userId = null) => {
  try {
    const response = await api.get("/auth/instagram", {
      params: userId ? { userId } : {}
    });
    
    if (response.data?.success && response.data?.authUrl) {
      console.log("✅ Got Instagram OAuth URL from backend:", response.data.authUrl);
      return response.data.authUrl;
    } else {
      throw new Error("Backend did not return OAuth URL");
    }
  } catch (error) {
    console.error("❌ Failed to get Instagram OAuth URL from backend:", error);
    console.log("🔄 Falling back to client-side OAuth URL generation...");
    
    // Fallback to hardcoded URL with proper state if backend fails
    const state = userId ? generateOAuthState(userId) : null;
    return generateInstagramOAuthUrl({ state });
  }
};

/**
 * Get the exact Instagram Business Login URL as provided by Meta Console
 * This creates the URL in the exact format recommended by Meta
 * @param {string} userId - Optional user ID for state parameter
 * @returns {string} Instagram Business Login URL
 */
export const getMetaBusinessLoginUrl = (userId = null) => {
  const state = userId ? generateOAuthState(userId) : null;
  
  // This matches exactly the URL format from your Meta Console
  const baseUrl = "https://www.instagram.com/oauth/authorize";
  const params = new URLSearchParams({
    force_reauth: "true",
    client_id: INSTAGRAM_CONFIG.CLIENT_ID,
    redirect_uri: INSTAGRAM_CONFIG.REDIRECT_URI,
    response_type: "code",
    scope: INSTAGRAM_CONFIG.SCOPES,
    ...(state && { state }),
  });

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Generate Instagram OAuth authorization URL
 * Uses the exact URL format provided by Meta Console for Instagram Business Login
 * @param {Object} options - OAuth options
 * @param {string} options.clientId - Instagram App Client ID
 * @param {string} options.redirectUri - Callback URL
 * @param {string} options.scopes - Comma-separated scopes
 * @param {boolean} options.forceReauth - Force re-authentication
 * @param {string} options.state - State parameter for OAuth security
 * @returns {string} Instagram OAuth URL
 */
export const generateInstagramOAuthUrl = (options = {}) => {
  const {
    clientId = INSTAGRAM_CONFIG.CLIENT_ID,
    redirectUri = INSTAGRAM_CONFIG.REDIRECT_URI,
    scopes = INSTAGRAM_CONFIG.SCOPES,
    forceReauth = true,
    state = null,
  } = options;

  // Build the exact URL as provided by Meta Console
  const params = new URLSearchParams({
    force_reauth: forceReauth ? "true" : "false",
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes,
    ...(state && { state }),
  });

  return `https://www.instagram.com/oauth/authorize?${params.toString()}`;
};

/**
 * Generate secure state parameter for OAuth
 * @param {string} userId - User ID to include in state
 * @returns {string} Secure state parameter
 */
export const generateOAuthState = (userId) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${userId}_${timestamp}_${random}`;
};

/**
 * Validate OAuth state parameter
 * @param {string} state - State parameter to validate
 * @param {string} expectedUserId - Expected user ID
 * @returns {boolean} Whether state is valid
 */
export const validateOAuthState = (state, expectedUserId) => {
  if (!state || !expectedUserId) return false;
  
  const parts = state.split('_');
  if (parts.length !== 3) return false;
  
  const [userId, timestamp] = parts;
  const stateAge = Date.now() - parseInt(timestamp, 10);
  
  // State should be from the expected user and not older than 10 minutes
  return userId === expectedUserId && stateAge < 600000;
};

/**
 * Parse Instagram OAuth callback parameters
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {Object} Parsed callback data
 */
export const parseInstagramCallback = (searchParams) => {
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const state = searchParams.get("state");

  return {
    code,
    error,
    errorDescription,
    state,
    hasError: !!error,
    hasCode: !!code,
    isValid: !!(code && state),
  };
};

/**
 * Check if Instagram Business account is required
 * @param {string} error - Error type from Instagram
 * @returns {boolean} Whether error is due to missing business account
 */
export const isBusinessAccountRequired = (error) => {
  const businessRequiredErrors = [
    "access_denied",
    "invalid_scope", 
    "insufficient_scope",
    "business_account_required"
  ];
  return businessRequiredErrors.includes(error);
};

/**
 * Get user-friendly error message for Instagram OAuth errors
 * @param {string} error - Error code from Instagram
 * @param {string} errorDescription - Error description from Instagram
 * @returns {string} User-friendly error message
 */
export const getInstagramErrorMessage = (error, errorDescription) => {
  switch (error) {
    case "access_denied":
      return "Instagram access was denied. Please ensure you have a Business account and try again.";
    case "invalid_request":
      return "Invalid Instagram OAuth request. Please try again.";
    case "unauthorized_client":
      return "App is not authorized to access Instagram. Please contact support.";
    case "unsupported_response_type":
      return "Invalid OAuth response type. Please contact support.";
    case "invalid_scope":
      return "Invalid permissions requested. Please ensure you have an Instagram Business account.";
    case "server_error":
      return "Instagram server error. Please try again later.";
    case "temporarily_unavailable":
      return "Instagram service is temporarily unavailable. Please try again later.";
    default:
      return errorDescription || "An error occurred during Instagram authentication. Please try again.";
  }
};

export default {
  INSTAGRAM_CONFIG: LEGACY_INSTAGRAM_CONFIG,
  generateInstagramOAuthUrl,
  getMetaBusinessLoginUrl,
  generateOAuthState,
  validateOAuthState,
  parseInstagramCallback,
  isBusinessAccountRequired,
  getInstagramErrorMessage,
  getInstagramOAuthUrl,
};
