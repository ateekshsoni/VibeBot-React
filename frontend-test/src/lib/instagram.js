// Instagram OAuth configuration and utilities

export const INSTAGRAM_CONFIG = {
  CLIENT_ID: "1807810336807413",
  REDIRECT_URI:
    "https://manychat-with-ai.onrender.com/api/integrations/instagram/callback",
  SCOPES: [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
    "instagram_business_manage_insights",
  ].join(","),
};

/**
 * Get Instagram OAuth URL from backend (Recommended)
 * Backend team expects us to use /api/auth/instagram endpoint
 * @returns {Promise<string>} Instagram OAuth URL from backend
 */
export const getInstagramOAuthUrl = async () => {
  try {
    const response = await fetch('https://manychat-with-ai.onrender.com/api/auth/instagram');
    const data = await response.json();
    
    if (data.success && data.authUrl) {
      console.log('✅ Got Instagram OAuth URL from backend:', data.authUrl);
      return data.authUrl;
    } else {
      throw new Error('Backend did not return OAuth URL');
    }
  } catch (error) {
    console.error('❌ Failed to get Instagram OAuth URL from backend:', error);
    console.log('🔄 Falling back to hardcoded OAuth URL...');
    // Fallback to hardcoded URL if backend fails
    return generateInstagramOAuthUrl();
  }
};

/**
 * Generate Instagram OAuth authorization URL
 * @param {Object} options - OAuth options
 * @param {string} options.clientId - Instagram App Client ID
 * @param {string} options.redirectUri - Callback URL
 * @param {string} options.scopes - Comma-separated scopes
 * @param {boolean} options.forceReauth - Force re-authentication
 * @returns {string} Instagram OAuth URL
 */
export const generateInstagramOAuthUrl = (options = {}) => {
  const {
    clientId = INSTAGRAM_CONFIG.CLIENT_ID,
    redirectUri = INSTAGRAM_CONFIG.REDIRECT_URI,
    scopes = INSTAGRAM_CONFIG.SCOPES,
    forceReauth = true,
  } = options;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes,
    ...(forceReauth && { force_reauth: "true" }),
  });

  return `https://www.instagram.com/oauth/authorize?${params.toString()}`;
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
  };
};

/**
 * Check if Instagram Business account is required
 * @param {string} error - Error type from Instagram
 * @returns {boolean} Whether error is due to missing business account
 */
export const isBusinessAccountRequired = (error) => {
  return error === "access_denied" || error === "invalid_scope";
};

export default {
  INSTAGRAM_CONFIG,
  generateInstagramOAuthUrl,
  parseInstagramCallback,
  isBusinessAccountRequired,
};
