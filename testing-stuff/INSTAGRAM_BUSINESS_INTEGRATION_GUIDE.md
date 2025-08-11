# 📱 Instagram Business Login Integration Guide

## 🎯 Overview

This guide explains how to implement Instagram Business Login using the exact URL format provided by Meta Console. The implementation includes both frontend React components and proper backend integration.

## 🔧 Configuration

### Instagram App Configuration
- **Client ID:** `1807810336807413`
- **Redirect URI:** `https://vibeBot-v1.onrender.com/api/auth/instagram/callback`
- **Business Login URL:** `https://www.instagram.com/oauth/authorize`

### Required Scopes
- `instagram_business_basic` - Basic business account access
- `instagram_business_manage_messages` - Message management
- `instagram_business_manage_comments` - Comment management  
- `instagram_business_content_publish` - Content publishing
- `instagram_business_manage_insights` - Analytics access

## 🔗 Instagram Business Login URL

The exact URL format as provided by Meta Console:

```
https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=1807810336807413&redirect_uri=https://vibeBot-v1.onrender.com/api/auth/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights
```

## 🚀 Implementation

### 1. Frontend React Component

#### Basic Usage
```jsx
import InstagramConnectButton from './components/InstagramConnectButton';

function MyComponent() {
  return (
    <InstagramConnectButton 
      variant="primary"
      onConnect={(url) => {
        // Optional: Handle the URL before redirect
        console.log('Instagram OAuth URL:', url);
      }}
    >
      Connect Instagram Business
    </InstagramConnectButton>
  );
}
```

#### Custom Implementation
```jsx
import { getMetaBusinessLoginUrl } from '../lib/instagram';
import { useAuth } from '@clerk/clerk-react';

function CustomInstagramButton() {
  const { user } = useAuth();

  const handleConnect = () => {
    const instagramUrl = getMetaBusinessLoginUrl(user?.id);
    window.location.href = instagramUrl;
  };

  return (
    <button onClick={handleConnect}>
      Connect to Instagram
    </button>
  );
}
```

### 2. Instagram Utility Functions

#### Generate OAuth URL
```javascript
import { getMetaBusinessLoginUrl } from '../lib/instagram';

// Generate URL with user state
const url = getMetaBusinessLoginUrl(userId);

// Generate URL without state
const url = getMetaBusinessLoginUrl();
```

#### Backend Integration
```javascript
import { getInstagramOAuthUrl } from '../lib/instagram';

// Try backend first, fallback to client-side
try {
  const url = await getInstagramOAuthUrl(userId);
  window.location.href = url;
} catch (error) {
  // Fallback to Meta Business Login URL
  const fallbackUrl = getMetaBusinessLoginUrl(userId);
  window.location.href = fallbackUrl;
}
```

### 3. Handle OAuth Callback

The callback will be handled at:
```
https://vibeBot-v1.onrender.com/api/auth/instagram/callback
```

Frontend callback page at `/instagram/callback` will process the response.

## 🛡️ Security Features

### State Parameter
- Automatically generated for each request
- Includes user ID, timestamp, and random string
- Validates against expected user and 10-minute expiry
- Format: `{userId}_{timestamp}_{random}`

### Error Handling
- Comprehensive error messages for different OAuth errors
- Fallback mechanisms if backend is unavailable
- User-friendly error descriptions
- Automatic retry capabilities

## 🧪 Testing

### Test Page Integration
Visit `/test` in your application to:
- Test Instagram OAuth URL generation
- Verify Meta Business Login URL format
- Check backend endpoint availability
- Validate configuration parameters

### Manual Testing
1. Click "Generate Instagram URL" to test URL creation
2. Click "Connect Instagram Business" to initiate full flow
3. Check browser console for detailed logs
4. Verify redirect to Instagram Business Login

## 📋 Checklist for Implementation

### Frontend Setup
- [ ] Install required dependencies (`react-hot-toast`, `@clerk/clerk-react`)
- [ ] Import `InstagramConnectButton` component
- [ ] Configure environment variables
- [ ] Test URL generation on `/test` page

### Backend Setup
- [ ] Implement `/api/auth/instagram` endpoint (optional)
- [ ] Implement `/api/auth/instagram/callback` endpoint
- [ ] Configure CORS for your frontend domain
- [ ] Set up Instagram App credentials

### Production Deployment
- [ ] Update environment variables in Netlify
- [ ] Verify redirect URI in Meta Console
- [ ] Test full OAuth flow in production
- [ ] Monitor error logs and user feedback

## 🔄 Flow Diagram

```
1. User clicks "Connect Instagram Business"
   ↓
2. Generate OAuth URL with state parameter
   ↓
3. Redirect to Instagram Business Login
   ↓
4. User authorizes application
   ↓
5. Instagram redirects to callback URL
   ↓
6. Backend processes authorization code
   ↓
7. Frontend shows success/error message
   ↓
8. User is redirected to dashboard
```

## 📞 Troubleshooting

### Common Issues

1. **"Invalid Redirect URI"**
   - Ensure redirect URI matches exactly in Meta Console
   - Check for trailing slashes or protocol mismatches

2. **"Invalid Client ID"**
   - Verify client ID is correct: `1807810336807413`
   - Check Meta Console for active app status

3. **"Business Account Required"**
   - User must have Instagram Business account
   - Provide clear instructions for account conversion

4. **State Parameter Validation Failed**
   - Check system time synchronization
   - Verify user ID consistency
   - Check 10-minute expiry window

### Debug Information

Enable debug mode to see:
- Generated OAuth URLs
- State parameter details
- Backend response data
- Error stack traces

```javascript
// Add to development environment
console.log('Instagram OAuth Debug:', {
  url: generatedUrl,
  state: stateParameter,
  userId: user.id,
  timestamp: new Date().toISOString()
});
```

## 🔗 Useful Links

- [Meta Console](https://developers.facebook.com/apps/)
- [Instagram Business API Documentation](https://developers.facebook.com/docs/instagram-api)
- [OAuth 2.0 Flow Guide](https://developers.facebook.com/docs/instagram-api/overview#authorization)

---

**✅ Your Instagram Business Login integration is now ready for production!**
