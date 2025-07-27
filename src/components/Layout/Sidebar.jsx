import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  MessageSquare, 
  Instagram, 
  Settings, 
  Users, 
  Zap,
  Bell,
  CreditCard,
  HelpCircle
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Campaigns', href: '/campaigns', icon: Zap },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Instagram', href: '/instagram', icon: Instagram },
  { name: 'Audience', href: '/audience', icon: Users },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

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
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-2">
              <img 
                src="https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/d1072a08-49f6-40d3-a139-259f11678b8e.svg" 
                alt="InstaFlow Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InstaFlow
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
                  }`}
                  onClick={onClose}
                >
                  <item.icon className={`w-5 h-5 mr-3 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'group-hover:scale-110'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Upgrade to Pro</h4>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                Unlock unlimited campaigns and advanced analytics.
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-medium px-3 py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
