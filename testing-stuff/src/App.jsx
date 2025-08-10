import React from "react";
import ClerkSignupPage from "./pages/auth/ClerkSignupPage";
import ClerkLoginPage from "./pages/auth/ClerkLoginPage";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import AutomationPage from "./pages/AutomationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LandingPage from "./pages/LandingPage";
import TestPage from "./pages/TestPage";
import InstagramCallback from "./pages/InstagramCallback";
import SchemaVisualizerPage from "./pages/SchemaVisualizerPage";
import ProjectDocumentationPage from "./pages/ProjectDocumentationPage";
import BackendTestComponent from "./components/BackendTestComponent";

// Import Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error(
    "Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file"
  );
}

// Environment-based configuration
const isProduction = import.meta.env.VITE_APP_ENV === "production";
const frontendUrl = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

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
            <h2 className="text-2xl font-bold mb-4 text-red-400">Something went wrong</h2>
            <p className="mb-6 text-gray-300">
              An unexpected error occurred. Please refresh the page or try again later.
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
        navigate={(to) => (window.location.href = to)}
        domain={isProduction ? frontendUrl.replace("https://", "") : undefined}
        signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL || "/sign-in"}
        signUpUrl={import.meta.env.VITE_CLERK_SIGN_UP_URL || "/sign-up"}
        afterSignInUrl={
          import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL || "/dashboard"
        }
        afterSignUpUrl={
          import.meta.env.VITE_CLERK_AFTER_SIGN_UP_URL || "/dashboard"
        }
      >
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              {/* Landing Page Route */}
              <Route path="/" element={<LandingPage />} />

              {/* Public Routes */}
              <Route path="/sign-in" element={<ClerkLoginPage />} />
              <Route path="/sign-up" element={<ClerkSignupPage />} />
              <Route path="/signup" element={<ClerkSignupPage />} />

              {/* Backend Test Route */}
              <Route path="/backend-test" element={<BackendTestComponent />} />

              {/* Legacy routes for backward compatibility */}
              <Route path="/login" element={<Navigate to="/sign-in" replace />} />

              {/* Instagram OAuth Callback - Can be accessed by authenticated users */}
              <Route
                path="/instagram/callback"
                element={
                  <>
                    <SignedIn>
                      <InstagramCallback />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <DashboardOverview />
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/test"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <TestPage />
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/automation"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <AutomationPage />
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/analytics"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <AnalyticsPage />
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/schema"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <SchemaVisualizerPage />
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/project-docs"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <ProjectDocumentationPage />
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/posts"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <div className="text-center py-12">
                          <h2 className="text-2xl font-semibold mb-4">Posts Management</h2>
                          <p className="text-gray-600">Posts page coming soon...</p>
                        </div>
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/webhooks"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <div className="text-center py-12">
                          <h2 className="text-2xl font-semibold mb-4">Webhooks Configuration</h2>
                          <p className="text-gray-600">Webhooks page coming soon...</p>
                        </div>
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <SignedIn>
                      <DashboardLayout>
                        <div className="text-center py-12">
                          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
                          <p className="text-gray-600">Settings page coming soon...</p>
                        </div>
                      </DashboardLayout>
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />

              {/* Catch all route - redirect unauthenticated users to login */}
              <Route
                path="*"
                element={
                  <>
                    <SignedIn>
                      <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/sign-in" replace />
                    </SignedOut>
                  </>
                }
              />
            </Routes>
          </div>

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#374151',
                color: '#fff',
                borderRadius: '8px',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
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
