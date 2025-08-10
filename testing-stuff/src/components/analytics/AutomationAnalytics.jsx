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
  MessageSquare,
  MessageCircle,
  Camera,
  Heart,
  Hash,
  Calendar,
  BarChart3,
  Clock,
  Zap,
  Target,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  Settings,
  AlertCircle,
  CheckCircle,
  Users,
  Eye,
} from "lucide-react";

const AutomationAnalytics = ({ data, dateRange }) => {
  const [selectedAutomation, setSelectedAutomation] = useState("all");

  const automationData = [
    {
      id: "commentToDm",
      name: "Comment-to-DM",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      triggers: 456,
      successRate: 87.3,
      avgResponseTime: 2.1,
      conversions: 42,
      revenue: 1260,
      status: "active",
      growth: +12.5,
      details: {
        topKeywords: ["price", "buy", "cost", "order"],
        avgEngagement: 8.9,
        peakHours: [9, 12, 15, 18],
        userSatisfaction: 4.2,
      },
    },
    {
      id: "dmAutoReply",
      name: "DM Auto-Reply",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      triggers: 789,
      successRate: 92.1,
      avgResponseTime: 0.8,
      conversions: 67,
      revenue: 2010,
      status: "active",
      growth: +8.3,
      details: {
        topKeywords: ["help", "support", "info", "question"],
        avgEngagement: 9.4,
        peakHours: [10, 14, 16, 20],
        userSatisfaction: 4.6,
      },
    },
    {
      id: "storyMention",
      name: "Story Mention",
      icon: <Camera className="h-5 w-5" />,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      triggers: 123,
      successRate: 95.2,
      avgResponseTime: 3.4,
      conversions: 28,
      revenue: 840,
      status: "active",
      growth: +25.7,
      details: {
        topKeywords: ["mention", "tag", "feature"],
        avgEngagement: 12.3,
        peakHours: [11, 13, 17, 19],
        userSatisfaction: 4.8,
      },
    },
    {
      id: "welcomeMessage",
      name: "Welcome Message",
      icon: <Heart className="h-5 w-5" />,
      color: "red",
      gradient: "from-red-500 to-pink-500",
      triggers: 234,
      successRate: 89.7,
      avgResponseTime: 1.5,
      conversions: 35,
      revenue: 1050,
      status: "active",
      growth: +5.2,
      details: {
        topKeywords: ["welcome", "hello", "new"],
        avgEngagement: 7.8,
        peakHours: [8, 12, 18, 22],
        userSatisfaction: 4.3,
      },
    },
    {
      id: "hashtagMonitor",
      name: "Hashtag Monitor",
      icon: <Hash className="h-5 w-5" />,
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      triggers: 567,
      successRate: 78.9,
      avgResponseTime: 4.2,
      conversions: 51,
      revenue: 1530,
      status: "active",
      growth: +18.9,
      details: {
        topKeywords: ["fitness", "health", "lifestyle"],
        avgEngagement: 6.7,
        peakHours: [9, 15, 17, 21],
        userSatisfaction: 3.9,
      },
    },
    {
      id: "scheduledPosts",
      name: "Scheduled Posts",
      icon: <Calendar className="h-5 w-5" />,
      color: "indigo",
      gradient: "from-indigo-500 to-blue-500",
      triggers: 89,
      successRate: 100,
      avgResponseTime: 0,
      conversions: 78,
      revenue: 2340,
      status: "active",
      growth: +31.2,
      details: {
        topKeywords: ["content", "post", "schedule"],
        avgEngagement: 11.2,
        peakHours: [8, 12, 16, 20],
        userSatisfaction: 4.7,
      },
    },
  ];

  const getFilteredData = () => {
    if (selectedAutomation === "all") return automationData;
    return automationData.filter(
      (automation) => automation.id === selectedAutomation
    );
  };

  const totalMetrics = automationData.reduce(
    (acc, automation) => ({
      triggers: acc.triggers + automation.triggers,
      conversions: acc.conversions + automation.conversions,
      revenue: acc.revenue + automation.revenue,
      avgSuccessRate: acc.avgSuccessRate + automation.successRate,
    }),
    { triggers: 0, conversions: 0, revenue: 0, avgSuccessRate: 0 }
  );

  totalMetrics.avgSuccessRate =
    totalMetrics.avgSuccessRate / automationData.length;

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center space-x-2">
        <Button
          size="sm"
          variant={selectedAutomation === "all" ? "default" : "outline"}
          onClick={() => setSelectedAutomation("all")}
          className={selectedAutomation === "all" ? "bg-blue-500" : ""}
        >
          All Automations
        </Button>
        {automationData.map((automation) => (
          <Button
            key={automation.id}
            size="sm"
            variant={
              selectedAutomation === automation.id ? "default" : "outline"
            }
            onClick={() => setSelectedAutomation(automation.id)}
            className={
              selectedAutomation === automation.id
                ? `bg-${automation.color}-500`
                : ""
            }
          >
            <div className={`text-${automation.color}-400 mr-2`}>
              {automation.icon}
            </div>
            {automation.name}
          </Button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Triggers</p>
                <p className="text-2xl font-bold text-white">
                  {totalMetrics.triggers.toLocaleString()}
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Success Rate</p>
                <p className="text-2xl font-bold text-white">
                  {totalMetrics.avgSuccessRate.toFixed(1)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Conversions</p>
                <p className="text-2xl font-bold text-white">
                  {totalMetrics.conversions}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Revenue Generated</p>
                <p className="text-2xl font-bold text-white">
                  ${totalMetrics.revenue.toLocaleString()}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {getFilteredData().map((automation) => (
          <Card key={automation.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${automation.gradient} text-white`}
                  >
                    {automation.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">
                      {automation.name}
                    </CardTitle>
                    <CardDescription>
                      Detailed performance analytics for {dateRange}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    automation.status === "active" ? "default" : "secondary"
                  }
                  className={
                    automation.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : ""
                  }
                >
                  {automation.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Triggers</span>
                    <div className="flex items-center text-green-400 text-sm">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {automation.growth}%
                    </div>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {automation.triggers.toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-sm text-gray-400">Success Rate</span>
                  <p className="text-xl font-bold text-white">
                    {automation.successRate}%
                  </p>
                </div>

                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-sm text-gray-400">Avg Response</span>
                  <p className="text-xl font-bold text-white">
                    {automation.avgResponseTime}s
                  </p>
                </div>

                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-sm text-gray-400">Conversions</span>
                  <p className="text-xl font-bold text-white">
                    {automation.conversions}
                  </p>
                </div>
              </div>

              {/* Performance Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Revenue Generated:</span>
                  <span className="text-white font-medium">
                    ${automation.revenue.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">User Satisfaction:</span>
                  <div className="flex items-center">
                    <span className="text-white font-medium mr-2">
                      {automation.details.userSatisfaction}/5
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full mr-1 ${
                            i < Math.floor(automation.details.userSatisfaction)
                              ? "bg-yellow-400"
                              : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Avg Engagement:</span>
                  <span className="text-white font-medium">
                    {automation.details.avgEngagement}%
                  </span>
                </div>
              </div>

              {/* Top Keywords */}
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">
                  Top Performing Keywords:
                </p>
                <div className="flex flex-wrap gap-1">
                  {automation.details.topKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`text-xs bg-${automation.color}-500/10 text-${automation.color}-400 border-${automation.color}-500/30`}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Peak Hours */}
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">
                  Peak Activity Hours:
                </p>
                <div className="flex space-x-2">
                  {automation.details.peakHours.map((hour, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 px-2 py-1 rounded text-xs text-white"
                    >
                      {hour}:00
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Configure
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={
                    automation.status === "active"
                      ? "border-red-500 text-red-400"
                      : "border-green-500 text-green-400"
                  }
                >
                  {automation.status === "active" ? (
                    <>
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      Activate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Comparison Chart */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">
            Automation Performance Comparison
          </CardTitle>
          <CardDescription>
            Compare success rates and trigger volumes across all automations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Success Rate Chart */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                Success Rate Comparison
              </h4>
              <div className="space-y-3">
                {automationData.map((automation) => (
                  <div
                    key={automation.id}
                    className="flex items-center space-x-3"
                  >
                    <div className={`text-${automation.color}-400`}>
                      {automation.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-white">{automation.name}</span>
                        <span className="text-gray-400">
                          {automation.successRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${automation.gradient} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${automation.successRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trigger Volume Chart */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                Trigger Volume
              </h4>
              <div className="space-y-3">
                {automationData.map((automation) => {
                  const maxTriggers = Math.max(
                    ...automationData.map((a) => a.triggers)
                  );
                  const percentage = (automation.triggers / maxTriggers) * 100;

                  return (
                    <div
                      key={automation.id}
                      className="flex items-center space-x-3"
                    >
                      <div className={`text-${automation.color}-400`}>
                        {automation.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-white">{automation.name}</span>
                          <span className="text-gray-400">
                            {automation.triggers}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${automation.gradient} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationAnalytics;
