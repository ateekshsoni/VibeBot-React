import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAPI } from "../hooks/useAPI";
import { useBackendSync } from "../hooks/useBackendSync";

const BackendTestComponent = () => {
  const { user, isLoaded } = useUser();
  const { makeRequest, isHealthy, error: apiError } = useAPI();
  const { isBackendSynced, syncWithBackend, syncError } = useBackendSync();

  const [testResults, setTestResults] = useState({});
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runTests = async () => {
    setIsRunningTests(true);
    const results = {};

    try {
      // Test 1: Backend Health Check
      console.log("Testing backend health...");
      results.healthCheck = isHealthy ? "PASS" : "FAIL";

      // Test 2: Authentication Token Check
      console.log("Testing authentication...");
      if (user) {
        try {
          const token = await user.getToken();
          results.authToken = token ? "PASS" : "FAIL";
        } catch (error) {
          results.authToken = "FAIL - " + error.message;
        }
      } else {
        results.authToken = "SKIP - No user logged in";
      }

      // Test 3: Backend Sync Check
      console.log("Testing backend sync...");
      results.backendSync = isBackendSynced ? "PASS" : "PENDING";

      // Test 4: API Request Test
      console.log("Testing API request...");
      try {
        const response = await makeRequest("/health");
        results.apiRequest = response ? "PASS" : "FAIL";
      } catch (error) {
        results.apiRequest = "FAIL - " + error.message;
      }

      // Test 5: User Data Sync
      console.log("Testing user data sync...");
      if (user) {
        try {
          await syncWithBackend();
          results.userSync = syncError ? "FAIL - " + syncError : "PASS";
        } catch (error) {
          results.userSync = "FAIL - " + error.message;
        }
      } else {
        results.userSync = "SKIP - No user logged in";
      }
    } catch (error) {
      console.error("Test error:", error);
      results.error = error.message;
    }

    setTestResults(results);
    setIsRunningTests(false);
  };

  useEffect(() => {
    if (isLoaded) {
      runTests();
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div style={{ padding: "20px", color: "white" }}>Loading Clerk...</div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1f2937",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Backend Integration Test Results
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>User Status:</h2>
        <p>Logged in: {user ? "Yes" : "No"}</p>
        {user && (
          <div>
            <p>User ID: {user.id}</p>
            <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Test Results:
        </h2>
        <button
          onClick={runTests}
          disabled={isRunningTests}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          {isRunningTests ? "Running Tests..." : "Run Tests"}
        </button>

        <div
          style={{
            backgroundColor: "#374151",
            padding: "15px",
            borderRadius: "8px",
            fontFamily: "monospace",
          }}
        >
          {Object.entries(testResults).map(([test, result]) => (
            <div key={test} style={{ marginBottom: "5px" }}>
              <span
                style={{
                  color: result.includes("PASS")
                    ? "#10b981"
                    : result.includes("FAIL")
                    ? "#ef4444"
                    : result.includes("SKIP")
                    ? "#f59e0b"
                    : "#6b7280",
                }}
              >
                {test}: {result}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Environment Info:
        </h2>
        <div
          style={{
            backgroundColor: "#374151",
            padding: "15px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          <p>API URL: {import.meta.env.VITE_API_URL || "Not configured"}</p>
          <p>
            Clerk Publishable Key:{" "}
            {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
              ? "Configured"
              : "Not configured"}
          </p>
          <p>Backend Health: {isHealthy ? "Healthy" : "Unhealthy"}</p>
          <p>Backend Sync: {isBackendSynced ? "Synced" : "Not synced"}</p>
          {apiError && (
            <p style={{ color: "#ef4444" }}>API Error: {apiError}</p>
          )}
          {syncError && (
            <p style={{ color: "#ef4444" }}>Sync Error: {syncError}</p>
          )}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Quick Actions:
        </h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              backgroundColor: "#6b7280",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go to Landing
          </button>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            style={{
              backgroundColor: "#059669",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => (window.location.href = "/signup")}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Test Signup
          </button>
          <button
            onClick={() => (window.location.href = "/sign-in")}
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Test Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackendTestComponent;
