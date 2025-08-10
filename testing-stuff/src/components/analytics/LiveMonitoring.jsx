import React, { useState, useEffect } from "react";
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
  Activity,
  Zap,
  Eye,
  Users,
  MessageCircle,
  Heart,
  Share2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Bell,
  Play,
  Pause,
  Settings,
  RefreshCw,
  Monitor,
  Wifi,
  WifiOff,
  Target,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Circle,
  AlertCircle,
  Info,
  XCircle,
} from "lucide-react";

const LiveMonitoring = ({ data, dateRange }) => {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [alerts, setAlerts] = useState([]);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate new alerts occasionally
      if (Math.random() < 0.1) {
        const newAlert = generateRandomAlert();
        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const generateRandomAlert = () => {
    const alertTypes = [
      {
        type: "success",
        message: "Automation triggered successfully",
        icon: CheckCircle,
      },
      {
        type: "warning",
        message: "High engagement detected",
        icon: AlertTriangle,
      },
      { type: "info", message: "New follower milestone reached", icon: Info },
      {
        type: "error",
        message: "Automation rate limit approached",
        icon: XCircle,
      },
    ];

    const randomType =
      alertTypes[Math.floor(Math.random() * alertTypes.length)];
    return {
      id: Date.now(),
      ...randomType,
      timestamp: new Date(),
      read: false,
    };
  };

  const realTimeMetrics = {
    activeUsers: 1247,
    engagementRate: 8.9,
    automationTriggers: 23,
    newFollowers: 42,
    recentActivity: [
      {
        id: 1,
        type: "automation",
        message: "Comment-to-DM automation triggered",
        user: "@fitness_enthusiast",
        timestamp: "2 seconds ago",
        status: "success",
      },
      {
        id: 2,
        type: "engagement",
        message: "High engagement on latest post",
        user: "Morning Workout Routine",
        timestamp: "15 seconds ago",
        status: "info",
      },
      {
        id: 3,
        type: "follower",
        message: "New follower gained",
        user: "@health_guru_mike",
        timestamp: "32 seconds ago",
        status: "success",
      },
      {
        id: 4,
        type: "automation",
        message: "Welcome message sent",
        user: "@new_member_sarah",
        timestamp: "1 minute ago",
        status: "success",
      },
      {
        id: 5,
        type: "alert",
        message: "Rate limit warning for DM automation",
        user: "System",
        timestamp: "2 minutes ago",
        status: "warning",
      },
    ],
    automationStatus: [
      {
        name: "Comment-to-DM",
        status: "active",
        triggers: 156,
        successRate: 94.2,
      },
      {
        name: "DM Auto-Reply",
        status: "active",
        triggers: 89,
        successRate: 98.1,
      },
      {
        name: "Story Mention",
        status: "active",
        triggers: 23,
        successRate: 100,
      },
      {
        name: "Welcome Message",
        status: "active",
        triggers: 34,
        successRate: 91.7,
      },
      {
        name: "Hashtag Monitor",
        status: "paused",
        triggers: 0,
        successRate: 0,
      },
      {
        name: "Scheduled Posts",
        status: "active",
        triggers: 12,
        successRate: 100,
      },
    ],
    performanceAlerts: [
      {
        id: 1,
        type: "critical",
        title: "High API Usage",
        message: "Comment automation API calls approaching daily limit",
        timestamp: "5 minutes ago",
        action: "Reduce frequency or upgrade plan",
      },
      {
        id: 2,
        type: "warning",
        title: "Engagement Spike",
        message: "Latest post receiving 300% higher engagement than average",
        timestamp: "12 minutes ago",
        action: "Monitor for automation triggers",
      },
      {
        id: 3,
        type: "info",
        title: "Milestone Reached",
        message: "1000 automation triggers completed today",
        timestamp: "1 hour ago",
        action: "Celebrate success!",
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "paused":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "critical":
        return "border-red-500 bg-red-500/10 text-red-400";
      case "warning":
        return "border-yellow-500 bg-yellow-500/10 text-yellow-400";
      case "info":
        return "border-blue-500 bg-blue-500/10 text-blue-400";
      case "success":
        return "border-green-500 bg-green-500/10 text-green-400";
      default:
        return "border-gray-500 bg-gray-500/10 text-gray-400";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "automation":
        return <Zap className="h-4 w-4 text-yellow-400" />;
      case "engagement":
        return <Heart className="h-4 w-4 text-red-400" />;
      case "follower":
        return <Users className="h-4 w-4 text-blue-400" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {isLive ? (
              <>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                  <Wifi className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-green-400 font-medium">
                  Live Monitoring Active
                </span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-red-400" />
                <span className="text-red-400 font-medium">
                  Monitoring Paused
                </span>
              </>
            )}
          </div>
          <span className="text-gray-400 text-sm">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsLive(!isLive)}
            className={
              isLive
                ? "border-red-500 text-red-400"
                : "border-green-500 text-green-400"
            }
          >
            {isLive ? (
              <>
                <Pause className="h-3 w-3 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3 w-3 mr-2" />
                Resume
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <RefreshCw className="h-3 w-3 mr-2" />
            Refresh
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <Settings className="h-3 w-3 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">
                  {realTimeMetrics.activeUsers.toLocaleString()}
                </p>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12% from yesterday
                </div>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Live Engagement</p>
                <p className="text-2xl font-bold text-white">
                  {realTimeMetrics.engagementRate}%
                </p>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  Above average
                </div>
              </div>
              <Heart className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Automation Triggers</p>
                <p className="text-2xl font-bold text-white">
                  {realTimeMetrics.automationTriggers}
                </p>
                <p className="text-sm text-gray-400">in last hour</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">New Followers</p>
                <p className="text-2xl font-bold text-white">
                  +{realTimeMetrics.newFollowers}
                </p>
                <p className="text-sm text-gray-400">today</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Activity Feed */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-400" />
              Live Activity Feed
            </CardTitle>
            <CardDescription>
              Real-time updates from your Instagram automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {realTimeMetrics.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">
                      {activity.message}
                    </p>
                    <p className="text-gray-400 text-xs">{activity.user}</p>
                    <p className="text-gray-500 text-xs">
                      {activity.timestamp}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getAlertColor(activity.status)}`}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Automation Status Monitor */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-blue-400" />
              Automation Status
            </CardTitle>
            <CardDescription>
              Current status of all automation systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {realTimeMetrics.automationStatus.map((automation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        automation.status === "active"
                          ? "bg-green-400"
                          : automation.status === "paused"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    />
                    <div>
                      <p className="text-white font-medium text-sm">
                        {automation.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {automation.triggers} triggers •{" "}
                        {automation.successRate}% success rate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-medium ${getStatusColor(
                        automation.status
                      )}`}
                    >
                      {automation.status}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 h-6 w-6 p-0"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Alerts */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Bell className="h-5 w-5 mr-2 text-orange-400" />
            Performance Alerts
            {realTimeMetrics.performanceAlerts.length > 0 && (
              <Badge className="ml-2 bg-red-500/20 text-red-400">
                {realTimeMetrics.performanceAlerts.length}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Important notifications and system alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {realTimeMetrics.performanceAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {alert.type === "critical" && (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      {alert.type === "warning" && (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      {alert.type === "info" && <Info className="h-4 w-4" />}
                      <h4 className="font-medium">{alert.title}</h4>
                    </div>
                    <p className="text-sm opacity-80 mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="opacity-60">{alert.timestamp}</span>
                      <span className="font-medium">
                        Action: {alert.action}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 ml-4"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {realTimeMetrics.performanceAlerts.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <p className="text-gray-400">All systems operating normally</p>
                <p className="text-gray-500 text-sm">No alerts at this time</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Performance Chart */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
            Real-time Performance
          </CardTitle>
          <CardDescription>
            Live performance metrics over the last hour
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Engagement Rate Chart */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Engagement Rate
              </h4>
              <div className="space-y-2">
                {[...Array(12)].map((_, i) => {
                  const value = Math.random() * 100;
                  return (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-8">
                        {60 - i * 5}m
                      </span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8">
                        {value.toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Automation Triggers */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Automation Triggers
              </h4>
              <div className="space-y-2">
                {[...Array(12)].map((_, i) => {
                  const value = Math.random() * 20;
                  return (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-8">
                        {60 - i * 5}m
                      </span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                          style={{ width: `${(value / 20) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8">
                        {Math.floor(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* New Followers */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                New Followers
              </h4>
              <div className="space-y-2">
                {[...Array(12)].map((_, i) => {
                  const value = Math.random() * 10;
                  return (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-8">
                        {60 - i * 5}m
                      </span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          style={{ width: `${(value / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8">
                        +{Math.floor(value)}
                      </span>
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

export default LiveMonitoring;
