import React from 'react'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DashboardOverview from '@/pages/DashboardOverview'
import TestPage from '@/pages/TestPage'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import InstagramCallback from '@/pages/InstagramCallback'

// Import Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key")
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <SignedOut>
                  <LoginPage />
                </SignedOut>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <SignedOut>
                  <SignupPage />
                </SignedOut>
              } 
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
              path="/*" 
              element={
                <SignedIn>
                  <DashboardLayout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<DashboardOverview />} />
                      <Route path="/test" element={<TestPage />} />
                      <Route path="/automation" element={<div className="text-center py-12">Automation page coming soon...</div>} />
                      <Route path="/analytics" element={<div className="text-center py-12">Analytics page coming soon...</div>} />
                      <Route path="/posts" element={<div className="text-center py-12">Posts page coming soon...</div>} />
                      <Route path="/webhooks" element={<div className="text-center py-12">Webhooks page coming soon...</div>} />
                      <Route path="/settings" element={<div className="text-center py-12">Settings page coming soon...</div>} />
                    </Routes>
                  </DashboardLayout>
                </SignedIn>
              } 
            />
          </Routes>
          
          {/* Redirect unauthenticated users to login */}
          <SignedOut>
            <Routes>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </SignedOut>
        </div>
      </Router>
    </ClerkProvider>
  )
}

export default App
