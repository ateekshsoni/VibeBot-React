import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardOverview from "@/pages/DashboardOverview";
import AutomationPage from "@/pages/AutomationPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import TestPage from "@/pages/TestPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import InstagramCallback from "@/pages/InstagramCallback";
import AuthHandler from "@/components/AuthHandler";

// Import Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

function App() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            {/* Root route with authentication handling */}
            <Route path="/" element={<AuthHandler />} />

            {/* Public Routes */}
            <Route
              path="/sign-in"
              element={
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              }
            />
            <Route
              path="/sign-up"
              element={
                <SignedOut>
                  <SignupPage />
                </SignedOut>
              }
            />

            {/* Legacy routes for backward compatibility */}
            <Route path="/login" element={<Navigate to="/sign-in" replace />} />
            <Route
              path="/signup"
              element={<Navigate to="/sign-up" replace />}
            />

            {/* Instagram OAuth Callback - Can be accessed by authenticated users */}
            <Route
              path="/instagram/callback"
              element={
                <SignedIn>
                  <InstagramCallback />
                </SignedIn>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <SignedIn>
                  <DashboardLayout>
                    <DashboardOverview />
                  </DashboardLayout>
                </SignedIn>
              }
            />
            <Route
              path="/test"
              element={
                <SignedIn>
                  <DashboardLayout>
                    <TestPage />
                  </DashboardLayout>
                </SignedIn>
              }
            />
            <Route
              path="/automation"
              element={
                <SignedIn>
                  <DashboardLayout>
                    <AutomationPage />
                  </DashboardLayout>
                </SignedIn>
              }
            />
            <Route
              path="/analytics"
              element={
                <SignedIn>
                  <DashboardLayout>
                    <AnalyticsPage />
                  </DashboardLayout>
                </SignedIn>
              }
            />
            <Route
              path="/posts"
              element={
                <SignedIn>
                  <DashboardLayout>
                    <div className="text-center py-12">
                      Posts page coming soon...
                    </div>
                  </DashboardLayout>
                </SignedIn>
              }
            />
            <Route
              path="/webhooks"
              element={
                <SignedIn>
                  <DashboardLayout>
                    <div className="text-center py-12">
                      Webhooks page coming soon...
                    </div>
                  </DashboardLayout>
                </SignedIn>
              }
            />
            <Route
              path="/settings"
              element={
                <SignedIn>
                  <DashboardLayout>
                    <div className="text-center py-12">
                      Settings page coming soon...
                    </div>
                  </DashboardLayout>
                </SignedIn>
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
