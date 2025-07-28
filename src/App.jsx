import React from "react";
import { Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Campaigns from "./pages/Campaigns";
import Messages from "./pages/Messages";
import Instagram from "./pages/Instagram";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <ErrorBoundary>
      <DarkModeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/campaigns"
            element={
              <ProtectedRoute>
                <Campaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId/instagram"
            element={
              <ProtectedRoute>
                <Instagram />
              </ProtectedRoute>
            }
          />
        </Routes>
      </DarkModeProvider>
    </ErrorBoundary>
  );
};

export default App;
