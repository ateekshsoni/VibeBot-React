import React, { useState } from "react";
import { Sidebar } from "../components/Layout/Sidebar";
import { Button } from "../components/ui/button";
import {
  Search,
  Filter,
  Send,
  Reply,
  Archive,
  Star,
  Clock,
  CheckCircle2,
  User,
  MessageCircle,
} from "lucide-react";

const Messages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages] = useState([
    {
      id: 1,
      sender: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150",
      message:
        "Hi! I'm interested in your latest product launch. Can you tell me more about the pricing?",
      time: "2 hours ago",
      status: "unread",
      platform: "instagram",
    },
    {
      id: 2,
      sender: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      message:
        "Thank you for the quick response! The automation setup is working perfectly.",
      time: "4 hours ago",
      status: "read",
      platform: "instagram",
    },
    {
      id: 3,
      sender: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      message:
        "When will the new features be available? I've been waiting for the advanced analytics.",
      time: "1 day ago",
      status: "replied",
      platform: "instagram",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "read":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "replied":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "unread":
        return <MessageCircle className="w-4 h-4" />;
      case "read":
        return <CheckCircle2 className="w-4 h-4" />;
      case "replied":
        return <Reply className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Messages
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage conversations with your audience
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Send className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Messages
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    2,847
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Unread
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    23
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Response Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    94.5%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Avg. Response Time
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    2.4h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search messages or contacts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  All Status
                </Button>
                <Button variant="outline">
                  <Archive className="w-4 h-4 mr-2" />
                  Platform
                </Button>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Conversations
              </h3>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {message.sender}
                          </h4>
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              message.status
                            )}`}
                          >
                            {getStatusIcon(message.status)}
                            <span className="ml-1">{message.status}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {message.time}
                          </span>
                          <button className="text-gray-400 hover:text-yellow-500">
                            <Star className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {message.message}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                          <User className="w-3 h-3 mr-1" />
                          {message.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail Modal */}
          {selectedMessage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedMessage.avatar}
                        alt={selectedMessage.sender}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {selectedMessage.sender}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedMessage.time}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-white">
                        {selectedMessage.message}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Button className="flex-1">
                        <Reply className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
