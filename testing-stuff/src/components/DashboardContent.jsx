import React, { useEffect, useState } from "react";
import { useUser, useAuth, useSession } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import { useUserData } from "@/hooks/useUserData";
import { useInstagram } from "@/hooks/useInstagram";
import { useInstagramCallback } from "@/hooks/useInstagramCallback";
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Instagram,
  Users,
  Zap,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Wifi,
  WifiOff,
  BarChart3,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardContent = () => {
  const { user: clerkUser } = useUser();
  const auth = useAuth();
  const { session } = useSession();
  
  // Use the new Instagram hooks following backend team's implementation
  const { instagramStatus, connectInstagram, refreshStatus } = useInstagram();
  const { processing } = useInstagramCallback(); // Handles all URL parameter scenarios

  const {
    user,
    instagram,
    analytics,
    loading,
    loadingInstagram,
    loadingAnalytics,
    isLoading,
    error,
    backendConnected,
    refetch,
  } = useUserData();

  // Check Instagram status on component mount
  useEffect(() => {
    if (clerkUser && auth.isSignedIn) {
      refreshStatus();
    }
  }, [clerkUser, auth.isSignedIn, refreshStatus]);

  // Handle Instagram connection redirect using new production flow
  const handleConnectInstagram = async () => {
    try {
      console.log("🔄 Connecting to Instagram using production OAuth flow...");
      console.log("📋 Following backend team's implementation guide");
      
      // Use the new production Instagram connect method
      await connectInstagram();
      
    } catch (error) {
      console.error("❌ Failed to initiate Instagram connection:", error);
      toast.error(`❌ Connection failed: ${error.message}`);
    }
  };

  // Skeleton Loading Component
  const SkeletonCard = ({ className = "" }) => (
    <Card className={cn("animate-pulse", className)}>
      <CardHeader>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-6 bg-muted rounded w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-muted rounded"></div>
      </CardContent>
    </Card>
  );

  // Backend Connection Error Component
  const BackendErrorBanner = () => (
    <Card className="mb-6 border-l-4 border-l-red-500 bg-red-950/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <WifiOff className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm font-medium text-red-400">
                Backend Connection Failed
              </p>
              <p className="text-xs text-red-300/80">
                Unable to connect to VibeBot servers. Please try again later.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Instagram Not Connected Component
  const InstagramNotConnected = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to VibeBot!</h1>
        <p className="text-muted-foreground">
          Hey {clerkUser?.firstName}! Let's get your Instagram automation
          started.
        </p>
      </div>

      {/* Main Connection Card */}
      <Card className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10" />

        <CardContent className="relative p-8 text-center space-y-6">
          {/* Instagram Icon with Animation */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl animate-pulse" />
            <div className="relative bg-background rounded-2xl w-full h-full flex items-center justify-center border-2 border-transparent">
              <Instagram className="h-12 w-12 text-pink-500" />
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">
              Connect Your Instagram Business Account
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Connect your Instagram Business account to unlock automation,
              analytics, and messaging features. You'll be redirected to
              Instagram for secure authentication.
            </p>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Auto DM Responses</p>
                <p className="text-xs text-muted-foreground">
                  Reply to comments automatically
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Analytics Dashboard</p>
                <p className="text-xs text-muted-foreground">
                  Track engagement and growth
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Smart Automation</p>
                <p className="text-xs text-muted-foreground">
                  Set up custom workflows
                </p>
              </div>
            </div>
          </div>

          {/* Connect Button */}
          <Button
            onClick={handleConnectInstagram}
            size="lg"
            disabled={processing}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Instagram className="mr-2 h-5 w-5" />
                📸 Connect Instagram Business
                <ExternalLink className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {/* Security Note */}
          <div className="space-y-2 text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Secured with Instagram's OAuth 2.0. We never store your
              password.
            </p>
            <p className="text-xs text-blue-400">
              📱 Requires Instagram Business or Creator account
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span>Account Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                VibeBot Account:
              </span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Instagram:</span>
              <Badge variant="destructive">Not Connected</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan:</span>
              <Badge variant="secondary">
                {user?.plan?.toUpperCase() || "FREE"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>Getting Started</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Account created ✓</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  Connect Instagram
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  Create first automation
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Instagram Connected Dashboard
  const ConnectedDashboard = () => (
    <div className="space-y-6">
      {/* Header with Instagram Profile */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {instagram?.profilePicture ? (
              <img
                src={instagram.profilePicture}
                alt={instagram.username}
                className="w-16 h-16 rounded-full border-2 border-pink-500"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
              <Wifi className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              @{instagramStatus?.username || instagram?.username} •{" "}
              {instagram?.followers?.toLocaleString() || 0} followers
            </p>
          </div>
        </div>
        <Button onClick={refetch} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Followers */}
        {loadingAnalytics ? (
          <SkeletonCard />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Followers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics?.followers?.toLocaleString() ||
                  instagram?.followers?.toLocaleString() ||
                  "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                +{analytics?.followersGrowth || 0}% from last month
              </p>
            </CardContent>
          </Card>
        )}

        {/* Active Automations */}
        {loadingAnalytics ? (
          <SkeletonCard />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Automations
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics?.activeAutomations || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics?.totalAutomations || 0} total created
              </p>
            </CardContent>
          </Card>
        )}

        {/* Messages Sent */}
        {loadingAnalytics ? (
          <SkeletonCard />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Messages Sent
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics?.messagesSent?.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics?.messagesThisWeek || 0} this week
              </p>
            </CardContent>
          </Card>
        )}

        {/* Response Rate */}
        {loadingAnalytics ? (
          <SkeletonCard />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Response Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics?.responseRate || 0}%
              </div>
              <Progress value={analytics?.responseRate || 0} className="mt-2" />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your Instagram automation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Zap className="h-6 w-6" />
              <span>Create Automation</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <MessageCircle className="h-6 w-6" />
              <span>Test Webhook</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Loading State
  if (isLoading || instagramStatus.loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-muted rounded w-24 animate-pulse"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        <SkeletonCard className="h-40" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Backend Connection Error */}
      {!backendConnected && <BackendErrorBanner />}

      {/* Processing state during OAuth callback */}
      {processing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-700 font-medium">
                🔄 Processing Instagram connection...
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      {!instagramStatus.connected ? (
        <InstagramNotConnected />
      ) : (
        <div className="space-y-6">
          {/* Instagram Connected Status */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">
                  ✅ Instagram @{instagramStatus.username} connected successfully!
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    console.log("🔄 Refreshing Instagram status...");
                    refreshStatus();
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
          <ConnectedDashboard />
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
