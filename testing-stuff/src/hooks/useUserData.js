import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAPI } from "./useAPI";
import { useBackendSync } from "./useBackendSync";

export const useUserData = () => {
  const { isLoaded } = useAuth();
  const { get } = useAPI();
  const { backendUser, isBackendSynced, backendConnected } = useBackendSync();

  // Data states
  const [instagramData, setInstagramData] = useState({
    isConnected: false,
    username: null,
    followers: 0,
    profilePicture: null,
  }); // Set default state to prevent infinite loops
  const [analyticsData, setAnalyticsData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  // Loading states
  const [loadingInstagram, setLoadingInstagram] = useState(false); // Set to false since we're not fetching
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  // Error states
  const [error, setError] = useState(null);

  // Fetch Instagram connection status
  const fetchInstagramStatus = async () => {
    try {
      setLoadingInstagram(true);
      const response = await get("/instagram/status");
      setInstagramData(response.data || response);
    } catch (err) {
      console.error("Error fetching Instagram status:", err);
      // Set default Instagram not connected state
      setInstagramData({
        isConnected: false,
        username: null,
        followers: 0,
        profilePicture: null,
      });
    } finally {
      setLoadingInstagram(false);
    }
  };

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true);
      const response = await get("/user/analytics");
      setAnalyticsData(response.data || response);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      // Set default analytics data
      setAnalyticsData({
        activeAutomations: 0,
        messagesSent: 0,
        responseRate: 0,
        followers: 0,
      });
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // Fetch dashboard overview data
  const fetchDashboardData = async () => {
    try {
      setLoadingDashboard(true);
      const response = await get("/dashboard/overview");
      setDashboardData(response.data || response);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      // Set default dashboard data
      setDashboardData({
        totalMessages: 0,
        successfulDMs: 0,
        failedDMs: 0,
        activeAutomations: 0,
        instagramPosts: 0,
        recentActivity: [],
      });
    } finally {
      setLoadingDashboard(false);
    }
  };

  // Refresh all data
  const refetchData = async () => {
    if (!isLoaded || !isBackendSynced) return;

    await Promise.all([
      // fetchInstagramStatus(), // Temporarily disabled to prevent infinite loops
      fetchAnalytics(),
      fetchDashboardData(),
    ]);
  };

  // Initialize data when backend sync is complete
  useEffect(() => {
    if (isLoaded && isBackendSynced && backendConnected) {
      refetchData();
    }
  }, [isLoaded, isBackendSynced, backendConnected]);

  return {
    // Data (user data comes from backendSync hook)
    user: backendUser,
    instagram: instagramData,
    analytics: analyticsData,
    dashboard: dashboardData,

    // Loading states
    loadingInstagram,
    loadingAnalytics,
    loadingDashboard,
    isLoading: loadingInstagram || loadingAnalytics || loadingDashboard,

    // Backend sync states
    isBackendSynced,
    backendConnected,

    // Error states
    error,

    // Actions
    refetch: refetchData,
    refetchInstagram: fetchInstagramStatus,
    refetchAnalytics: fetchAnalytics,
    refetchDashboard: fetchDashboardData,
  };
};
