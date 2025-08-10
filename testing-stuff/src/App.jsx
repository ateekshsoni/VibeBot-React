import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardWrapper from "./components/DashboardWrapper";
import BackendTestComponent from "./components/BackendTestComponent";

// Pages
import LandingPage from "./pages/LandingPage";
import ClerkLoginPage from "./pages/auth/ClerkLoginPage";
import ClerkSignupPage from "./pages/auth/ClerkSignupPage";
import DashboardOverview from "./pages/DashboardOverview";
import AutomationPage from "./pages/AutomationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import TestPage from "./pages/TestPage";
import InstagramCallback from "./pages/InstagramCallback";
import SchemaVisualizerPage from "./pages/SchemaVisualizerPage";
import ProjectDocumentationPage from "./pages/ProjectDocumentationPage";

// Import Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error(
    "Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file"
  );
}

// Environment-based configuration
const isProduction = import.meta.env.VITE_APP_ENV === "production";
const frontendUrl =
  import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

// Warn about test environment in production
if (clerkPubKey.includes("test") && isProduction) {
  console.warn(
    "⚠️ Warning: Using development Clerk keys in production environment"
  );
  console.warn(
    "Please update to production keys in your environment variables"
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-8 text-center text-white max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-red-400">
              Something went wrong
            </h2>
            <p className="mb-6 text-gray-300">
              An unexpected error occurred. Please refresh the page or try again
              later.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ClerkProvider
        publishableKey={clerkPubKey}
        domain={isProduction ? frontendUrl.replace("https://", "") : undefined}
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      >
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />

              <Route
                path="/sign-in"
                element={
                  <PublicRoute>
                    <ClerkLoginPage />
                  </PublicRoute>
                }
              />

              <Route
                path="/sign-up"
                element={
                  <PublicRoute>
                    <ClerkSignupPage />
                  </PublicRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <ClerkSignupPage />
                  </PublicRoute>
                }
              />

              {/* Legacy route */}
              <Route
                path="/login"
                element={<Navigate to="/sign-in" replace />}
              />

              {/* Backend Test Route (public for testing) */}
              <Route path="/backend-test" element={<BackendTestComponent />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <DashboardOverview />
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/automation"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <AutomationPage />
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <AnalyticsPage />
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/test"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <TestPage />
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/schema"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <SchemaVisualizerPage />
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/project-docs"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <ProjectDocumentationPage />
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/instagram/callback"
                element={
                  <ProtectedRoute>
                    <InstagramCallback />
                  </ProtectedRoute>
                }
              />

              {/* Placeholder Protected Routes */}
              <Route
                path="/posts"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold mb-4">
                          Posts Management
                        </h2>
                        <p className="text-gray-600">
                          Posts page coming soon...
                        </p>
                      </div>
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/webhooks"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold mb-4">
                          Webhooks Configuration
                        </h2>
                        <p className="text-gray-600">
                          Webhooks page coming soon...
                        </p>
                      </div>
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <DashboardWrapper>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold mb-4">
                          Account Settings
                        </h2>
                        <p className="text-gray-600">
                          Settings page coming soon...
                        </p>
                      </div>
                    </DashboardWrapper>
                  </ProtectedRoute>
                }
              />

              {/* Catch all route - redirect based on authentication */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#374151",
                color: "#fff",
                borderRadius: "8px",
              },
              success: {
                style: {
                  background: "#10B981",
                },
              },
              error: {
                style: {
                  background: "#EF4444",
                },
              },
            }}
          />
        </Router>
      </ClerkProvider>
    </ErrorBoundary>
  );
}

export default App;
