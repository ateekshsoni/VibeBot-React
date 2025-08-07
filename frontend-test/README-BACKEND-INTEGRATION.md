# Backend Integration Testing Guide

## 🎯 Complete Integration with `https://manychat-with-ai.onrender.com`

This document outlines how to test your VibeBot React frontend with the backend API.

## 🚀 **Quick Start Testing**

1. **Sign up/Login** with Clerk
2. Navigate to **"Backend Test"** in the sidebar  
3. Click **"Run All Tests"** to verify integration
4. Check browser console for detailed logs

## ✅ **What's Been Implemented**

### **1. Automatic User Sync**
- ✅ Users are automatically synced with MongoDB on login/signup
- ✅ Clerk user data is sent to `/auth/sync` endpoint
- ✅ Handles sync failures gracefully (won't break the app)

### **2. Axios Integration** 
- ✅ Replaced all fetch calls with Axios
- ✅ Automatic Clerk token injection via interceptors
- ✅ Proper error handling for 401/500 responses
- ✅ Network error detection

### **3. Backend API Endpoints**
- ✅ `GET /user/profile` - User profile and subscription info
- ✅ `POST /auth/sync` - Sync Clerk users with backend
- ✅ `PUT /user/automation-settings` - Update automation settings  
- ✅ `GET /user/instagram/status` - Instagram connection status
- ✅ `POST /integrations/instagram/callback` - Instagram OAuth callback

### **4. Testing Interface**
- ✅ Comprehensive test panel at `/test` route
- ✅ Individual test buttons for each API endpoint
- ✅ Real-time test status and error reporting
- ✅ Console logging for debugging

### **5. Instagram OAuth**
- ✅ Instagram Business API integration
- ✅ Proper OAuth URL generation with correct scopes
- ✅ Callback handling with error states
- ✅ Retry mechanisms for failed connections

## 🧪 **Testing Scenarios**

### **Scenario 1: New User Flow**
1. Sign up with new email
2. Should auto-sync with backend (check browser console)
3. Run "User Profile" test → Should return default settings
4. Run "User Sync" test → Should confirm user in MongoDB

### **Scenario 2: Existing User Flow**  
1. Sign in with existing account
2. Run "User Profile" test → Should load existing data
3. Run "Settings Update" test → Should persist changes
4. Sign out and back in → Settings should be preserved

### **Scenario 3: Instagram Integration**
1. Run "Instagram Status" test → Should show "Not Connected"
2. Click "Connect Instagram" on dashboard
3. Complete OAuth flow
4. Run test again → Should show "Connected"

### **Scenario 4: Error Handling**
1. Disconnect internet
2. Run tests → Should handle network errors gracefully
3. Check invalid tokens → Should get 401 responses
4. App should remain functional despite backend issues

## 🔧 **Configuration Details**

### **Backend Base URL**
```javascript
https://manychat-with-ai.onrender.com
```

### **Instagram OAuth Configuration**
```javascript
Client ID: 1807810336807413
Redirect URI: https://manychat-with-ai.onrender.com/api/integrations/instagram/callback
Scopes: 
- instagram_business_basic
- instagram_business_manage_messages  
- instagram_business_manage_comments
- instagram_business_content_publish
- instagram_business_manage_insights
```

### **Clerk Authentication**
```javascript
// All API calls automatically include:
headers: {
  'Authorization': `Bearer ${clerkToken}`,
  'Content-Type': 'application/json'
}
```

## 📊 **Monitoring & Debugging**

### **Browser Console Logs**
- ✅ `✅ Backend connected:` - Successful API calls
- ❌ `❌ Backend connection failed:` - API errors  
- 🔄 `🔄 Syncing user with backend...` - User sync attempts
- 📱 `📱 Instagram status:` - Instagram connection status

### **Network Tab Verification**
1. Open browser DevTools → Network tab
2. Sign in to trigger API calls
3. Look for calls to `manychat-with-ai.onrender.com`
4. Verify `Authorization: Bearer` headers are present
5. Check response status codes (200, 401, 500)

### **Backend Team Sharing**
When reporting issues, share:
1. Browser console screenshots
2. Network tab showing API requests/responses  
3. Clerk user ID from test panel
4. Specific error messages

## 🎉 **Success Indicators**

### **✅ Everything Working When:**
1. **User Registration** → User appears in MongoDB
2. **Authentication** → API calls include valid JWT tokens
3. **Data Persistence** → Settings save and load correctly  
4. **Instagram Check** → Shows connection status
5. **Error Handling** → 401/500s handled gracefully
6. **Auto-Sync** → New users automatically created in backend

### **❌ Common Issues:**
- **401 Errors** → Clerk token issues (check if signed in)
- **Network Errors** → Backend down or CORS issues
- **Sync Failures** → User data incomplete (check console)
- **Instagram OAuth** → Redirect URI mismatch

## 🛠 **Files Modified for Integration**

```
src/
├── components/
│   ├── BackendTestPanel.jsx          # New: Comprehensive testing interface
│   └── layout/DashboardLayout.jsx    # Updated: Auto user sync
├── hooks/
│   ├── useUserData.js               # Updated: Backend API integration  
│   └── useUserSync.js               # New: Automatic user synchronization
├── pages/
│   ├── TestPage.jsx                 # New: Testing page wrapper
│   └── InstagramCallback.jsx        # Updated: Axios integration
├── lib/
│   ├── api.js                       # Updated: Clerk token interceptors
│   └── instagram.js                 # Updated: OAuth URL generation
└── App.jsx                          # Updated: Test route added
```

## 🎯 **Next Steps**

1. **Test the integration** using the test panel
2. **Verify all scenarios** work as expected  
3. **Share results** with backend team if issues found
4. **Deploy to production** once all tests pass

Your VibeBot frontend is now fully integrated with the backend! 🚀
