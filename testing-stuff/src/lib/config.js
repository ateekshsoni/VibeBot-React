// Centralized API configuration to prevent conflicts
const API_CONFIG = {
  // Normalize the API URL to prevent case sensitivity issues
  BASE_URL:
    import.meta.env.VITE_API_URL?.toLowerCase() ||
    "https://vibebot-v1.onrender.com/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

const ENDPOINTS = {
  // Backend endpoints (corrected based on backend API)
  BACKEND_SYNC: "/api/backend/sync",
  BACKEND_HEALTH: "/api/backend/health",
  BACKEND_CAPABILITIES: "/api/backend/capabilities",

  // User endpoints
  USER_PROFILE: "/api/user/profile",
  USER_STATS: "/api/user/stats",
  USER_AUTOMATION_SETTINGS: "/api/user/automation-settings",
  USER_INSTAGRAM_STATUS: "/api/user/instagram/status",

  // Auth endpoints
  AUTH_ME: "/api/auth/me",
  AUTH_INSTAGRAM: "/api/auth/instagram",
  AUTH_INSTAGRAM_CALLBACK: "/api/auth/instagram/callback",
  AUTH_INSTAGRAM_DISCONNECT: "/api/auth/instagram/disconnect",
  AUTH_WEBHOOK: "/api/auth/webhook",

  // Instagram endpoints
  INSTAGRAM_STATUS: "/api/instagram/status",
  INSTAGRAM_POSTS: "/api/instagram/posts",
  INSTAGRAM_WEBHOOK: "/api/instagram/webhook",

  // Automation endpoints
  AUTOMATION_SETTINGS: "/api/automation/settings",
  AUTOMATION_STATS: "/api/automation/stats",
  AUTOMATION_TEST: "/api/automation/test",

  // Analytics endpoints
  ANALYTICS_OVERVIEW: "/api/analytics/overview",
  ANALYTICS_PERFORMANCE: "/api/analytics/performance",
  ANALYTICS_AUTOMATION: "/api/analytics/automation",
  ANALYTICS_INSTAGRAM: "/api/analytics/instagram",

  // Other endpoints
  FLOWS: "/api/flows",
  DASHBOARD: "/api/dashboard",
  TEMPLATES: "/api/templates",
  CONVERSATIONS: "/api/conversations",
  BROADCAST: "/api/broadcast",

  // Health check
  HEALTH: "/health",
};

const CLERK_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  SIGN_IN_URL: "/sign-in",
  SIGN_UP_URL: "/sign-up",
  AFTER_SIGN_IN_URL: "/dashboard",
  AFTER_SIGN_UP_URL: "/dashboard",
};

const INSTAGRAM_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_INSTAGRAM_CLIENT_ID || "1807810336807413",
  REDIRECT_URI: `${API_CONFIG.BASE_URL.replace(
    "/api",
    ""
  )}/auth/instagram/callback`,
  SCOPES: [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
    "instagram_business_manage_insights",
  ].join(","),
};

export { API_CONFIG, ENDPOINTS, CLERK_CONFIG, INSTAGRAM_CONFIG };
