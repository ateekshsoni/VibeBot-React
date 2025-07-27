import React, { useState } from 'react';
import { Sidebar } from '../components/Layout/Sidebar';
import { Button } from '../components/ui/button';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Eye,
  Edit,
  Trash2,
  Users,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

const Campaigns = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Welcome Series',
      status: 'active',
      type: 'automation',
      subscribers: 1234,
      messages: 567,
      engagement: '12.5%',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Product Launch',
      status: 'paused',
      type: 'broadcast',
      subscribers: 2456,
      messages: 890,
      engagement: '8.3%',
      created: '2024-01-20'
    },
    {
      id: 3,
      name: 'Holiday Special',
      status: 'draft',
      type: 'automation',
      subscribers: 0,
      messages: 0,
      engagement: '0%',
      created: '2024-01-25'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800';
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your automation campaigns and broadcasts</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
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
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">15.2K</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Engagement</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">9.4%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Campaigns</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subscribers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Messages</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Engagement</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Created {campaign.created}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white capitalize">{campaign.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{campaign.subscribers.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{campaign.messages.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{campaign.engagement}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
