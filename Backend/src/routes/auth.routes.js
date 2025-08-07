// import express from "express";
// import { enhancedConfig as config } from "../config/index.js";

// const router = express.Router();

// // Placeholder auth routes - implement actual authentication logic
// router.get("/status", (req, res) => {
//   res.json({
//     success: true,
//     message: "Auth service is running",
//     timestamp: new Date().toISOString(),
//   });
// });
// const express = require("express");
// const User = require("../models/User");
// const InstagramApiClient = require("../services/InstagramApiClient");
// const { authenticate } = require("../middleware/auth");

// const router = express.Router();
// const instagramClient = new InstagramApiClient();

// // ============================================================================
// // CLERK AUTHENTICATION & USER MANAGEMENT
// // ============================================================================

// /**
//  * POST /api/auth/webhook
//  * Handle Clerk webhooks for user lifecycle events
//  * This is the primary way users are created/updated/deleted
//  */
// router.post("/webhook", async (req, res) => {
//   try {
//     const { type, data } = req.body;

//     console.log("🔔 Clerk webhook received:", type, data?.id);

//     switch (type) {
//       case "user.created":
//         console.log("➕ Creating new user:", data.id);
//         try {
//           const newUser = new User({
//             clerkId: data.id,
//             email: data.email_addresses?.[0]?.email_address || null,
//             firstName: data.first_name || null,
//             lastName: data.last_name || null,
//             profileImageUrl: data.profile_image_url || null,
//             subscription: {
//               plan: "free",
//               status: "active",
//               expiresAt: null,
//             },
//             settings: {
//               notifications: {
//                 email: true,
//                 push: true,
//               },
//               autoReply: {
//                 enabled: false,
//                 businessHours: {
//                   enabled: true,
//                   start: "09:00",
//                   end: "17:00",
//                   timezone: "UTC",
//                 },
//               },
//             },
//             automationSettings: {
//               keywords: ["auto", "price", "info", "help"],
//               dmTemplate: `Hi! Thanks for your interest! 🎉

// Here's what you need to know:
// • Quick response to your inquiry
// • Professional service
// • 24/7 support available

// Feel free to ask if you have any questions!`,
//               successMessage: "Thanks! Check your DMs! 📩",
//               failureMessage: "DM failed to send! Please try again! 🔄",
//               isEnabled: false, // User needs to enable manually
//             },
//           });

//           await newUser.save();
//           console.log("✅ User created in database:", data.id);
//         } catch (createError) {
//           console.error("❌ Failed to create user:", createError);
//         }
//         break;

//       case "user.updated":
//         console.log("🔄 Updating user:", data.id);
//         try {
//           const user = await User.findByClerkId(data.id);
//           if (user) {
//             user.email = data.email_addresses?.[0]?.email_address || user.email;
//             user.firstName = data.first_name || user.firstName;
//             user.lastName = data.last_name || user.lastName;
//             user.profileImageUrl =
//               data.profile_image_url || user.profileImageUrl;

//             await user.save();
//             console.log("✅ User updated in database:", data.id);
//           } else {
//             console.log("⚠️ User not found for update:", data.id);
//           }
//         } catch (updateError) {
//           console.error("❌ Failed to update user:", updateError);
//         }
//         break;

//       case "user.deleted":
//         console.log("🗑️ Deleting user:", data.id);
//         try {
//           const user = await User.findByClerkId(data.id);
//           if (user) {
//             // Disconnect Instagram if connected
//             if (user.instagram?.isConnected) {
//               await user.disconnectInstagram();
//             }

//             // Delete user record
//             await User.deleteOne({ clerkId: data.id });
//             console.log("✅ User deleted from database:", data.id);
//           }
//         } catch (deleteError) {
//           console.error("❌ Failed to delete user:", deleteError);
//         }
//         break;

//       default:
//         console.log("❓ Unhandled webhook type:", type);
//     }

//     res.json({ success: true });
//   } catch (error) {
//     console.error("❌ Clerk webhook error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// /**
//  * POST /api/auth/sync
//  * Sync Clerk authenticated users with backend database
//  * Called by frontend when user logs in
//  */
// router.post("/sync", async (req, res) => {
//   try {
//     // Extract Clerk user ID from JWT token
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         error: "Authorization header missing or invalid",
//       });
//     }

//     const token = authHeader.substring(7);
//     let clerkUserId;

//     try {
//       // Extract user ID from token payload
//       const tokenPayload = JSON.parse(
//         Buffer.from(token.split(".")[1], "base64").toString()
//       );
//       clerkUserId = tokenPayload.sub || tokenPayload.userId;

//       if (!clerkUserId) {
//         throw new Error("User ID not found in token");
//       }
//     } catch (tokenError) {
//       console.error("Token parsing error:", tokenError);
//       return res.status(401).json({
//         success: false,
//         error: "Invalid or expired JWT token",
//       });
//     }

//     // Extract user data from request body
//     const { email, firstName, lastName, imageUrl } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         error: "Email is required",
//       });
//     }

//     console.log("🔄 Syncing Clerk user:", { clerkUserId, email });

//     // Check if user already exists by Clerk ID
//     let user = await User.findByClerkId(clerkUserId);

//     if (user) {
//       // Update existing user
//       user.email = email.toLowerCase();
//       user.firstName = firstName || user.firstName;
//       user.lastName = lastName || user.lastName;
//       user.profileImageUrl = imageUrl || user.profileImageUrl;
//       user.lastLoginAt = new Date();

//       await user.save();
//       console.log("✅ Updated existing user:", user._id);
//     } else {
//       // Create new user (fallback if webhook missed)
//       user = new User({
//         clerkId: clerkUserId,
//         email: email.toLowerCase(),
//         firstName: firstName || "",
//         lastName: lastName || "",
//         profileImageUrl: imageUrl || "",
//         subscription: {
//           plan: "free",
//           status: "active",
//         },
//         settings: {
//           notifications: { email: true, push: true },
//           autoReply: {
//             enabled: false,
//             businessHours: {
//               enabled: false,
//               start: "09:00",
//               end: "17:00",
//               timezone: "UTC",
//             },
//           },
//         },
//         lastLoginAt: new Date(),
//       });

//       await user.save();
//       console.log("✅ Created new user:", user._id);
//     }

//     // Return user profile (excluding sensitive data)
//     res.json({
//       success: true,
//       user: {
//         id: user._id,
//         clerkId: user.clerkId,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         fullName: user.getFullName(),
//         profileImageUrl: user.profileImageUrl,
//         subscription: user.subscription,
//         instagram: {
//           isConnected: user.instagram?.isConnected || false,
//           username: user.instagram?.username || null,
//           accountId: user.instagram?.accountId || null,
//         },
//         settings: user.settings,
//         usage: user.usage,
//         lastLoginAt: user.lastLoginAt,
//         createdAt: user.createdAt,
//       },
//       message: "User synchronized successfully",
//     });
//   } catch (error) {
//     console.error("❌ User sync error:", error);

//     // Handle specific error types
//     if (error.name === "ValidationError") {
//       return res.status(400).json({
//         success: false,
//         error: "Validation failed",
//         details: Object.values(error.errors).map((err) => err.message),
//       });
//     }

//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         error: "User with this email already exists",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       error: "Failed to sync user",
//       details:
//         process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// });

// /**
//  * GET /api/auth/status
//  * Check authentication status
//  */
// router.get("/status", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.json({
//         authenticated: false,
//         message: "No token provided",
//         provider: "clerk",
//       });
//     }

//     const token = authHeader.substring(7);

//     try {
//       // For test tokens (development only)
//       if (token.startsWith("test_")) {
//         const email = Buffer.from(token.split("_")[1], "base64").toString();
//         const user = await User.findOne({ email: email.toLowerCase() });

//         if (user) {
//           return res.json({
//             authenticated: true,
//             provider: "test",
//             user: {
//               id: user._id,
//               clerkId: user.clerkId,
//               email: user.email,
//               lastLoginAt: new Date().toISOString(),
//             },
//           });
//         }
//       }

//       // Basic token format validation for Clerk JWTs
//       const tokenParts = token.split(".");
//       if (tokenParts.length === 3) {
//         const payload = JSON.parse(
//           Buffer.from(tokenParts[1], "base64").toString()
//         );
//         const clerkUserId = payload.sub || payload.userId;

//         if (clerkUserId) {
//           const user = await User.findByClerkId(clerkUserId);
//           if (user) {
//             return res.json({
//               authenticated: true,
//               provider: "clerk",
//               user: {
//                 id: user._id,
//                 clerkId: user.clerkId,
//                 email: user.email,
//                 lastLoginAt: user.lastLoginAt,
//               },
//             });
//           }
//         }
//       }

//       res.json({
//         authenticated: false,
//         message: "Invalid token",
//         provider: "clerk",
//       });
//     } catch (tokenError) {
//       res.json({
//         authenticated: false,
//         message: "Invalid token format",
//         provider: "clerk",
//       });
//     }
//   } catch (error) {
//     console.error("❌ Auth status check error:", error);
//     res.status(500).json({
//       authenticated: false,
//       error: "Failed to check authentication status",
//     });
//   }
// });

// /**
//  * GET /api/auth/me
//  * Get current authenticated user information
//  */
// router.get("/me", authenticate, async (req, res) => {
//   try {
//     res.json({
//       success: true,
//       user: req.user.toJSON(),
//       provider: "clerk",
//     });
//   } catch (error) {
//     console.error("❌ User fetch error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // ============================================================================
// // INSTAGRAM INTEGRATION
// // ============================================================================

// /**
//  * GET /api/auth/instagram
//  * Get Instagram OAuth URL for current user
//  */
// router.get("/instagram", authenticate, async (req, res) => {
//   try {
//     // Generate state with user ID for security and user association
//     const timestamp = Date.now();
//     const state = `${req.user._id}_${timestamp}_${Math.random()
//       .toString(36)
//       .substring(2, 15)}`;

//     // Instagram Business API OAuth URL
//     const metaOAuthUrl =
//       `https://www.instagram.com/oauth/authorize?` +
//       `client_id=${process.env.INSTAGRAM_APP_ID}&` +
//       `redirect_uri=${encodeURIComponent(
//         process.env.BACKEND_URL + "/api/auth/instagram/callback"
//       )}&` +
//       `response_type=code&` +
//       `scope=instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish&` +
//       `state=${state}&` +
//       `force_reauth=true`;

//     console.log("📸 Instagram OAuth URL generated for user:", req.user._id);

//     res.json({
//       success: true,
//       authUrl: metaOAuthUrl,
//       state: state,
//       message: "Instagram Business Login URL",
//       provider: "instagram_business",
//       scopes: [
//         "instagram_business_basic",
//         "instagram_business_manage_messages",
//         "instagram_business_manage_comments",
//         "instagram_business_content_publish",
//       ],
//     });
//   } catch (error) {
//     console.error("❌ Instagram auth URL error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to get Instagram auth URL",
//       details: error.message,
//     });
//   }
// });

// /**
//  * GET /api/auth/instagram/callback
//  * Handle Instagram OAuth callback
//  */
// router.get("/instagram/callback", async (req, res) => {
//   try {
//     const { code, state, error } = req.query;

//     console.log("📸 Instagram callback received");

//     if (error) {
//       console.error("❌ Instagram OAuth error:", error);
//       return res.redirect(
//         `${
//           process.env.FRONTEND_URL
//         }/dashboard?instagram_error=${encodeURIComponent(error)}`
//       );
//     }

//     if (!code || !state) {
//       console.error("❌ Missing code or state parameter");
//       return res.redirect(
//         `${process.env.FRONTEND_URL}/dashboard?instagram_error=missing_parameters`
//       );
//     }

//     // Extract user ID from state
//     const userId = state.split("_")[0];
//     if (!userId) {
//       console.error("❌ Invalid state parameter");
//       return res.redirect(
//         `${process.env.FRONTEND_URL}/dashboard?instagram_error=invalid_state`
//       );
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       console.error("❌ User not found for ID:", userId);
//       return res.redirect(
//         `${process.env.FRONTEND_URL}/dashboard?instagram_error=user_not_found`
//       );
//     }

//     const redirectUri = `${process.env.BACKEND_URL}/api/auth/instagram/callback`;

//     // Exchange code for access token
//     const tokenData = await instagramClient.exchangeCodeForToken(
//       code,
//       redirectUri
//     );
//     console.log("✅ Instagram token exchange successful");

//     // Get long-lived token (60 days)
//     const longLivedTokenData = await instagramClient.getLongLivedToken(
//       tokenData.access_token
//     );
//     console.log("✅ Long-lived token obtained");

//     // Get Instagram user profile
//     const profileData = await instagramClient.getUserProfile(
//       longLivedTokenData.access_token,
//       tokenData.user_id
//     );

//     // Update user with Instagram connection
//     await user.connectInstagram({
//       accessToken: longLivedTokenData.access_token,
//       accountId: tokenData.user_id,
//       username: profileData.username,
//       accountType: profileData.account_type,
//       expiresAt: new Date(Date.now() + longLivedTokenData.expires_in * 1000),
//     });

//     console.log(
//       "✅ Instagram connected for user:",
//       user._id,
//       "username:",
//       profileData.username
//     );

//     // Redirect to frontend with success
//     res.redirect(
//       `${
//         process.env.FRONTEND_URL
//       }/dashboard?instagram_connected=success&username=${encodeURIComponent(
//         profileData.username
//       )}`
//     );
//   } catch (error) {
//     console.error("❌ Instagram callback error:", error);
//     res.redirect(
//       `${
//         process.env.FRONTEND_URL
//       }/dashboard?instagram_error=${encodeURIComponent(error.message)}`
//     );
//   }
// });

// /**
//  * POST /api/auth/instagram/disconnect
//  * Disconnect Instagram account
//  */
// router.post("/instagram/disconnect", authenticate, async (req, res) => {
//   try {
//     await req.user.disconnectInstagram();

//     console.log("🔌 Instagram disconnected for user:", req.user._id);

//     res.json({
//       success: true,
//       message: "Instagram account disconnected successfully",
//     });
//   } catch (error) {
//     console.error("❌ Instagram disconnect error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to disconnect Instagram account",
//       details: error.message,
//     });
//   }
// });

// /**
//  * POST /api/auth/instagram/refresh
//  * Refresh Instagram access token
//  */
// router.post("/instagram/refresh", authenticate, async (req, res) => {
//   try {
//     if (!req.user.instagram?.isConnected) {
//       return res.status(400).json({
//         success: false,
//         error: "Instagram account not connected",
//       });
//     }

//     // Get new long-lived token
//     const newTokenData = await instagramClient.getLongLivedToken(
//       req.user.instagram.accessToken
//     );

//     // Update user with new token
//     req.user.instagram.accessToken = newTokenData.access_token;
//     req.user.instagram.expiresAt = new Date(
//       Date.now() + newTokenData.expires_in * 1000
//     );
//     await req.user.save();

//     console.log("🔄 Instagram token refreshed for user:", req.user._id);

//     res.json({
//       success: true,
//       message: "Instagram token refreshed successfully",
//       expiresAt: req.user.instagram.expiresAt,
//     });
//   } catch (error) {
//     console.error("❌ Instagram token refresh error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to refresh Instagram token",
//       details: error.message,
//     });
//   }
// });

// // ============================================================================
// // DEVELOPMENT & TESTING ENDPOINTS
// // ============================================================================

// /**
//  * POST /api/auth/generate-test-token
//  * Generate a test session token for development/testing
//  * ONLY FOR DEVELOPMENT - REMOVE IN PRODUCTION
//  */
// if (process.env.NODE_ENV === "development") {
//   router.post("/generate-test-token", async (req, res) => {
//     try {
//       const { email, userId } = req.body;

//       if (!email) {
//         return res.status(400).json({
//           success: false,
//           error: "Email is required",
//         });
//       }

//       // Generate a test token
//       const testToken = `test_${Buffer.from(email).toString(
//         "base64"
//       )}_${Date.now()}`;
//       const clerkUserId =
//         userId || `test_user_${Math.random().toString(36).substring(7)}`;

//       // Create or find user in database
//       let user = await User.findOne({ email: email.toLowerCase() });

//       if (!user) {
//         user = new User({
//           clerkId: clerkUserId,
//           email: email.toLowerCase(),
//           firstName: "Test",
//           lastName: "User",
//           instagram: { isConnected: false },
//           automationSettings: {
//             keywords: ["auto", "price", "info", "help", "test"],
//             dmTemplate: `Hi! Thanks for your interest in our product! 🎉

// Here's what you need to know:
// • Test automation response
// • Demo purposes only
// • Contact us for real information

// Would you like to know more?`,
//             successMessage: "Thanks! Check your DMs! 📩",
//             failureMessage: "DM failed to send! Please try again! 🔄",
//             isEnabled: true,
//           },
//         });

//         await user.save();
//       }

//       res.json({
//         success: true,
//         sessionToken: testToken,
//         userId: clerkUserId,
//         user: {
//           id: user._id,
//           email: user.email,
//           clerkId: user.clerkId,
//         },
//         expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//         message: "Test token generated - DEVELOPMENT ONLY",
//       });
//     } catch (error) {
//       console.error("❌ Test token generation error:", error);
//       res.status(500).json({
//         success: false,
//         error: "Failed to generate test token",
//       });
//     }
//   });
// }

// // ============================================================================
// // HEALTH CHECK
// // ============================================================================

// /**
//  * GET /api/auth/health
//  * Health check for auth service
//  */
// router.get("/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "Auth service is running",
//     provider: "clerk",
//     features: {
//       webhooks: true,
//       instagram_oauth: true,
//       user_sync: true,
//       testing: process.env.NODE_ENV === "development",
//     },
//     timestamp: new Date().toISOString(),
//   });
// });

// module.exports = router;

// router.post("/login", (req, res) => {
//   res.status(501).json({
//     success: false,
//     message: "Login endpoint not implemented yet",
//     timestamp: new Date().toISOString(),
//   });
// });

// router.post("/register", (req, res) => {
//   res.status(501).json({
//     success: false,
//     message: "Register endpoint not implemented yet",
//     timestamp: new Date().toISOString(),
//   });
// });

// router.post("/logout", (req, res) => {
//   res.status(501).json({
//     success: false,
//     message: "Logout endpoint not implemented yet",
//     timestamp: new Date().toISOString(),
//   });
// });

// export default router;
