import { useState, useEffect, useCallback } from "react";
import { useAPI } from "./useAPI";

/**
 * Hook to fetch and manage user activity feed
 * Uses the /api/user/activity endpoint with pagination
 */
export const useActivityFeed = (initialLimit = 10) => {
  const { get } = useAPI();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    limit: initialLimit,
    offset: 0,
    total: 0,
    hasMore: false,
  });
  const [summary, setSummary] = useState({
    totalActivities: 0,
    recentActivity: null,
    automationActive: false,
    instagramConnected: false,
  });

  const fetchActivities = useCallback(
    async (limit = initialLimit, offset = 0, append = false) => {
      try {
        if (!append) {
          setLoading(true);
        }
        setError(null);

        const response = await get(
          `/user/activity?limit=${limit}&offset=${offset}`
        );

        if (response.success) {
          const newActivities = response.activities || [];

          if (append) {
            // Append to existing activities (for load more)
            setActivities((prev) => [...prev, ...newActivities]);
          } else {
            // Replace activities (for initial load or refresh)
            setActivities(newActivities);
          }

          setPagination(
            response.pagination || {
              limit,
              offset,
              total: newActivities.length,
              hasMore: false,
            }
          );

          setSummary(
            response.summary || {
              totalActivities: newActivities.length,
              recentActivity: newActivities[0]?.timestamp || null,
              automationActive: false,
              instagramConnected: false,
            }
          );
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Failed to fetch activity feed:", err);
        setError(err.message);

        // Set empty state on error to prevent infinite loops
        if (!append) {
          setActivities([]);
          setPagination({
            limit: initialLimit,
            offset: 0,
            total: 0,
            hasMore: false,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [get, initialLimit]
  ); // Removed activities.length dependency causing infinite loop

  const loadMore = async () => {
    if (pagination.hasMore && !loading) {
      const nextOffset = pagination.offset + pagination.limit;
      await fetchActivities(pagination.limit, nextOffset, true);
    }
  };

  const refresh = async () => {
    await fetchActivities(pagination.limit, 0, false);
  };

  // Initial fetch
  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount to prevent infinite loops

  // Session-based auto-refresh to prevent server overload
  useEffect(() => {
    // Check if we've already auto-refreshed in this session
    const sessionKey = `activity-feed-last-refresh-${new Date().toDateString()}`;
    const lastRefresh = sessionStorage.getItem(sessionKey);
    const now = Date.now();
    
    // Only auto-refresh once every 15 minutes and only on first page
    if (pagination.offset === 0) {
      if (!lastRefresh || (now - parseInt(lastRefresh)) > 900000) {
        const interval = setInterval(() => {
          fetchActivities(pagination.limit, 0, false);
          sessionStorage.setItem(sessionKey, now.toString());
        }, 900000); // Increased from 2min to 15 minutes to prevent server overload

        return () => clearInterval(interval);
      }
    }
  }, [pagination.offset, pagination.limit]); // Removed fetchActivities dependency

  // Helper function to get activities by type
  const getActivitiesByType = (type) => {
    return activities.filter((activity) => activity.type === type);
  };

  // Helper function to get recent activities (last 24 hours)
  const getRecentActivities = (hours = 24) => {
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - hours);

    return activities.filter(
      (activity) => new Date(activity.timestamp) > cutoff
    );
  };

  return {
    activities,
    loading,
    error,
    pagination,
    summary,

    // Actions
    loadMore,
    refresh,

    // Utility functions
    getActivitiesByType,
    getRecentActivities,

    // Computed values
    hasActivities: activities.length > 0,
    canLoadMore: pagination.hasMore && !loading,
    isRefreshing: loading && activities.length > 0,

    // Activity type counts
    activityCounts: {
      automationTriggered: getActivitiesByType("automation_triggered").length,
      automationEnabled: getActivitiesByType("automation_enabled").length,
      instagramConnected: getActivitiesByType("instagram_connected").length,
      settingsUpdated: getActivitiesByType("settings_updated").length,
    },
  };
};

export default useActivityFeed;
