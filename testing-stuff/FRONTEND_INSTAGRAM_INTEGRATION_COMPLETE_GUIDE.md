# 🚀 Instagram Integration & Automation - Frontend Implementation Guide

## 📋 Overview

Instagram OAuth is now **100% functional**. Users can connect their Instagram Business accounts and set up comment-to-DM automation. This guide covers all frontend implementations needed.

---

## 🔌 1. Instagram Connection Status & User Details

### API Endpoint: Get Instagram Status

```javascript
GET /api/instagram/status
Authorization: Bearer <clerk-jwt-token>
```

### Response Examples:

**Not Connected (296 bytes):**

```json
{
  "connected": false,
  "message": "Instagram account not connected"
}
```

**Connected (663 bytes):**

```json
{
  "connected": true,
  "account": {
    "id": "30607678362213777",
    "username": "wearedevstrome",
    "accountType": "BUSINESS",
    "profilePicture": null,
    "followersCount": null,
    "followingCount": null,
    "mediaCount": null
  },
  "permissions": [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_content_publish",
    "instagram_business_manage_insights",
    "instagram_business_manage_comments"
  ],
  "connectedAt": "2025-08-11T12:03:35.000Z",
  "tokenExpiresAt": "2025-10-09T16:39:25.000Z"
}
```

### Frontend Implementation:

```tsx
// Instagram Connection Component
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const InstagramConnection = () => {
  const { getToken } = useAuth();
  const [instagramStatus, setInstagramStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInstagramStatus = async () => {
    try {
      const token = await getToken();
      const response = await fetch("/api/instagram/status", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setInstagramStatus(data);
    } catch (error) {
      console.error("Failed to fetch Instagram status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramStatus();
  }, []);

  const handleConnectInstagram = () => {
    // Redirect to Instagram OAuth
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/instagram`;
  };

  const handleDisconnectInstagram = async () => {
    try {
      const token = await getToken();
      await fetch("/api/instagram/disconnect", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setInstagramStatus({ connected: false });
    } catch (error) {
      console.error("Failed to disconnect Instagram:", error);
    }
  };

  if (loading) return <div>Loading Instagram status...</div>;

  return (
    <div className="instagram-connection-card">
      {!instagramStatus?.connected ? (
        <div className="not-connected">
          <h3>Connect Your Instagram Business Account</h3>
          <p>
            Connect your Instagram Business account to enable comment-to-DM
            automation
          </p>
          <button onClick={handleConnectInstagram} className="connect-btn">
            Connect Instagram
          </button>
        </div>
      ) : (
        <div className="connected">
          <div className="account-info">
            <img
              src={
                instagramStatus.account.profilePicture || "/default-avatar.png"
              }
              alt="Profile"
              className="profile-pic"
            />
            <div className="account-details">
              <h3>@{instagramStatus.account.username}</h3>
              <p className="account-type">
                {instagramStatus.account.accountType} Account
              </p>
              <p className="connected-date">
                Connected on{" "}
                {new Date(instagramStatus.connectedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="account-stats">
            <div className="stat">
              <span className="label">Followers:</span>
              <span className="value">
                {instagramStatus.account.followersCount || "N/A"}
              </span>
            </div>
            <div className="stat">
              <span className="label">Following:</span>
              <span className="value">
                {instagramStatus.account.followingCount || "N/A"}
              </span>
            </div>
            <div className="stat">
              <span className="label">Posts:</span>
              <span className="value">
                {instagramStatus.account.mediaCount || "N/A"}
              </span>
            </div>
          </div>

          <div className="permissions">
            <h4>Granted Permissions:</h4>
            <ul>
              {instagramStatus.permissions.map((permission) => (
                <li key={permission}>
                  {permission
                    .replace("instagram_business_", "")
                    .replace("_", " ")}
                </li>
              ))}
            </ul>
          </div>

          <div className="token-info">
            <p className="token-expiry">
              Token expires:{" "}
              {new Date(instagramStatus.tokenExpiresAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={handleDisconnectInstagram}
            className="disconnect-btn"
          >
            Disconnect Instagram
          </button>
        </div>
      )}
    </div>
  );
};
```

---

## 🤖 2. Automation Setup & Management

### API Endpoints for Automation:

#### Get User Profile (includes automation settings)

```javascript
GET /api/user/profile
Authorization: Bearer <clerk-jwt-token>
```

#### Update Automation Settings

```javascript
PUT /api/user/automation
Authorization: Bearer <clerk-jwt-token>
Content-Type: application/json

{
  "keywords": ["hello", "info", "dm me"],
  "dmTemplate": "Hi there! Thanks for your comment. Check out our latest offers!",
  "successMessage": "Thanks! Check your DMs! 📩",
  "failureMessage": "Something went wrong! Please try again. 🔄",
  "isEnabled": true,
  "rateLimiting": {
    "maxDMsPerHour": 10,
    "maxDMsPerDay": 50,
    "delayBetweenDMs": 30
  },
  "options": {
    "matchType": "contains", // or "exact"
    "caseSensitive": false
  }
}
```

#### Toggle Automation

```javascript
POST /api/user/automation/toggle
Authorization: Bearer <clerk-jwt-token>
Content-Type: application/json

{
  "enabled": true // or false
}
```

### Frontend Implementation:

```tsx
// Automation Settings Component
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const AutomationSettings = () => {
  const { getToken } = useAuth();
  const [settings, setSettings] = useState({
    keywords: [],
    dmTemplate: "",
    successMessage: "Thanks! Check your DMs! 📩",
    failureMessage: "Something went wrong! Please try again. 🔄",
    isEnabled: false,
    rateLimiting: {
      maxDMsPerHour: 10,
      maxDMsPerDay: 50,
      delayBetweenDMs: 30,
    },
    options: {
      matchType: "contains",
      caseSensitive: false,
    },
  });
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [saving, setSaving] = useState(false);

  // Check if Instagram is connected and get current settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = await getToken();

        // Get Instagram status
        const instagramResponse = await fetch("/api/instagram/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const instagramData = await instagramResponse.json();
        setInstagramConnected(instagramData.connected);

        // Get user profile with automation settings
        const profileResponse = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileData = await profileResponse.json();

        if (profileData.automationSettings) {
          setSettings((prev) => ({
            ...prev,
            ...profileData.automationSettings,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const saveSettings = async () => {
    if (!instagramConnected) {
      alert("Please connect your Instagram account first");
      return;
    }

    setSaving(true);
    try {
      const token = await getToken();
      await fetch("/api/user/automation", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleAutomation = async () => {
    if (!instagramConnected) {
      alert("Please connect your Instagram account first");
      return;
    }

    if (!settings.keywords.length || !settings.dmTemplate.trim()) {
      alert("Please set up keywords and DM template first");
      return;
    }

    try {
      const token = await getToken();
      await fetch("/api/user/automation/toggle", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled: !settings.isEnabled }),
      });

      setSettings((prev) => ({ ...prev, isEnabled: !prev.isEnabled }));
    } catch (error) {
      console.error("Failed to toggle automation:", error);
    }
  };

  const addKeyword = (keyword) => {
    if (keyword.trim() && !settings.keywords.includes(keyword.trim())) {
      setSettings((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()],
      }));
    }
  };

  const removeKeyword = (index) => {
    setSettings((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="automation-settings">
      <div className="header">
        <h2>Comment-to-DM Automation</h2>
        <div className="status">
          {instagramConnected ? (
            <span className="connected">✅ Instagram Connected</span>
          ) : (
            <span className="not-connected">❌ Instagram Not Connected</span>
          )}
          <span
            className={`automation-status ${
              settings.isEnabled ? "enabled" : "disabled"
            }`}
          >
            {settings.isEnabled ? "🟢 Automation ON" : "🔴 Automation OFF"}
          </span>
        </div>
      </div>

      {!instagramConnected && (
        <div className="warning">
          <p>
            ⚠️ Please connect your Instagram Business account first to use
            automation features.
          </p>
        </div>
      )}

      {/* Keywords Section */}
      <div className="section">
        <h3>Trigger Keywords</h3>
        <p>
          When users comment these keywords, they'll automatically receive a DM
        </p>

        <div className="keywords-input">
          <input
            type="text"
            placeholder="Enter a keyword..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addKeyword(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <button
            onClick={(e) => {
              const input = e.target.previousElementSibling;
              addKeyword(input.value);
              input.value = "";
            }}
          >
            Add Keyword
          </button>
        </div>

        <div className="keywords-list">
          {settings.keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
              <button onClick={() => removeKeyword(index)}>×</button>
            </span>
          ))}
        </div>

        <div className="keyword-options">
          <label>
            <input
              type="radio"
              name="matchType"
              value="contains"
              checked={settings.options.matchType === "contains"}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  options: { ...prev.options, matchType: e.target.value },
                }))
              }
            />
            Contains keyword (flexible matching)
          </label>
          <label>
            <input
              type="radio"
              name="matchType"
              value="exact"
              checked={settings.options.matchType === "exact"}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  options: { ...prev.options, matchType: e.target.value },
                }))
              }
            />
            Exact keyword match
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.options.caseSensitive}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  options: { ...prev.options, caseSensitive: e.target.checked },
                }))
              }
            />
            Case sensitive matching
          </label>
        </div>
      </div>

      {/* DM Template Section */}
      <div className="section">
        <h3>DM Message Template</h3>
        <p>
          This message will be sent automatically to users who comment trigger
          keywords
        </p>
        <textarea
          value={settings.dmTemplate}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, dmTemplate: e.target.value }))
          }
          placeholder="Hi there! Thanks for your interest. Here's what you're looking for..."
          maxLength={1000}
          rows={4}
        />
        <p className="char-count">
          {settings.dmTemplate.length}/1000 characters
        </p>
      </div>

      {/* Comment Replies Section */}
      <div className="section">
        <h3>Comment Replies</h3>
        <div className="reply-messages">
          <div className="message-input">
            <label>Success Message (shown when DM sent successfully):</label>
            <input
              type="text"
              value={settings.successMessage}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  successMessage: e.target.value,
                }))
              }
              maxLength={200}
            />
          </div>
          <div className="message-input">
            <label>Failure Message (shown when DM fails):</label>
            <input
              type="text"
              value={settings.failureMessage}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  failureMessage: e.target.value,
                }))
              }
              maxLength={200}
            />
          </div>
        </div>
      </div>

      {/* Rate Limiting Section */}
      <div className="section">
        <h3>Rate Limiting (Safety Settings)</h3>
        <div className="rate-limits">
          <div className="limit-input">
            <label>Max DMs per hour:</label>
            <input
              type="number"
              min="1"
              max="50"
              value={settings.rateLimiting.maxDMsPerHour}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  rateLimiting: {
                    ...prev.rateLimiting,
                    maxDMsPerHour: parseInt(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="limit-input">
            <label>Max DMs per day:</label>
            <input
              type="number"
              min="1"
              max="200"
              value={settings.rateLimiting.maxDMsPerDay}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  rateLimiting: {
                    ...prev.rateLimiting,
                    maxDMsPerDay: parseInt(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="limit-input">
            <label>Delay between DMs (seconds):</label>
            <input
              type="number"
              min="10"
              max="300"
              value={settings.rateLimiting.delayBetweenDMs}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  rateLimiting: {
                    ...prev.rateLimiting,
                    delayBetweenDMs: parseInt(e.target.value),
                  },
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button
          onClick={saveSettings}
          disabled={saving || !instagramConnected}
          className="save-btn"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

        <button
          onClick={toggleAutomation}
          disabled={
            !instagramConnected ||
            !settings.keywords.length ||
            !settings.dmTemplate.trim()
          }
          className={`toggle-btn ${settings.isEnabled ? "disable" : "enable"}`}
        >
          {settings.isEnabled ? "Disable Automation" : "Enable Automation"}
        </button>
      </div>

      {/* Setup Progress */}
      <div className="setup-progress">
        <h4>Setup Progress:</h4>
        <div className="progress-steps">
          <div
            className={`step ${instagramConnected ? "completed" : "pending"}`}
          >
            {instagramConnected ? "✅" : "⏳"} Instagram Connected
          </div>
          <div
            className={`step ${
              settings.keywords.length > 0 ? "completed" : "pending"
            }`}
          >
            {settings.keywords.length > 0 ? "✅" : "⏳"} Keywords Added
          </div>
          <div
            className={`step ${
              settings.dmTemplate.trim() ? "completed" : "pending"
            }`}
          >
            {settings.dmTemplate.trim() ? "✅" : "⏳"} DM Template Created
          </div>
          <div
            className={`step ${settings.isEnabled ? "completed" : "pending"}`}
          >
            {settings.isEnabled ? "✅" : "⏳"} Automation Enabled
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 📊 3. Analytics & Monitoring

### API Endpoints:

#### Get Automation Analytics

```javascript
GET /api/user/analytics
Authorization: Bearer <clerk-jwt-token>
```

#### Get Automation History

```javascript
GET /api/user/automation/history?limit=50&offset=0
Authorization: Bearer <clerk-jwt-token>
```

### Analytics Response:

```json
{
  "totalTriggers": 45,
  "successfulDMs": 42,
  "failedDMs": 3,
  "successRate": 93.3,
  "lastTriggeredAt": "2025-08-11T10:30:00Z",
  "todayStats": {
    "triggers": 12,
    "successfulDMs": 11,
    "failedDMs": 1
  },
  "weeklyStats": {
    "triggers": 45,
    "successfulDMs": 42,
    "failedDMs": 3
  }
}
```

### Frontend Implementation:

```tsx
// Analytics Dashboard Component
const AutomationAnalytics = () => {
  const { getToken } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = await getToken();

        const analyticsResponse = await fetch("/api/user/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData);

        const historyResponse = await fetch("/api/user/automation/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const historyData = await historyResponse.json();
        setHistory(historyData.history || []);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) return <div>Loading analytics...</div>;

  return (
    <div className="automation-analytics">
      <h2>Automation Performance</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Triggers</h3>
          <p className="stat-number">{analytics.totalTriggers}</p>
        </div>
        <div className="stat-card">
          <h3>Successful DMs</h3>
          <p className="stat-number success">{analytics.successfulDMs}</p>
        </div>
        <div className="stat-card">
          <h3>Failed DMs</h3>
          <p className="stat-number error">{analytics.failedDMs}</p>
        </div>
        <div className="stat-card">
          <h3>Success Rate</h3>
          <p className="stat-number">{analytics.successRate}%</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        {history.length > 0 ? (
          <ul>
            {history.slice(0, 10).map((item, index) => (
              <li key={index} className={`activity-item ${item.status}`}>
                <span className="timestamp">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                <span className="action">{item.action}</span>
                <span className="status">{item.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No automation activity yet. Enable automation to see results here.
          </p>
        )}
      </div>
    </div>
  );
};
```

---

## 🎨 4. Recommended UI/UX Flow

### Dashboard Layout:

1. **Instagram Connection Card** (top priority)
2. **Automation Setup Wizard** (if Instagram connected)
3. **Quick Stats Overview**
4. **Recent Activity Feed**

### Step-by-Step User Journey:

1. User sees "Connect Instagram" prompt
2. Clicks connect → OAuth flow → Returns to dashboard
3. Instagram account details displayed
4. Automation setup wizard appears
5. User sets keywords → DM template → Enables automation
6. Analytics start showing real-time data

### Error Handling:

- Show clear error messages for failed connections
- Validate automation settings before enabling
- Display token expiry warnings (60 days)
- Handle rate limit notifications

---

## 🔧 5. Environment Variables for Frontend

```env
NEXT_PUBLIC_API_URL=https://vibeBot-v1.onrender.com
NEXT_PUBLIC_FRONTEND_URL=https://vibebot.netlify.app
```

---

## 🚨 6. Important Notes

### Backend Endpoints Ready:

- ✅ `/api/instagram/status` - Get connection status
- ✅ `/api/auth/instagram` - Start OAuth flow
- ✅ `/api/auth/instagram/callback` - OAuth callback (handled automatically)
- ✅ `/api/user/profile` - Get user data including automation settings
- 🔄 `/api/user/automation` - Update automation settings (needs implementation)
- 🔄 `/api/user/automation/toggle` - Toggle automation on/off (needs implementation)
- 🔄 `/api/user/automation/history` - Get automation history (needs implementation)
- 🔄 `/api/instagram/disconnect` - Disconnect Instagram (needs implementation)

### Backend Still Needs:

1. Automation settings CRUD endpoints
2. Analytics/stats endpoints
3. Disconnect Instagram endpoint
4. Automation history tracking

### Frontend Priorities:

1. **HIGH**: Instagram connection status display
2. **HIGH**: Basic automation setup (keywords + DM template)
3. **MEDIUM**: Analytics dashboard
4. **LOW**: Advanced rate limiting controls

---

## 🎯 Next Steps for Backend Team

1. **Create automation CRUD endpoints** in `/api/user/automation`
2. **Add analytics endpoints** for stats and history
3. **Implement automation engine** for webhook processing
4. **Add disconnect functionality**

The Instagram OAuth foundation is solid - now we build the automation features on top! 🚀
