import React, { useState } from 'react';
import { 
  EngagementChart, 
  FollowerGrowthChart, 
  CampaignDistributionChart, 
  ResponseTimeChart 
} from '../components/Analytics/AnalyticsChart';
import { Button } from '../components/ui/button';
import { 
  Download, 
  Filter, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Clock,
  Target,
  Calendar
} from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  
  const stats = [
    {
      name: 'Total Messages',
      value: '2,543',
      change: '+12%',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      name: 'Response Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: Target,
      color: 'green'
    },
    {
      name: 'Avg Response Time',
      value: '2.3 min',
      change: '-0.5 min',
      changeType: 'decrease',
      icon: Clock,
      color: 'purple'
    },
    {
      name: 'New Followers',
      value: '1,234',
      change: '+8.3%',
      changeType: 'increase',
      icon: Users,
      color: 'orange'
    }
  ];

  const timeRanges = [
    { value: '1d', label: 'Last 24h' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  const exportData = () => {
    // Simulate data export
    const data = {
      dateRange,
      exportedAt: new Date().toISOString(),
      stats,
      message: 'Analytics data exported successfully'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instaflow-analytics-${dateRange}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Track your Instagram automation performance and engagement metrics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Time Range Selector */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              
              <Button onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <EngagementChart />
          <FollowerGrowthChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CampaignDistributionChart />
          <ResponseTimeChart />
        </div>

        {/* Detailed Reports */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
            <Button variant="outline" size="sm">
              View All Campaigns
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Messages Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Welcome New Followers</div>
                    <div className="text-sm text-gray-500">Auto-Reply Campaign</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">89.5%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">92.1%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Product Inquiries</div>
                    <div className="text-sm text-gray-500">Smart Response</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">856</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">94.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">87.8%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Customer Support</div>
                    <div className="text-sm text-gray-500">AI Assistant</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">453</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">76.3%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">84.5%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Paused
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
