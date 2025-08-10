import React from 'react';
import SimpleSignupPage from './pages/auth/SimpleSignupPage';
import SimpleLoginPage from './pages/auth/SimpleLoginPage';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import AutomationPage from "./pages/AutomationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LandingPage from "./pages/LandingPage";
import TestPage from "./pages/TestPage";
import InstagramCallback from "./pages/InstagramCallback";
import AuthHandler from "./components/AuthHandler";
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
const frontendUrl =
  import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

// Warn about test environment in development
if (clerkPubKey.includes("test") && isProduction) {
  console.warn(
    "⚠️ Warning: Using development Clerk keys in production environment"
  );
  console.warn(
    "Please update to production keys in your environment variables"
  );
}

function App() {
  return (
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
            <Route path="/sign-in" element={<SimpleLoginPage />} />
            <Route path="/sign-up" element={<SimpleSignupPage />} />
            <Route path="/signup" element={<SimpleSignupPage />} />
            
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
                        Posts page coming soon...
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
                        Webhooks page coming soon...
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
                        Settings page coming soon...
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
      </Router>
    </ClerkProvider>
  );
}

export default App;
