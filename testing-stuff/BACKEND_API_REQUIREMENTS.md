# Backend API Requirements - Critical Fix Needed

## Issue Summary
The `/api/backend/sync` endpoint is returning a 500 error because it expects a `frontendVersion` property in the request body that was not being sent by the frontend.

## Error Details
```
ERROR: Cannot destructure property 'frontendVersion' of 'req.body' as it is undefined.
```

## Current Request Payload
The frontend is now sending this payload to `/api/backend/sync`:
```json
{
  "clerkUserId": "user_3160P3jkEewZKEQv8aoPRnEdpco",
  "email": "ateekshsoni@gmail.com", 
  "firstName": "Ateeksh",
  "lastName": "Soni",
  "profileImageUrl": "https://img.clerk.com/...",
  "createdAt": "2025-08-10T12:33:07.089Z",
  "updatedAt": "2025-08-12T15:41:05.400Z",
  "frontendVersion": "1.0.0"  // ← ADDED THIS FIELD
}
```

## Backend Requirements
The backend `/api/backend/sync` endpoint must:

1. **Handle missing frontendVersion gracefully** - Either:
   - Make it optional with a default value
   - Or use proper error handling instead of destructuring without validation

2. **Expected Response Format**:
   ```json
   {
     "success": true,
     "user": {
       // user data
     },
     "message": "User synced successfully"
   }
   ```

## Frontend Changes Made
✅ Added `frontendVersion: "1.0.0"` to the sync request payload
✅ Fixed infinite loop issues in the sync hook
✅ Improved circuit breaker handling to prevent cascading failures

## Priority: CRITICAL
This is blocking user authentication and sync functionality in production.

## Testing Endpoint
- **URL**: `POST https://vibebot-v1.onrender.com/api/backend/sync`
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Body**: See payload example above

## Next Steps for Backend Team
1. Update the `/api/backend/sync` endpoint to handle `frontendVersion` properly
2. Add proper error handling for missing required fields
3. Test with the updated payload structure
4. Deploy the fix to production

---
**Created**: August 12, 2025  
**Reporter**: Frontend Team  
**Status**: Requires Backend Fix
