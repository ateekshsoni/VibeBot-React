import React from 'react';
import { MessageSquare, Clock, CheckCircle, Bot } from 'lucide-react';
import { recentMessages } from '../../data/staticData';

export const RecentMessages = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'read':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'unread':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Messages</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {recentMessages.map((message) => (
          <div 
            key={message.id} 
            className={`p-4 rounded-lg border ${
              message.status === 'unread' 
                ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {message.sender}
                  </span>
                  {message.automated && (
                    <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                      <Bot className="w-3 h-3 mr-1" />
                      Bot Response
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {message.message}
                </p>
                {message.botResponse && (
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-400">
                    <p className="text-xs text-green-700 dark:text-green-300">
                      <strong>Auto-response:</strong> {message.botResponse}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(message.timestamp)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {recentMessages.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <p>No recent messages</p>
        </div>
      )}
    </div>
  );
};
