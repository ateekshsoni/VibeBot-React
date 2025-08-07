import mongoose, { mongo } from "mongoose";
import CryptoJS from "crypto-js";

const userSchema = new mongoose.Schema(
  {
    //celrk authentication fields
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    profileImageUrl: {
      type: String,
      default: null,
    },
    // Instagram Integration
    instagram: {
      isConnected: {
        type: Boolean,
        default: false,
      },
      accountId: {
        type: String,
        default: null,
      },
      username: {
        type: String,
        default: null,
      },
      accountType: {
        type: String,
        enum: ["PERSONAL", "BUSINESS", "CREATOR"],
        default: null,
      },
      profilePicture: {
        type: String,
        default: null,
      },
      encryptedAccessToken: {
        type: String,
        default: null,
      },
      tokenExpiresAt: {
        type: Date,
        default: null,
      },
      permissions: [
        {
          type: String,
          enum: [
            "instagram_basic",
            "instagram_manage_comments",
            "instagram_manage_messages",
            "pages_show_list",
            "pages_read_engagement",
          ],
        },
      ],
      connectedAt: {
        type: Date,
        default: null,
      },
      lastTokenRefresh: {
        type: Date,
        default: null,
      },
    },
    theme: {
      type: String,
      enum: ["light", "dark", "auto"],
      default: "light",
    },
    language: {
      type: String,
      default: "en",
    },
    theme: {
      type: String,
      enum: ["light", "dark", "auto"],
      default: "light",
    },
    language: {
      type: String,
      default: "en",
    },
    // Subscription Information
    subscription: {
      plan: {
        type: String,
        enum: ["free", "basic", "pro", "enterprise"],
        default: "free",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "cancelled", "past_due"],
        default: "active",
      },
      expiresAt: {
        type: Date,
        default: null,
      },
      stripeCustomerId: {
        type: String,
        default: null,
      },
      subscriptionId: {
        type: String,
        default: null,
      },
    },
    usage: {
      messagesProcessed: {
        type: Number,
        default: 0,
      },
      flowsCreated: {
        type: Number,
        default: 0,
      },
      broadcastsSent: {
        type: Number,
        default: 0,
      },
      templatesUsed: {
        type: Number,
        default: 0,
      },
      lastActivityAt: {
        type: Date,
        default: Date.now,
      },
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: {
      type: Date,
      default: Date.now,
    },

    // Metadata
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: new Map(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        // Don't return sensitive fields
        delete ret.instagram?.encryptedAccessToken;
        delete ret.subscription?.stripeCustomerId;
        delete ret.subscription?.subscriptionId;
        return ret;
      },
    },
  }
);
