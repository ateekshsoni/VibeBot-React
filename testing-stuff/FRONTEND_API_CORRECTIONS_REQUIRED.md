# 🚨 FRONTEND API ENDPOINT CORRECTIONS REQUIRED

## 📊 **ANALYSIS COMPLETE** - Backend vs Frontend API Mismatch

After analyzing our **existing backend routes**, the frontend team is calling **WRONG endpoints**. Here are the **corrections needed**:

---

## 🔴 **CRITICAL: Frontend is Calling NON-EXISTENT Endpoints**

### ❌ **What Frontend is Currently Calling (WRONG):**

```javascript
PUT / api / user / automation; // ❌ Does NOT exist
POST / api / user / automation / toggle; // ❌ Does NOT exist
GET / api / auth / instagram; // ❌ Does NOT exist
```

### ✅ **What Frontend SHOULD Call (CORRECT):**

```javascript
PUT / api / user / automation - settings; // ✅ EXISTS in backend
GET / api / user / instagram / status; // ✅ EXISTS in backend
POST / api / user / instagram / disconnect; // ✅ EXISTS in backend
```

---

## 🔧 **EXACT ENDPOINT CORRECTIONS FOR FRONTEND TEAM**

### **1. User Profile - ✅ WORKING CORRECTLY**

```javascript
// ✅ CORRECT - This is working fine
GET /api/user/profile
Authorization: Bearer {clerk-token}
```

### **2. Automation Settings - ❌ WRONG ENDPOINT**

**❌ Frontend Current Call (WRONG):**

```javascript
PUT / api / user / automation; // Does not exist!
```

**✅ CORRECT Endpoint to Use:**

```javascript
PUT /api/user/automation-settings  // This exists!
Authorization: Bearer {clerk-token}
Content-Type: application/json

{
  "keywords": ["hello", "info", "price"],
  "dmTemplate": "Thanks for your comment! Check your DMs 📩",
  "successMessage": "Thanks! Check your DMs! 📩",
  "failureMessage": "Something went wrong! Try again 🔄",
  "isEnabled": true
}
```

**✅ Expected Response:**

```json
{
  "success": true,
  "message": "Automation settings updated successfully",
  "automationSettings": {
    "keywords": ["hello", "info", "price"],
    "dmTemplate": "Thanks for your comment! Check your DMs 📩",
    "isEnabled": true,
    "updatedAt": "2025-08-11T12:00:00.000Z"
  }
}
```

### **3. Automation Toggle - ❌ WRONG ENDPOINT**

**❌ Frontend Current Call (WRONG):**

```javascript
POST / api / user / automation / toggle; // Does not exist!
```

**✅ CORRECT Approach - Use Automation Settings:**

```javascript
PUT /api/user/automation-settings  // Use existing endpoint
Authorization: Bearer {clerk-token}
Content-Type: application/json

{
  "isEnabled": true  // or false to disable
}
```

### **4. Instagram Status - ❌ WRONG ENDPOINT PATH**

**❌ Frontend Current Call (WRONG):**

```javascript
GET / api / instagram / status; // Wrong path!
```

**✅ CORRECT Endpoint to Use:**

```javascript
GET /api/user/instagram/status  // Correct path!
Authorization: Bearer {clerk-token}
```

**✅ Expected Response:**

```json
{
  "success": true,
  "connected": true,
  "account": {
    "username": "wearedevstrome",
    "accountId": "30607678362213777",
    "accountType": "BUSINESS",
    "connectedAt": "2025-08-11T12:03:35.000Z"
  },
  "permissions": [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
    "instagram_business_manage_insights"
  ],
  "tokenExpiresAt": "2025-10-09T16:39:25.000Z",
  "automationEnabled": false
}
```

### **5. Instagram Connection - ❌ WRONG APPROACH**

**❌ Frontend Current Approach (WRONG):**

```javascript
// Trying to call /api/auth/instagram - does not exist
window.location.href = "/api/auth/instagram";
```

**✅ CORRECT Approach:**

```javascript
const handleConnectInstagram = async () => {
  try {
    // Step 1: Get user's database ID
    const token = await getToken();
    const userResponse = await fetch("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await userResponse.json();

    if (!userData.success || !userData.user.id) {
      alert("Failed to get user info");
      return;
    }

    // Step 2: Create state parameter with user's actual database ID
    const state = `user_${userData.user.id}_${Date.now()}`;

    // Step 3: Direct Instagram OAuth URL (from Meta Console)
    const instagramUrl =
      `https://www.instagram.com/oauth/authorize?` +
      `client_id=1807810336807413&` +
      `redirect_uri=https%3A%2F%2FvibeBot-v1.onrender.com%2Fapi%2Fauth%2Finstagram%2Fcallback&` +
      `response_type=code&` +
      `scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights&` +
      `state=${state}`;

    window.location.href = instagramUrl;
  } catch (error) {
    console.error("Instagram connection error:", error);
  }
};
```

### **6. Instagram Disconnect - ✅ CORRECT ENDPOINT**

```javascript
// ✅ This endpoint exists and works
POST /api/user/instagram/disconnect
Authorization: Bearer {clerk-token}
```

### **7. Analytics - ❌ WRONG ENDPOINT PATH**

**❌ Frontend Current Call (WRONG):**

```javascript
GET / api / user / analytics; // Wrong path!
```

**✅ CORRECT Endpoint to Use:**

```javascript
GET /api/analytics/realtime     // For real-time metrics
GET /api/analytics/dashboard    // For comprehensive analytics
Authorization: Bearer {clerk-token}
```

---

## 📋 **COMPLETE API MAPPING TABLE**

| **Frontend Need**    | **❌ Wrong Call**                  | **✅ Correct Endpoint**               | **Status**             |
| -------------------- | ---------------------------------- | ------------------------------------- | ---------------------- |
| User Profile         | `GET /api/user/profile`            | `GET /api/user/profile`               | ✅ Already Correct     |
| Instagram Status     | `GET /api/instagram/status`        | `GET /api/user/instagram/status`      | ❌ Fix Path            |
| Save Automation      | `PUT /api/user/automation`         | `PUT /api/user/automation-settings`   | ❌ Fix Endpoint        |
| Toggle Automation    | `POST /api/user/automation/toggle` | `PUT /api/user/automation-settings`   | ❌ Use Settings Update |
| Connect Instagram    | `GET /api/auth/instagram`          | Direct Meta OAuth URL                 | ❌ Fix Approach        |
| Disconnect Instagram | `POST /api/instagram/disconnect`   | `POST /api/user/instagram/disconnect` | ❌ Fix Path            |
| Get Analytics        | `GET /api/user/analytics`          | `GET /api/analytics/realtime`         | ❌ Fix Path            |

---

## 🛠️ **FRONTEND TEAM IMMEDIATE ACTION ITEMS**

### **1. Update Instagram Status Check:**

```javascript
// Change this:
const response = await fetch('/api/instagram/status', {

// To this:
const response = await fetch('/api/user/instagram/status', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### **2. Update Automation Settings Save:**

```javascript
// Change this:
await fetch('/api/user/automation', {
  method: 'PUT',

// To this:
await fetch('/api/user/automation-settings', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    keywords: settings.keywords,
    dmTemplate: settings.dmTemplate,
    successMessage: settings.successMessage,
    failureMessage: settings.failureMessage,
    isEnabled: settings.isEnabled
  })
});
```

### **3. Update Instagram Connect Button:**

```javascript
// Replace the entire handleConnectInstagram function with the correct approach above
```

### **4. Update Analytics Calls:**

```javascript
// Change this:
const response = await fetch('/api/user/analytics', {

// To this:
const response = await fetch('/api/analytics/realtime', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## 🎯 **BACKEND STATUS: NO CHANGES NEEDED**

✅ **All required endpoints ALREADY EXIST in backend**
✅ **Instagram OAuth is working perfectly**  
✅ **Authentication system is functional**
✅ **User profile and automation settings endpoints are ready**

**The backend doesn't need any changes - frontend just needs to call the correct endpoints!**

---

## 🚀 **RESULT**

Once these endpoint corrections are made, the Instagram automation system will work perfectly:

1. ✅ User can connect Instagram (OAuth working)
2. ✅ Instagram status displays correctly
3. ✅ Automation settings can be saved
4. ✅ Automation can be enabled/disabled
5. ✅ Analytics data displays properly

**All functionality is ready - just need the correct API calls!** 🎉
