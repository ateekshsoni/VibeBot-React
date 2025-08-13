# URGENT: Instagram API 401 Error - Backend Fix Required

## Issue Summary

The Instagram status API endpoint is returning 401 Unauthorized errors in production, preventing the frontend from checking Instagram connection status.

## Current Error Details

**Endpoint**: `GET /user/instagram/status`  
**Status Code**: `401 Unauthorized`  
**Response Body**:

```json
{
  "error": "Invalid or expired token"
}
```

**Frontend Console Error**:

```
❌ API Error [401] /user/instagram/status: {error: 'Invalid or expired token'}
🔒 Authentication failed - token may be invalid or expired
❌ Authentication failed - please sign out and sign back in
```

## Authentication Context

- **Clerk Authentication**: ✅ Working correctly
- **User Session**: ✅ Active with valid session ID
- **Auth Token**: ✅ Successfully obtained via `session.getToken()`
- **Other Endpoints**: ✅ `/auth/sync` and `/user/profile` work fine with same token

## Problem Analysis

The Instagram status endpoint specifically rejects the Clerk JWT token that works for other endpoints. This suggests:

1. **Token Validation Issue**: The Instagram endpoint may have different token validation logic
2. **Scope/Permission Issue**: The endpoint may require different token scopes or permissions
3. **Token Format Issue**: The endpoint may expect a different token format or header structure
4. **Instagram-Specific Auth**: The endpoint may require Instagram-specific authentication

## Required Backend Investigation

Please check the following in your Instagram status endpoint:

### 1. Token Validation Logic

```javascript
// Ensure consistent token validation across all endpoints
app.get("/user/instagram/status", authenticateToken, (req, res) => {
  // Same token validation as /auth/sync and /user/profile
});
```

### 2. Token Scope Requirements

- Does the Instagram endpoint require specific Clerk token scopes?
- Are there additional permissions needed for Instagram operations?

### 3. Instagram API Integration

- Is the endpoint trying to validate tokens with Instagram's API?
- Are Instagram access tokens properly stored and refreshed?
- Is there a token refresh mechanism that's failing?

### 4. Database/Session Issues

- Does the endpoint query user Instagram connections from the database?
- Are Instagram tokens properly stored and retrieved?
- Is there a session or user lookup that's failing?

## Recommended Backend Actions

1. **Add Debug Logging**: Log the incoming Clerk token and validation steps
2. **Check Token Headers**: Ensure the endpoint reads the `Authorization: Bearer <token>` header correctly
3. **Verify Token Validation**: Use the same token validation middleware as working endpoints
4. **Test Token Manually**: Try the endpoint with a known-good token from `/auth/sync`
5. **Check Instagram Integration**: Verify if Instagram-specific tokens are involved and properly managed

## Frontend Workaround (Temporary)

The frontend has temporarily disabled Instagram status fetching to prevent infinite loops:

```javascript
// In useUserData.js - temporarily disabled
const fetchInstagramStatus = async () => {
  return { connected: false, error: "Temporarily disabled" };
};
```

This can be re-enabled once the backend 401 issue is resolved.

## Expected Resolution

Once fixed, the frontend should:

- ✅ Successfully fetch Instagram connection status
- ✅ Display proper Instagram integration state
- ✅ Stop showing "Authentication failed" messages

## Priority: HIGH

This affects user experience as users cannot see their Instagram connection status or manage Instagram integrations.

---

**Reported**: August 13, 2025  
**Environment**: Production (Netlify)  
**User**: Active Clerk session with valid JWT  
**Impact**: Instagram features unavailable
