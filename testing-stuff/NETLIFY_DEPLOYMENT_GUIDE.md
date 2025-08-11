# 🚀 Netlify Deployment Guide for VibeBot

## ⚠️ FIXING 404 ERRORS ON NETLIFY

The "Page not found" error on Netlify happens because your React app is a Single Page Application (SPA), but Netlify doesn't know how to handle client-side routing by default.

### ✅ SOLUTIONS IMPLEMENTED:

1. **`public/_redirects` file** - Tells Netlify to serve `index.html` for all routes
2. **`netlify.toml` file** - Netlify configuration with proper redirects and headers

### 🔧 DEPLOYMENT STEPS:

#### Step 1: Get Production Clerk Keys

🚨 **CRITICAL**: You're currently using development Clerk keys which have strict limits and shouldn't be used in production.

**To get production keys:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Select your application
3. Go to **API Keys** section
4. Look for **Production** keys (they start with `pk_live_`)
5. If you don't see production keys:
   - Go to **Settings** → **Domains**
   - Add your production domain (e.g., `https://vibebot.netlify.app`)
   - This will enable production keys

#### Step 2: Set Environment Variables in Netlify Dashboard

Go to your Netlify site dashboard > Site settings > Environment variables and add:

**For Development/Testing:**
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_dGVzdGluZy1vcmFuZ2UtcGVhY29jay0xOC5jbGVyay5hY2NvdW50cy5kZXYk
VITE_API_URL=https://vibeBot-v1.onrender.com/api
```

**For Production (RECOMMENDED):**
```
VITE_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_PRODUCTION_KEY_HERE
VITE_API_URL=https://vibeBot-v1.onrender.com/api
```

#### Step 3: Deploy Your Site

1. **Connect your GitHub repo** to Netlify
2. **Build settings** (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy**

#### Step 3: Test Your Routes

After deployment, test these URLs (replace `your-site.netlify.app` with your actual domain):

- ✅ `https://your-site.netlify.app/` - Landing page
- ✅ `https://your-site.netlify.app/signup` - Signup page
- ✅ `https://your-site.netlify.app/sign-in` - Login page
- ✅ `https://your-site.netlify.app/dashboard` - Dashboard (after auth)
- ✅ `https://your-site.netlify.app/backend-test` - Backend test page

### 🐛 TROUBLESHOOTING:

**If you still get 404 errors:**

1. **Check build logs** in Netlify dashboard
2. **Verify files exist** in your `dist` folder after build:
   - `dist/_redirects` should exist
   - `dist/index.html` should exist
3. **Clear Netlify cache** and redeploy
4. **Check browser console** for any JavaScript errors

### 📋 PRE-DEPLOYMENT CHECKLIST:

- [ ] `_redirects` file in `public/` folder
- [ ] `netlify.toml` file in root directory
- [ ] Environment variables set in Netlify dashboard
- [ ] Successful local build (`npm run build`)
- [ ] All routes working locally (`npm run dev`)

### 🔑 PRODUCTION ENVIRONMENT VARIABLES:

For production, you'll need to update these to production values:

```
# Replace with your production Clerk keys
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key

# Your backend API URL
VITE_API_URL=https://your-production-backend.com/api
```

### 🚨 COMMON MISTAKES TO AVOID:

1. **Missing `_redirects` file** - Most common cause of 404s
2. **Wrong publish directory** - Should be `dist` not `build`
3. **Environment variables not set** - Causes auth failures
4. **HTTPS mixed content** - Use HTTPS for all external API calls

---

## 🎉 Your site should now work without 404 errors!

If you're still experiencing issues, check the Netlify build logs and ensure all files are properly deployed.
