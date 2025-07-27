import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  Home,
  BarChart3,
  MessageSquare,
  Instagram,
  Settings,
  Users,
  Zap,
  Bot,
  MessageCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";

const getNavigationItems = (userId) => [
  { name: "Home", href: `/user/${userId}/dashboard`, icon: Home },
  { name: "Contacts", href: `/user/${userId}/contacts`, icon: Users },
  { name: "Automation", href: `/user/${userId}/automation`, icon: Bot },
  { name: "Live Chat", href: `/user/${userId}/live-chat`, icon: MessageCircle },
  { name: "Settings", href: `/user/${userId}/settings`, icon: Settings },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useUser();

  const navigationItems = user ? getNavigationItems(user.id) : [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-100 dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Manychat
            </h1>
          </div>

          {/* Team/Workspace Selector */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">T</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Team DevStrom ...
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-500 text-white">
                    FREE
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.name === "Home" &&
                  location.pathname.includes("/dashboard"));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  onClick={onClose}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
            {/* User Profile */}
            {user && (
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.firstName?.charAt(0) ||
                      user.emailAddresses[0]?.emailAddress?.charAt(0) ||
                      "A"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    My Profile
                  </p>
                </div>
              </div>
            )}

            {/* Help */}
            <div className="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Help</span>
            </div>

            {/* Contacts Limit */}
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Free contacts limit
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    0/1000
                  </p>
                </div>
              </div>

              {/* Pro Trial Button */}
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition-colors">
                Activate Pro Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
