import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Zap,
  Target,
  Globe,
  Calendar,
  ArrowUp,
  ArrowDown,
  Activity,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const OverviewDashboard = ({ data, dateRange }) => {
  const [chartType, setChartType] = useState("engagement");

  // Mock chart data - in real app, this would come from props/API
  const chartData = {
    engagement: [
      { day: "Mon", value: 8.2 },
      { day: "Tue", value: 7.8 },
      { day: "Wed", value: 9.1 },
      { day: "Thu", value: 8.7 },
      { day: "Fri", value: 9.5 },
      { day: "Sat", value: 10.2 },
      { day: "Sun", value: 8.9 },
    ],
    reach: [
      { day: "Mon", value: 4230 },
      { day: "Tue", value: 3890 },
      { day: "Wed", value: 5120 },
      { day: "Thu", value: 4680 },
      { day: "Fri", value: 5450 },
      { day: "Sat", value: 6200 },
      { day: "Sun", value: 4890 },
    ],
    followers: [
      { day: "Mon", value: 45 },
      { day: "Tue", value: 52 },
      { day: "Wed", value: 38 },
      { day: "Thu", value: 61 },
      { day: "Fri", value: 49 },
      { day: "Sat", value: 73 },
      { day: "Sun", value: 56 },
    ],
  };

  const recentActivity = [
    {
      id: 1,
      type: "comment_dm",
      description: 'Auto-DM sent to @username for "price" comment',
      timestamp: "2 minutes ago",
      status: "success",
      automation: "Comment-to-DM",
    },
    {
      id: 2,
      type: "welcome_message",
      description: "Welcome sequence started for new follower @newuser",
      timestamp: "5 minutes ago",
      status: "success",
      automation: "Welcome Message",
    },
    {
      id: 3,
      type: "hashtag_engagement",
      description: "Liked and commented on post with #fitness hashtag",
      timestamp: "12 minutes ago",
      status: "success",
      automation: "Hashtag Monitor",
    },
    {
      id: 4,
      type: "dm_reply",
      description: "Auto-replied to DM from @customer with support query",
      timestamp: "18 minutes ago",
      status: "success",
      automation: "DM Auto-Reply",
    },
    {
      id: 5,
      type: "story_mention",
      description: "Story mention detected from @influencer - DM sent",
      timestamp: "25 minutes ago",
      status: "warning",
      automation: "Story Mention",
    },
  ];

  const performanceMetrics = [
    {
      title: "Automation Efficiency",
      value: "94.7%",
      change: +2.1,
      description: "Success rate across all automations",
      trend: "up",
      color: "green",
    },
    {
      title: "Average Response Time",
      value: "1.8s",
      change: -0.3,
      description: "Mean time to respond to triggers",
      trend: "down",
      color: "blue",
    },
    {
      title: "User Satisfaction",
      value: "4.6/5",
      change: +0.2,
      description: "Based on user interactions",
      trend: "up",
      color: "purple",
    },
    {
      title: "Cost per Engagement",
      value: "$0.03",
      change: -0.01,
      description: "Average cost per meaningful interaction",
      trend: "down",
      color: "orange",
    },
  ];

  const topPerformers = [
    {
      automation: "Comment-to-DM",
      triggers: 456,
      successRate: 87.3,
      impact: "High",
      trend: "up",
    },
    {
      automation: "Story Mention",
      triggers: 123,
      successRate: 95.2,
      impact: "High",
      trend: "up",
    },
    {
      automation: "DM Auto-Reply",
      triggers: 789,
      successRate: 92.1,
      impact: "Medium",
      trend: "stable",
    },
    {
      automation: "Welcome Message",
      triggers: 234,
      successRate: 89.7,
      impact: "Medium",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white">
                Performance Trends
              </CardTitle>
              <CardDescription>
                Track your key metrics over time ({dateRange})
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {["engagement", "reach", "followers"].map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={chartType === type ? "default" : "outline"}
                  onClick={() => setChartType(type)}
                  className={chartType === type ? "bg-blue-500" : ""}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Simple Chart Visualization */}
          <div className="h-64 flex items-end space-x-2 p-4">
            {chartData[chartType].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                  style={{
                    height: `${
                      (item.value /
                        Math.max(...chartData[chartType].map((d) => d.value))) *
                      200
                    }px`,
                    minHeight: "20px",
                  }}
                />
                <p className="text-xs text-gray-400 mt-2">{item.day}</p>
                <p className="text-xs text-white font-medium">
                  {chartType === "engagement"
                    ? `${item.value}%`
                    : chartType === "reach"
                    ? `${(item.value / 1000).toFixed(1)}k`
                    : `+${item.value}`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Key Performance Metrics
            </CardTitle>
            <CardDescription>
              Track efficiency and optimization opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{metric.title}</p>
                  <p className="text-xs text-gray-400">{metric.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{metric.value}</p>
                  <div
                    className={`flex items-center text-xs ${
                      metric.trend === "up"
                        ? "text-green-400"
                        : metric.trend === "down"
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : metric.trend === "down" ? (
                      <ArrowDown className="h-3 w-3" />
                    ) : (
                      <Activity className="h-3 w-3" />
                    )}
                    <span className="ml-1">{Math.abs(metric.change)}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performing Automations */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Top Performing Automations
            </CardTitle>
            <CardDescription>Ranked by success rate and impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-400"
                        : index === 2
                        ? "bg-orange-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {performer.automation}
                    </p>
                    <p className="text-xs text-gray-400">
                      {performer.triggers} triggers • {performer.successRate}%
                      success
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      performer.impact === "High" ? "default" : "secondary"
                    }
                    className={
                      performer.impact === "High"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }
                  >
                    {performer.impact}
                  </Badge>
                  {performer.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-400" />
                  ) : performer.trend === "down" ? (
                    <ArrowDown className="h-4 w-4 text-red-400" />
                  ) : (
                    <Activity className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Real-Time Activity Feed
          </CardTitle>
          <CardDescription>
            Live automation triggers and responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === "success"
                      ? "bg-green-500/20"
                      : activity.status === "warning"
                      ? "bg-yellow-500/20"
                      : "bg-red-500/20"
                  }`}
                >
                  {activity.status === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : activity.status === "warning" ? (
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      variant="outline"
                      className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30"
                    >
                      {activity.automation}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Growth Rate</p>
                <p className="text-2xl font-bold text-white">+24.5%</p>
                <p className="text-xs text-green-400">vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Time Saved</p>
                <p className="text-2xl font-bold text-white">47.2h</p>
                <p className="text-xs text-blue-400">this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">ROI</p>
                <p className="text-2xl font-bold text-white">340%</p>
                <p className="text-xs text-purple-400">return on investment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewDashboard;
