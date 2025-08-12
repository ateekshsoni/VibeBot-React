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
  BACKEND_SYNC: "/backend/sync",
  BACKEND_HEALTH: "/backend/health",
  BACKEND_CAPABILITIES: "/backend/capabilities",

  // User endpoints
  USER_PROFILE: "/user/profile",
  USER_STATS: "/user/stats",
  USER_AUTOMATION_SETTINGS: "/user/automation-settings",
  USER_INSTAGRAM_STATUS: "/user/instagram/status",

  // Auth endpoints
  AUTH_ME: "/auth/me",
  AUTH_INSTAGRAM: "/auth/instagram",
  AUTH_INSTAGRAM_CALLBACK: "/auth/instagram/callback",
  AUTH_INSTAGRAM_DISCONNECT: "/auth/instagram/disconnect",
  AUTH_WEBHOOK: "/auth/webhook",

  // Instagram endpoints
  INSTAGRAM_STATUS: "/instagram/status",
  INSTAGRAM_POSTS: "/instagram/posts",
  INSTAGRAM_WEBHOOK: "/instagram/webhook",

  // Automation endpoints
  AUTOMATION_SETTINGS: "/automation/settings",
  AUTOMATION_STATS: "/automation/stats",
  AUTOMATION_TEST: "/automation/test",

  // Analytics endpoints
  ANALYTICS_OVERVIEW: "/analytics/overview",
  ANALYTICS_PERFORMANCE: "/analytics/performance",
  ANALYTICS_AUTOMATION: "/analytics/automation",
  ANALYTICS_INSTAGRAM: "/analytics/instagram",

  // Other endpoints
  FLOWS: "/flows",
  DASHBOARD: "/dashboard",
  TEMPLATES: "/templates",
  CONVERSATIONS: "/conversations",
  BROADCAST: "/broadcast",

  // Health check (without /api prefix)
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
