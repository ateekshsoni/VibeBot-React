import React, { useState } from "react";
import { Sidebar } from "../components/Layout/Sidebar";
import { NotificationDropdown } from "../components/Notifications/NotificationDropdown";
import { DarkModeToggle } from "../components/ui/DarkModeToggle";
import { InstagramConnection } from "../components/Instagram/InstagramConnection";
import { Menu, Info } from "lucide-react";

const Instagram = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Search bar */}
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
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right side items */}
              <div className="flex items-center space-x-4">
                <DarkModeToggle />
                <NotificationDropdown />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Accounts
                  </h1>
                  <div className="flex space-x-8">
                    <button className="pb-2 border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium">
                      Accounts
                    </button>
                    <button className="pb-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      My Templates
                    </button>
                    <button className="pb-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      API Settings
                    </button>
                    <button className="pb-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      Message reports
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {/* Instagram Connection Component */}
              <InstagramConnection />
            </div>

            {/* Help Section */}
            <div className="mt-8 flex items-center text-gray-500 dark:text-gray-400">
              <Info className="w-4 h-4 mr-2" />
              <span className="text-sm">Help</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instagram;
