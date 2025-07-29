import React from 'react';
import {
  Home,
  BarChart3,
  Settings,
  MessageSquare,
  Zap,
  Instagram,
  Users,
  X,
  Menu,
  Bell,
  Search,
  Calendar,
  Target,
  CreditCard,
  LogOut,
  ChevronDown,
  Plus
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose, isInstagramConnected = false }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: false },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: true },
    { name: 'Automation', href: '/automation', icon: Zap, current: false },
    { name: 'Messages', href: '/messages', icon: MessageSquare, current: false },
    { name: 'Instagram', href: '/instagram', icon: Instagram, current: false },
    { name: 'Campaigns', href: '/campaigns', icon: Target, current: false },
    { name: 'Settings', href: '/settings', icon: Settings, current: false },
  ];

  const handleNavigation = (href) => {
    // Extract userId from current URL or use default
    const userId = window.location.pathname.split('/')[2] || 'demo';
    const newPath = `/user/${userId}${href}`;
    window.location.href = newPath;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ManyChat
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Instagram Connection Status */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className={`flex items-center space-x-3 p-3 rounded-lg ${
              isInstagramConnected 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700'
            }`}>
              <Instagram className={`w-5 h-5 ${
                isInstagramConnected ? 'text-green-600' : 'text-orange-600'
              }`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  isInstagramConnected 
                    ? 'text-green-900 dark:text-green-100' 
                    : 'text-orange-900 dark:text-orange-100'
                }`}>
                  {isInstagramConnected ? 'Instagram Connected' : 'Connect Instagram'}
                </p>
                <p className={`text-xs ${
                  isInstagramConnected 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-orange-600 dark:text-orange-400'
                }`}>
                  {isInstagramConnected ? '@your_account' : 'Click to connect'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  item.current
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center space-x-3 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              <span className="font-medium">New Automation</span>
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Demo User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Free Plan
                </p>
              </div>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
