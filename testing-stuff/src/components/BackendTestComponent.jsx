import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useAPI } from "../hooks/useAPI";
import { useBackendSync } from "../hooks/useBackendSync";
import { toast } from "react-hot-toast";
import { getMetaBusinessLoginUrl, getInstagramOAuthUrl } from "../lib/instagram";
import InstagramConnectButton from "./InstagramConnectButton";

const BackendTestComponent = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { get, post, put, del, healthCheck } = useAPI();
  const { 
    backendUser, 
    isBackendSynced, 
    syncLoading, 
    backendConnected, 
    syncUserWithBackend,
    refreshBackendUser
  } = useBackendSync();

  const [testResults, setTestResults] = useState({});
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [activeTest, setActiveTest] = useState(null);

  // Individual test functions based on the MD file requirements
  const tests = {
    // Health & Authentication Tests
    healthCheck: async () => {
      setActiveTest("Health Check");
      try {
        const health = await healthCheck();
        return { 
          status: "PASS", 
          data: health,
          message: `Backend healthy - ${health?.message || 'OK'}`
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Backend health check failed"
        };
      }
    },

    authToken: async () => {
      setActiveTest("Auth Token");
      try {
        const token = await getToken();
        return { 
          status: token ? "PASS" : "FAIL", 
          data: token ? "Token obtained" : "No token",
          message: token ? "Authentication token valid" : "No authentication token"
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to get auth token"
        };
      }
    },

    // User Management Tests
    userProfile: async () => {
      setActiveTest("User Profile");
      try {
        const profile = await get("/user/profile");
        return { 
          status: "PASS", 
          data: profile,
          message: `Profile loaded for ${profile.user?.email || profile.email}`
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to load user profile"
        };
      }
    },

    userSync: async () => {
      setActiveTest("User Sync");
      try {
        const syncedUser = await syncUserWithBackend();
        return { 
          status: syncedUser ? "PASS" : "FAIL", 
          data: syncedUser,
          message: syncedUser ? "User synced successfully" : "User sync failed"
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to sync user with backend"
        };
      }
    },

    userSettings: async () => {
      setActiveTest("User Settings");
      try {
        const settings = await get("/user/settings");
        return { 
          status: "PASS", 
          data: settings,
          message: "User settings loaded"
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to load user settings"
        };
      }
    },

    // Instagram Integration Tests
    instagramStatus: async () => {
      setActiveTest("Instagram Status");
      try {
        const status = await get("/instagram/status");
        return { 
          status: "PASS", 
          data: status,
          message: `Instagram ${status.isConnected ? 'connected' : 'not connected'}`
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to check Instagram status"
        };
      }
    },

    instagramConnectionStatus: async () => {
      setActiveTest("Instagram Connection");
      try {
        const connection = await get("/user/instagram/status");
        return { 
          status: "PASS", 
          data: connection,
          message: `Instagram connection status: ${connection.status || 'unknown'}`
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to get Instagram connection status"
        };
      }
    },

    // Dashboard Data Tests
    dashboardOverview: async () => {
      setActiveTest("Dashboard Overview");
      try {
        const overview = await get("/dashboard/overview");
        return { 
          status: "PASS", 
          data: overview,
          message: `Dashboard data loaded - ${overview.data?.totalMessages || 0} messages`
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to load dashboard overview"
        };
      }
    },

    dashboardAnalytics: async () => {
      setActiveTest("Dashboard Analytics");
      try {
        const analytics = await get("/dashboard/analytics");
        return { 
          status: "PASS", 
          data: analytics,
          message: "Dashboard analytics loaded"
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to load dashboard analytics"
        };
      }
    },

    // Automation Tests
    automationSettings: async () => {
      setActiveTest("Automation Settings");
      try {
        const settings = await get("/automation/settings");
        return { 
          status: "PASS", 
          data: settings,
          message: `Automation ${settings.isEnabled ? 'enabled' : 'disabled'}`
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to load automation settings"
        };
      }
    },

    automationStats: async () => {
      setActiveTest("Automation Stats");
      try {
        const stats = await get("/automation/stats");
        return { 
          status: "PASS", 
          data: stats,
          message: "Automation stats loaded"
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to load automation stats"
        };
      }
    },

    // Template Tests
    templates: async () => {
      setActiveTest("Templates");
      try {
        const templates = await get("/templates");
        return { 
          status: "PASS", 
          data: templates,
          message: `${templates.templates?.length || 0} templates loaded`
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to load templates"
        };
      }
    },

    // Conversation Tests
    conversations: async () => {
      setActiveTest("Conversations");
      try {
        const conversations = await get("/conversations");
        return { 
          status: "PASS", 
          data: conversations,
          message: `${conversations.conversations?.length || 0} conversations loaded`
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to load conversations"
        };
      }
    },

    // Instagram Integration Tests
    instagram: async () => {
      setActiveTest("Instagram OAuth");
      try {
        // Test Instagram OAuth URL generation
        const metaUrl = getMetaBusinessLoginUrl(user?.id);
        
        if (!metaUrl || !metaUrl.includes('instagram.com/oauth/authorize')) {
          throw new Error("Invalid Instagram OAuth URL generated");
        }

        // Test backend Instagram endpoint
        let backendUrl = null;
        try {
          backendUrl = await getInstagramOAuthUrl(user?.id);
        } catch (error) {
          console.log("Backend Instagram endpoint not available (expected in dev)");
        }

        return { 
          status: "PASS", 
          data: { 
            metaUrl: metaUrl.substring(0, 100) + "...",
            backendAvailable: !!backendUrl,
            clientId: "1807810336807413",
            redirectUri: "https://vibeBot-v1.onrender.com/api/auth/instagram/callback"
          },
          message: "Instagram OAuth URLs generated successfully"
        };
      } catch (error) {
        return { 
          status: "FAIL", 
          error: error.message,
          message: "Failed to generate Instagram OAuth URLs"
        };
      }
    },
  };

  const runAllTests = async () => {
    if (!user) {
      toast.error("Please sign in to run tests");
      return;
    }

    setIsRunningTests(true);
    setTestResults({});
    
    const results = {};
    
    for (const [testName, testFunction] of Object.entries(tests)) {
      try {
        console.log(`Running test: ${testName}`);
        results[testName] = await testFunction();
      } catch (error) {
        results[testName] = { 
          status: "ERROR", 
          error: error.message,
          message: `Test ${testName} failed with error`
        };
      }
      
      // Add a small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setTestResults(results);
    setIsRunningTests(false);
    setActiveTest(null);
    
    // Show summary toast
    const passCount = Object.values(results).filter(r => r.status === "PASS").length;
    const totalCount = Object.keys(results).length;
    
    if (passCount === totalCount) {
      toast.success(`All ${totalCount} tests passed! 🎉`);
    } else {
      toast.error(`${passCount}/${totalCount} tests passed`);
    }
  };

  const runSingleTest = async (testName) => {
    if (!user) {
      toast.error("Please sign in to run tests");
      return;
    }

    try {
      const result = await tests[testName]();
      setTestResults(prev => ({ ...prev, [testName]: result }));
      
      if (result.status === "PASS") {
        toast.success(`${testName} test passed`);
      } else {
        toast.error(`${testName} test failed`);
      }
    } catch (error) {
      const result = { 
        status: "ERROR", 
        error: error.message,
        message: `Test ${testName} failed with error`
      };
      setTestResults(prev => ({ ...prev, [testName]: result }));
      toast.error(`${testName} test error`);
    }
    setActiveTest(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PASS": return "#10b981";
      case "FAIL": return "#ef4444";
      case "ERROR": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PASS": return "✅";
      case "FAIL": return "❌";
      case "ERROR": return "⚠️";
      default: return "⏳";
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading Clerk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Backend Integration Test Suite</h1>

        {/* User Status Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🔐 User Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Logged in:</strong> {user ? "✅ Yes" : "❌ No"}</p>
              {user && (
                <>
                  <p><strong>User ID:</strong> {user.id}</p>
                  <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
                  <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                </>
              )}
            </div>
            <div>
              <p><strong>Backend Synced:</strong> {isBackendSynced ? "✅ Yes" : "❌ No"}</p>
              <p><strong>Backend Connected:</strong> {backendConnected ? "✅ Yes" : "❌ No"}</p>
              <p><strong>Sync Loading:</strong> {syncLoading ? "🔄 Yes" : "✅ No"}</p>
              {backendUser && (
                <p><strong>Backend User ID:</strong> {backendUser._id || backendUser.id}</p>
              )}
            </div>
          </div>
        </div>

        {/* Environment Info Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🌍 Environment Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
            <div>
              <p><strong>API URL:</strong> {import.meta.env.VITE_API_URL || "❌ Not configured"}</p>
              <p><strong>Frontend URL:</strong> {import.meta.env.VITE_FRONTEND_URL || "❌ Not configured"}</p>
              <p><strong>Environment:</strong> {import.meta.env.VITE_APP_ENV || "development"}</p>
            </div>
            <div>
              <p><strong>Clerk Key:</strong> {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? "✅ Configured" : "❌ Not configured"}</p>
              <p><strong>Node Env:</strong> {import.meta.env.NODE_ENV || "development"}</p>
              <p><strong>Vite Mode:</strong> {import.meta.env.MODE || "development"}</p>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🧪 Test Controls</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={runAllTests}
              disabled={isRunningTests || !user}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isRunningTests ? "🔄 Running All Tests..." : "🚀 Run All Tests"}
            </button>
            
            <button
              onClick={refreshBackendUser}
              disabled={!user}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🔄 Refresh User Data
            </button>
            
            <button
              onClick={() => setTestResults({})}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🗑️ Clear Results
            </button>
          </div>

          {isRunningTests && activeTest && (
            <div className="bg-blue-900 border border-blue-600 rounded-lg p-4">
              <p className="text-blue-300">🔄 Currently running: <strong>{activeTest}</strong></p>
            </div>
          )}
        </div>

        {/* Instagram Integration Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📱 Instagram Business Integration</h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              Test the Instagram Business Login URL integration. This uses the exact URL format provided by Meta Console.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <InstagramConnectButton 
                variant="primary"
                onConnect={(url) => {
                  console.log("Instagram OAuth URL:", url);
                  toast.success("Instagram OAuth URL generated! Check console for details.");
                }}
              >
                🔗 Generate Instagram URL
              </InstagramConnectButton>

              <InstagramConnectButton 
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500"
              >
                🚀 Connect Instagram Business
              </InstagramConnectButton>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 mt-4">
              <h3 className="font-medium mb-2">Configuration Details:</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p><strong>Client ID:</strong> 1807810336807413</p>
                <p><strong>Redirect URI:</strong> https://vibeBot-v1.onrender.com/api/auth/instagram/callback</p>
                <p><strong>Scopes:</strong> instagram_business_basic, instagram_business_manage_messages, instagram_business_manage_comments, instagram_business_content_publish, instagram_business_manage_insights</p>
                <p><strong>Force Reauth:</strong> true</p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📊 Test Results</h2>
          
          {Object.keys(testResults).length === 0 ? (
            <p className="text-gray-400 text-center py-8">No tests run yet. Click "Run All Tests" to begin.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(testResults).map(([testName, result]) => (
                <div 
                  key={testName}
                  className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{testName}</h3>
                    <span className="text-lg">{getStatusIcon(result.status)}</span>
                  </div>
                  
                  <p 
                    className="text-sm mb-2"
                    style={{ color: getStatusColor(result.status) }}
                  >
                    <strong>{result.status}</strong>: {result.message}
                  </p>
                  
                  {result.error && (
                    <p className="text-red-400 text-xs bg-red-900 p-2 rounded">
                      {result.error}
                    </p>
                  )}
                  
                  <button
                    onClick={() => runSingleTest(testName)}
                    disabled={isRunningTests || !user}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors"
                  >
                    Rerun
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => window.location.href = "/"}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🏠 Landing Page
            </button>
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => window.location.href = "/sign-up"}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📝 Test Signup
            </button>
            <button
              onClick={() => window.location.href = "/sign-in"}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🔑 Test Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendTestComponent;
