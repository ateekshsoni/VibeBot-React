# 🔧 URGENT: Instagram OAuth API Integration - Frontend Team Needs Backend Clarification

## 🚨 Current Issue

**Frontend is getting 404 errors when trying to connect Instagram OAuth**

Our frontend Instagram connection flow is failing because we're getting `404 Not Found` responses from the backend API endpoints.

---

## 📍 **What We're Currently Trying:**

### Current API Call:

```javascript
POST https://vibeBot-v1.onrender.com/api/auth/instagram/initiate
Headers: {
  Authorization: "Bearer <clerk-token>",
  Content-Type: "application/json"
}
```

**Result**: `404 Not Found`

---

## ❓ **Questions for Backend Team:**

### 1. **What are the correct API endpoints?**

- [ ] Is it `/api/auth/instagram/initiate`?
- [ ] Or `/api/v1/auth/instagram/initiate`?
- [ ] Or something else entirely?

### 2. **Instagram OAuth Flow Endpoints Needed:**

We need the following endpoints working:

#### **A. Instagram Connection Initiation:**

```http
POST /api/???/instagram/initiate
Headers: Authorization Bearer <clerk-token>
```

**Expected Response:**

```json
{
  "success": true,
  "authUrl": "https://www.instagram.com/oauth/authorize?client_id=...&redirect_uri=...&state=..."
}
```

#### **B. Instagram OAuth Callback:**

```http
POST /api/???/instagram/callback
Body: {
  "code": "authorization_code_from_instagram",
  "state": "security_state_parameter"
}
```

#### **C. Instagram Status Check:**

```http
GET /api/???/instagram/status
Headers: Authorization Bearer <clerk-token>
```

**Expected Response:**

```json
{
  "connected": true/false,
  "username": "instagram_username",
  "accountId": "instagram_account_id"
}
```

#### **D. User Profile Data:**

```http
GET /api/???/user/profile
Headers: Authorization Bearer <clerk-token>
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "clerkId": "clerk_user_id",
    "email": "user@email.com",
    "instagram": {
      "isConnected": true/false,
      "username": "instagram_username",
      "accountId": "account_id"
    },
    "automationSettings": {
      "isEnabled": true/false,
      "keywords": ["keyword1", "keyword2"]
    },
    "createdAt": "2025-08-10T12:33:07.952Z"
  }
}
```

---

## 🔑 **Authentication Details:**

### **How we're sending tokens:**

- We get Clerk JWT tokens using `auth.getToken()`, `user.getToken()`, or `session.getToken()`
- We send them as: `Authorization: Bearer <token>`

### **Token validation questions:**

- [ ] Are you properly validating Clerk JWT tokens?
- [ ] Do you need any specific Clerk configuration?
- [ ] Are there any CORS issues we should know about?

---

## 🌐 **Current Environment:**

### **Frontend:**

- **Production**: https://vibebot.netlify.app
- **API Base URL**: https://vibeBot-v1.onrender.com/api
- **Clerk Auth**: Using test keys in development

### **Backend:**

- **URL**: https://vibeBot-v1.onrender.com
- **Status**: ✅ Server is responding (200 OK on root)
- **API Status**: ❌ 404 on `/api/auth/instagram/initiate`

---

## 🧪 **Testing Status:**

### **What Works:**

- ✅ Frontend authentication (Clerk login/logout)
- ✅ Token generation (`auth.getToken()` returns valid JWT)
- ✅ Backend server is running and accessible

### **What's Broken:**

- ❌ Instagram OAuth initiation (404 error)
- ❌ User profile fetching (likely wrong endpoint)
- ❌ Instagram status checking (likely wrong endpoint)

---

## 🚀 **What We Need From You:**

### **Immediate (URGENT):**

1. **Correct API endpoint paths** for all Instagram OAuth operations
2. **Example working curl commands** with proper authentication
3. **Expected request/response formats** for each endpoint

### **ASAP:**

4. **CORS configuration** - make sure frontend domain is whitelisted
5. **Authentication setup** - confirm Clerk JWT validation is working
6. **Error response formats** - standardized error responses

### **Soon:**

7. **API documentation** or Postman collection
8. **Rate limiting details** if any
9. **Webhook endpoints** for Instagram callbacks

---

## 🔧 **Quick Test Request:**

**Can you please provide a working curl command like this:**

```bash
curl -X POST "https://vibeBot-v1.onrender.com/api/YOUR_CORRECT_PATH/instagram/initiate" \
  -H "Authorization: Bearer YOUR_TEST_TOKEN" \
  -H "Content-Type: application/json"
```

**So we can:**

1. Verify the correct endpoint path
2. Test authentication is working
3. See the expected response format
4. Fix our frontend integration

---

## ⏰ **Timeline:**

- **CRITICAL**: We need the correct endpoints TODAY to unblock Instagram integration
- **Users are currently seeing**: Empty skeleton loading screens instead of connection buttons
- **Frontend is ready**: Just needs the right API paths and response formats

---

## 📧 **Response Format:**

Please respond with:

```
✅ CORRECT ENDPOINTS:
- Instagram Initiate: POST /api/???
- Instagram Callback: POST /api/???
- Instagram Status: GET /api/???
- User Profile: GET /api/???

✅ EXAMPLE WORKING CURL:
[paste working curl command here]

✅ RESPONSE FORMAT:
[paste example JSON response]

✅ AUTHENTICATION:
[any special auth requirements]
```

**Thank you! 🙏**

---

**Frontend Team**  
**Timestamp**: August 11, 2025  
**Priority**: URGENT - Blocking Instagram Integration
