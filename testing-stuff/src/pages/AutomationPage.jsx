import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import InstagramAccountCard from "@/components/InstagramAccountCard";
import AutomationSettingsCard from "@/components/AutomationSettingsCard";
import SetupProgressCard from "@/components/SetupProgressCard";
import ActivityFeedCard from "@/components/ActivityFeedCard";
import AutomationErrorBoundary from "@/utils/errorBoundary";
import useAutomationStats from "@/hooks/useAutomationStats";
import { getCircuitBreakerStatus, resetCircuitBreaker } from "@/utils/circuitBreaker";
import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Zap,
  TrendingUp,
  Bot,
  Settings,
  Target,
  Clock,
  RefreshCw,
} from "lucide-react";

const AutomationPage = () => {
  const { isSignedIn } = useAuth();
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [automationEnabled, setAutomationEnabled] = useState(false);
  
  // Circuit breaker status monitoring
  const [systemStatus, setSystemStatus] = useState({
    instagram: 'unknown',
    automation: 'unknown',
    backendSync: 'unknown'
  });
  
  // Use the new automation stats hook
  const {
    stats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
    isSetupComplete,
    setupProgress,
    isActive,
    performanceData
  } = useAutomationStats();

  // Update local state when stats change
  useEffect(() => {
    setInstagramConnected(stats.instagramConnected);
    setAutomationEnabled(stats.isEnabled);
  }, [stats.instagramConnected, stats.isEnabled]);

  // Monitor circuit breaker status
  useEffect(() => {
    const checkSystemStatus = () => {
      const instagramStatus = getCircuitBreakerStatus('instagram');
      const automationStatus = getCircuitBreakerStatus('automation');
      const backendSyncStatus = getCircuitBreakerStatus('backendSync');

      setSystemStatus({
        instagram: instagramStatus?.state || 'unknown',
        automation: automationStatus?.state || 'unknown',
        backendSync: backendSyncStatus?.state || 'unknown'
      });
    };

    checkSystemStatus();
    
    // Check every 30 seconds
    const interval = setInterval(checkSystemStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleResetCircuitBreakers = () => {
    resetCircuitBreaker('instagram');
    resetCircuitBreaker('automation');
    resetCircuitBreaker('backendSync');
    console.log('🔄 All circuit breakers manually reset');
  };

  if (!isSignedIn) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-muted-foreground">
              Please sign in to access automation features
            </h2>
            <p className="text-muted-foreground">
              Authentication is required to manage your Instagram automation
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AutomationErrorBoundary 
      onReset={handleResetCircuitBreakers}
      systemStatus={systemStatus}
    >
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* System Status Banner */}
        {(systemStatus.instagram || systemStatus.backendSync || systemStatus.automation) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="text-amber-800 font-medium">System Protection Active</span>
              </div>
              <Button 
                onClick={handleResetCircuitBreakers}
                variant="outline" 
                size="sm"
                className="text-amber-700 border-amber-300 hover:bg-amber-100"
              >
                Reset Protections
              </Button>
            </div>
            <p className="text-amber-700 text-sm mt-2">
              Some services are temporarily protected to prevent overload. Click reset to retry connections.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Instagram Automation Center
              </h1>
              <p className="text-muted-foreground mt-2">
                Set up intelligent automation workflows to engage your Instagram audience 24/7
              </p>
            </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={refetchStats}
              variant="ghost"
              size="sm"
              disabled={statsLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${statsLoading ? 'animate-spin' : ''}`} />
              {statsLoading ? 'Updating...' : 'Refresh'}
            </Button>
            <Badge variant={instagramConnected ? "default" : "secondary"}>
              {instagramConnected ? "📱 Connected" : "❌ No Connection"}
            </Badge>
            <Badge variant={automationEnabled ? "default" : "secondary"} 
                   className={automationEnabled ? "bg-green-500" : ""}>
              {automationEnabled ? "🟢 Active" : "🔴 Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Triggers</p>
                <p className="text-2xl font-bold">
                  {statsLoading ? '...' : stats.totalTriggers.toLocaleString()}
                </p>
                {stats.lastTriggeredAt && (
                  <p className="text-xs text-muted-foreground">
                    Last: {new Date(stats.lastTriggeredAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Successful DMs</p>
                <p className="text-2xl font-bold">
                  {statsLoading ? '...' : stats.successfulDMs.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.failedDMs} failed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">
                  {statsLoading ? '...' : `${stats.successRate}%`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {performanceData.totalDMs} total DMs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Keywords Active</p>
                <p className="text-2xl font-bold">
                  {statsLoading ? '...' : stats.keywordsCount}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isActive ? 'Monitoring' : 'Inactive'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InstagramAccountCard 
            onStatusChange={(connected) => setInstagramConnected(connected)}
          />
          
          <SetupProgressCard 
            stats={stats}
            loading={statsLoading}
          />
          
          {/* Feature Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Automation Features
              </CardTitle>
              <CardDescription>
                Available automation capabilities once Instagram is connected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Comment-to-DM Automation</h4>
                      <p className="text-xs text-muted-foreground">
                        Automatically send DMs when users comment specific keywords
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Bot className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Smart Keyword Detection</h4>
                      <p className="text-xs text-muted-foreground">
                        Flexible or exact keyword matching with case sensitivity options
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Rate Limiting & Safety</h4>
                      <p className="text-xs text-muted-foreground">
                        Built-in limits to prevent spam and comply with Instagram policies
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <TrendingUp className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Analytics & Monitoring</h4>
                      <p className="text-xs text-muted-foreground">
                        Track automation performance and engagement metrics
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AutomationSettingsCard 
            onAutomationChange={(enabled) => setAutomationEnabled(enabled)}
          />
          
          <ActivityFeedCard 
            maxItems={8}
            showLoadMore={false}
          />
        </div>
      </div>

      {/* Setup Guide */}
      {!instagramConnected && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-blue-800">🚀 Getting Started</CardTitle>
            <CardDescription className="text-blue-700">
              Follow these steps to set up your Instagram automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                  1
                </div>
                <p className="text-sm text-blue-800">
                  Connect your Instagram Business account using the OAuth integration above
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-bold">
                  2
                </div>
                <p className="text-sm text-muted-foreground">
                  Configure trigger keywords that will activate automation
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-bold">
                  3
                </div>
                <p className="text-sm text-muted-foreground">
                  Create your DM template and comment reply messages
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-bold">
                  4
                </div>
                <p className="text-sm text-muted-foreground">
                  Set rate limits and safety settings, then enable automation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </AutomationErrorBoundary>
  );
};

export default AutomationPage;
