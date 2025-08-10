import React, { useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { useBackendSync } from "../hooks/useBackendSync";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const BackendTestPanel = () => {
  const { get, post } = useAPI();
  const {
    backendUser,
    isBackendSynced,
    backendConnected,
    syncLoading,
    checkBackendHealth,
    syncUserWithBackend,
  } = useBackendSync();

  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState(false);

  const runTest = async (testName, testFn) => {
    setTestResults((prev) => ({ ...prev, [testName]: { status: "running" } }));

    try {
      const result = await testFn();
      setTestResults((prev) => ({
        ...prev,
        [testName]: {
          status: "success",
          data: result,
          timestamp: new Date().toISOString(),
        },
      }));
      return true;
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [testName]: {
          status: "error",
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      }));
      return false;
    }
  };

  const runAllTests = async () => {
    setTesting(true);
    toast.info("Running backend integration tests...");

    const tests = [
      {
        name: "health",
        label: "Backend Health Check",
        fn: () => checkBackendHealth(),
      },
      {
        name: "auth",
        label: "Authentication Status",
        fn: () => get("/auth/me"),
      },
      {
        name: "userProfile",
        label: "User Profile",
        fn: () => get("/user/profile"),
      },
      {
        name: "instagramStatus",
        label: "Instagram Status",
        fn: () => get("/instagram/status"),
      },
      {
        name: "dashboardOverview",
        label: "Dashboard Overview",
        fn: () => get("/dashboard/overview"),
      },
      {
        name: "userAnalytics",
        label: "User Analytics",
        fn: () => get("/user/analytics"),
      },
    ];

    let successCount = 0;
    for (const test of tests) {
      const success = await runTest(test.name, test.fn);
      if (success) successCount++;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Brief delay between tests
    }

    setTesting(false);

    if (successCount === tests.length) {
      toast.success(`All ${tests.length} tests passed! 🎉`);
    } else {
      toast.warning(`${successCount}/${tests.length} tests passed`);
    }
  };

  const TestResult = ({ testKey, label }) => {
    const result = testResults[testKey];

    if (!result) {
      return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-xs text-gray-500">Not tested</span>
        </div>
      );
    }

    return (
      <div className="p-3 bg-white border rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="flex items-center space-x-2">
            {result.status === "running" && (
              <ArrowPathIcon className="w-4 h-4 text-blue-500 animate-spin" />
            )}
            {result.status === "success" && (
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
            )}
            {result.status === "error" && (
              <XCircleIcon className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-xs font-medium ${
                result.status === "success"
                  ? "text-green-600"
                  : result.status === "error"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {result.status}
            </span>
          </div>
        </div>

        {result.timestamp && (
          <div className="text-xs text-gray-500 mt-1">
            {new Date(result.timestamp).toLocaleTimeString()}
          </div>
        )}

        {result.error && (
          <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
            {result.error}
          </div>
        )}

        {result.data && result.status === "success" && (
          <details className="mt-2">
            <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-800">
              View response data
            </summary>
            <pre className="mt-1 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Backend Integration Tests
            </h2>
            <p className="text-gray-600 mt-1">
              Test your connection to the VibeBot backend API
            </p>
          </div>
          <button
            onClick={runAllTests}
            disabled={testing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            {testing ? (
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircleIcon className="w-4 h-4" />
            )}
            <span>{testing ? "Testing..." : "Run All Tests"}</span>
          </button>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Backend Connection
              </span>
              <div
                className={`w-3 h-3 rounded-full ${
                  backendConnected ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </div>
            <span className="text-xs text-gray-500">
              {backendConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                User Sync
              </span>
              <div
                className={`w-3 h-3 rounded-full ${
                  isBackendSynced
                    ? "bg-green-500"
                    : syncLoading
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></div>
            </div>
            <span className="text-xs text-gray-500">
              {isBackendSynced
                ? "Synced"
                : syncLoading
                ? "Syncing..."
                : "Not synced"}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">User ID</span>
            </div>
            <span className="text-xs text-gray-500 truncate">
              {backendUser?.clerkId || "Not available"}
            </span>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            API Endpoint Tests
          </h3>

          <TestResult testKey="health" label="Backend Health Check" />
          <TestResult testKey="auth" label="Authentication Status" />
          <TestResult testKey="userProfile" label="User Profile Endpoint" />
          <TestResult
            testKey="instagramStatus"
            label="Instagram Status Endpoint"
          />
          <TestResult
            testKey="dashboardOverview"
            label="Dashboard Overview Endpoint"
          />
          <TestResult testKey="userAnalytics" label="User Analytics Endpoint" />
        </div>

        {/* Manual Actions */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Manual Actions
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={checkBackendHealth}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              Check Health
            </button>
            <button
              onClick={syncUserWithBackend}
              disabled={syncLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded text-sm"
            >
              {syncLoading ? "Syncing..." : "Sync User"}
            </button>
          </div>
        </div>

        {/* Environment Info */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Environment Configuration
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">API URL:</span>
                <span className="text-gray-600 ml-2">
                  {import.meta.env.VITE_API_URL}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Environment:</span>
                <span className="text-gray-600 ml-2">
                  {import.meta.env.VITE_APP_ENV}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Frontend URL:</span>
                <span className="text-gray-600 ml-2">
                  {import.meta.env.VITE_FRONTEND_URL}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Clerk Key:</span>
                <span className="text-gray-600 ml-2">
                  {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
                    ? "✅ Configured"
                    : "❌ Missing"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendTestPanel;
