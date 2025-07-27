import React, { useEffect, useState, useMemo } from "react";
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  UserButton, 
  useUser 
} from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { Sidebar } from "../components/Layout/Sidebar";
import { NotificationDropdown } from "../components/Notifications/NotificationDropdown";
import { DarkModeToggle } from "../components/ui/DarkModeToggle";
import { OnboardingWizard } from "../components/Onboarding/OnboardingWizard";
import { InstagramConnection } from "../components/Instagram/InstagramConnection";
import { CampaignManager } from "../components/Campaign/CampaignManager";
import { EngagementChart } from "../components/Analytics/AnalyticsChart";
import { RecentMessages } from "../components/Messages/RecentMessages";
import { Menu, X, Plus, TrendingUp } from "lucide-react";
import { dashboardStats } from "../data/staticData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user was created recently (within last 5 minutes) - indicates new signup
      const createdAt = new Date(user.createdAt);
      const now = new Date();
      const timeDiff = now - createdAt;
      const minutesDiff = timeDiff / (1000 * 60);
      
      if (minutesDiff < 5) {
        setIsNewUser(true);
        setShowOnboarding(true);
      }
    }
  }, [user, isLoaded]);

  const WelcomeMessage = useMemo(() => {
    if (isNewUser) {
      return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">🎉 Welcome to InstaFlow!</h2>
          <p className="text-blue-100">
            Thanks for signing up! Your account has been successfully created. 
            Get started by exploring your dashboard features below.
          </p>
        </div>
      );
    }
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.firstName || 'User'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Ready to manage your Instagram automation?
            </p>
          </div>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-12 h-12"
              }
            }}
          />
        </div>
      </div>
    );
  }, [isNewUser, user?.firstName]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Onboarding Wizard */}
      {showOnboarding && (
        <OnboardingWizard onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content - with left margin to account for fixed sidebar */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Search bar (placeholder) */}
              <div className="flex-1 max-w-2xl mx-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search campaigns, messages, analytics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right side items */}
              <div className="flex items-center space-x-4">
                <DarkModeToggle />
                <NotificationDropdown />
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content - Scrollable */}
        <div className="h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8">
          <SignedOut>
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Dashboard
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Please sign in to access your dashboard
              </p>
              <SignInButton>
                <Button size="lg">
                  Sign In to Continue
                </Button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            {WelcomeMessage}
            
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="group bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/10 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2V4a2 2 0 012-2h4a2 2 0 012 2v4z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Messages Sent</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.messagesSent.value.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`w-4 h-4 mr-1 ${dashboardStats.messagesSent.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm font-medium ${dashboardStats.messagesSent.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        +{dashboardStats.messagesSent.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-white to-green-50/50 dark:from-gray-800 dark:to-green-900/10 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement Rate</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.engagementRate.value}%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`w-4 h-4 mr-1 ${dashboardStats.engagementRate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm ${dashboardStats.engagementRate.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        +{dashboardStats.engagementRate.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Followers</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.followers.value.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`w-4 h-4 mr-1 ${dashboardStats.followers.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm ${dashboardStats.followers.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        +{dashboardStats.followers.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Campaigns</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.activeCampaigns.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`w-4 h-4 mr-1 ${dashboardStats.activeCampaigns.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm ${dashboardStats.activeCampaigns.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        +{dashboardStats.activeCampaigns.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Instagram Connection */}
                <InstagramConnection />

                {/* Analytics Chart */}
                <EngagementChart />

                {/* Campaign Manager */}
                <CampaignManager />

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => navigate('/campaigns')}
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      Create Campaign
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => navigate('/campaigns')}
                    >
                      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Auto Responses
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => navigate('/analytics')}
                    >
                      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                      </svg>
                      View Analytics
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => navigate('/settings')}
                    >
                      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6 order-first lg:order-last">
                {/* Recent Messages */}
                <RecentMessages />

                {/* Account Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{user?.primaryEmailAddress?.emailAddress || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                      <span className="font-mono text-xs text-gray-900 dark:text-white">{user?.id?.slice(-8) || 'Loading...'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Member Since:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Loading...'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">Free Trial</span>
                    </div>
                  </div>
                </div>

                {/* Getting Started */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Getting Started</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-blue-800 dark:text-blue-200">Account created ✓</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-blue-700 dark:text-blue-300">Connect Instagram account</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-blue-700 dark:text-blue-300">Create first campaign</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-blue-700 dark:text-blue-300">Set up auto-responses</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => setShowOnboarding(true)}
                  >
                    Continue Setup
                  </Button>
                </div>
              </div>
            </div>
          </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
