import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, ChevronDown, Activity } from "lucide-react";
import useActivityFeed from "@/hooks/useActivityFeed";

/**
 * ActivityFeedCard - Displays recent user activities and automation events
 * Uses the new /api/user/activity endpoint
 */
const ActivityFeedCard = ({ maxItems = 10, showLoadMore = false }) => {
  const {
    activities,
    loading,
    error,
    pagination,
    summary,
    loadMore,
    refresh,
    canLoadMore,
    isRefreshing,
    hasActivities,
  } = useActivityFeed(maxItems);

  const getActivityIcon = (type) => {
    const icons = {
      automation_triggered: "🎯",
      automation_enabled: "🚀",
      automation_disabled: "⏸️",
      instagram_connected: "📱",
      instagram_disconnected: "📱",
      settings_updated: "⚙️",
      keyword_added: "🏷️",
      template_updated: "💬",
      dm_sent: "✉️",
      dm_failed: "❌",
      comment_detected: "👁️",
      rate_limit_hit: "⏰",
    };
    return icons[type] || "📋";
  };

  const getActivityColor = (status) => {
    const colors = {
      success: "text-green-600 bg-green-50 border-green-200",
      error: "text-red-600 bg-red-50 border-red-200",
      warning: "text-orange-600 bg-orange-50 border-orange-200",
      info: "text-blue-600 bg-blue-50 border-blue-200",
    };
    return colors[status] || colors.info;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Failed to load activity feed
            </p>
            <Button onClick={refresh} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
            {summary.totalActivities > 0 && (
              <Badge variant="secondary" className="ml-2">
                {summary.totalActivities}
              </Badge>
            )}
          </CardTitle>

          <Button
            onClick={refresh}
            variant="ghost"
            size="sm"
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        {summary.recentActivity && (
          <p className="text-sm text-muted-foreground">
            Last activity: {formatTimestamp(summary.recentActivity)}
          </p>
        )}
      </CardHeader>

      <CardContent>
        {loading && activities.length === 0 ? (
          // Loading state
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded animate-pulse"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !hasActivities ? (
          // Empty state
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-medium text-lg mb-2">No Activity Yet</h3>
            <p className="text-muted-foreground text-sm">
              Connect your Instagram account and set up automation to see
              activity here.
            </p>
          </div>
        ) : (
          // Activity list
          <div className="space-y-0">
            {activities.map((activity, index) => (
              <div key={activity.id}>
                <div className="flex items-start gap-3 py-3">
                  {/* Activity Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border ${getActivityColor(
                        activity.status
                      )}`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs px-2 py-0 ${getActivityColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{formatTimestamp(activity.timestamp)}</span>
                      {activity.metadata && (
                        <>
                          {activity.metadata.keyword && (
                            <span>Keyword: {activity.metadata.keyword}</span>
                          )}
                          {activity.metadata.comment && (
                            <span>
                              Comment:{" "}
                              {activity.metadata.comment.substring(0, 30)}...
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {index < activities.length - 1 && <Separator />}
              </div>
            ))}

            {/* Load More Button */}
            {showLoadMore && canLoadMore && (
              <div className="pt-4">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Load More Activities
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Activity Summary */}
        {hasActivities && summary && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm font-medium">Automation</p>
                <p
                  className={`text-xs ${
                    summary.automationActive
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {summary.automationActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Instagram</p>
                <p
                  className={`text-xs ${
                    summary.instagramConnected
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {summary.instagramConnected ? "Connected" : "Disconnected"}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeedCard;
