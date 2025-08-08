import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageSquare,
  Target,
  Clock,
  Download,
  Filter,
  Calendar,
  Zap,
  Activity,
  PieChart,
  LineChart,
  Globe,
  Loader2,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import api from '@/lib/api';

// Import analytics components
import OverviewDashboard from '@/components/analytics/OverviewDashboard';
import AutomationAnalytics from '@/components/analytics/AutomationAnalytics';
import AudienceInsights from '@/components/analytics/AudienceInsights';
import ContentPerformance from '@/components/analytics/ContentPerformance';
import AdvancedReports from '@/components/analytics/AdvancedReports';
import LiveMonitoring from '@/components/analytics/LiveMonitoring';

const AnalyticsPage = () => {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalReach: 45230,
      engagementRate: 8.7,
      followerGrowth: 324,
      conversionRate: 3.2,
      automationTriggers: 1247,
      responseRate: 94.5
    },
    automations: {
      commentToDm: { triggers: 456, successRate: 87.3, avgResponseTime: 2.1 },
      dmAutoReply: { triggers: 789, successRate: 92.1, avgResponseTime: 0.8 },
      storyMention: { triggers: 123, successRate: 95.2, avgResponseTime: 3.4 },
      welcomeMessage: { triggers: 234, successRate: 89.7, avgResponseTime: 1.5 },
      hashtagMonitor: { triggers: 567, successRate: 78.9, avgResponseTime: 4.2 },
      scheduledPosts: { triggers: 89, successRate: 100, avgResponseTime: 0 }
    },
    audience: {
      demographics: { age: '25-34', location: 'US', interests: ['fitness', 'lifestyle'] },
      peakHours: [9, 12, 15, 18, 21],
      followerQuality: 87.5
    }
  });

  // Fetch analytics data
  useEffect(() => {
    if (isSignedIn) {
      fetchAnalyticsData();
    }
  }, [isSignedIn, dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, this would fetch from your backend
      console.log(`Fetching analytics data for ${dateRange}`);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'Performance summary and key metrics' },
    { id: 'automations', label: 'Automation Analytics', icon: Zap, description: 'Individual automation performance' },
    { id: 'audience', label: 'Audience Insights', icon: Users, description: 'Demographics and behavior patterns' },
    { id: 'content', label: 'Content Performance', icon: Eye, description: 'Post and story analytics' },
    { id: 'reports', label: 'Advanced Reports', icon: PieChart, description: 'Custom reports and exports' },
    { id: 'live', label: 'Live Monitoring', icon: Activity, description: 'Real-time activity dashboard' }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard data={analyticsData.overview} dateRange={dateRange} />;
      case 'automations':
        return <AutomationAnalytics data={analyticsData.automations} dateRange={dateRange} />;
      case 'audience':
        return <AudienceInsights data={analyticsData.audience} dateRange={dateRange} />;
      case 'content':
        return <ContentPerformance dateRange={dateRange} />;
      case 'reports':
        return <AdvancedReports dateRange={dateRange} />;
      case 'live':
        return <LiveMonitoring />;
      default:
        return <OverviewDashboard data={analyticsData.overview} dateRange={dateRange} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Track performance, analyze trends, and optimize your Instagram automation
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <QuickStatCard
          title="Total Reach"
          value={analyticsData.overview.totalReach.toLocaleString()}
          change={+12.5}
          icon={<Eye className="h-5 w-5" />}
          color="blue"
        />
        <QuickStatCard
          title="Engagement Rate"
          value={`${analyticsData.overview.engagementRate}%`}
          change={+2.3}
          icon={<Heart className="h-5 w-5" />}
          color="red"
        />
        <QuickStatCard
          title="Follower Growth"
          value={`+${analyticsData.overview.followerGrowth}`}
          change={+8.1}
          icon={<Users className="h-5 w-5" />}
          color="green"
        />
        <QuickStatCard
          title="Conversion Rate"
          value={`${analyticsData.overview.conversionRate}%`}
          change={+0.8}
          icon={<Target className="h-5 w-5" />}
          color="purple"
        />
        <QuickStatCard
          title="Auto Triggers"
          value={analyticsData.overview.automationTriggers.toLocaleString()}
          change={+15.2}
          icon={<Zap className="h-5 w-5" />}
          color="yellow"
        />
        <QuickStatCard
          title="Response Rate"
          value={`${analyticsData.overview.responseRate}%`}
          change={+1.4}
          icon={<MessageSquare className="h-5 w-5" />}
          color="indigo"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

// Quick Stat Card Component
const QuickStatCard = ({ title, value, change, icon, color }) => {
  const getChangeIcon = () => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-green-400" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-red-400" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getChangeColor = () => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const colorClasses = {
    blue: 'text-blue-400',
    red: 'text-red-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400',
    indigo: 'text-indigo-400'
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg bg-${color}-500/20`}>
            <div className={colorClasses[color]}>
              {icon}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-1">{title}</p>
            <p className="text-lg font-bold text-white">{value}</p>
            <div className={`flex items-center text-xs ${getChangeColor()}`}>
              {getChangeIcon()}
              <span className="ml-1">{Math.abs(change)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPage;
