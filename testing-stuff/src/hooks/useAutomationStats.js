import { useState, useEffect } from "react";
import { useAPI } from "./useAPI";

/**
 * Hook to fetch and manage automation statistics
 * Uses the /api/user/automation/stats endpoint
 */
export const useAutomationStats = () => {
  const { get } = useAPI();

  const [stats, setStats] = useState({
    isEnabled: false,
    keywordsCount: 0,
    keywords: [],
    totalTriggers: 0,
    successfulDMs: 0,
    failedDMs: 0,
    successRate: 0,
    lastTriggeredAt: null,
    dmTemplate: "",
    rateLimiting: {
      maxDMsPerHour: 10,
      maxDMsPerDay: 50,
      delayBetweenDMs: 30,
    },
    instagramConnected: false,
    instagramUsername: null,
    setupProgress: {
      steps: {
        instagramConnected: false,
        keywordsAdded: false,
        templateCreated: false,
        automationEnabled: false,
      },
      progress: 0,
      isComplete: false,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchStats = async (force = false) => {
    // Avoid too frequent requests (minimum 5 seconds between fetches)
    if (!force && lastFetch && Date.now() - lastFetch < 5000) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await get("/user/automation/stats");

      if (response.success && response.stats) {
        setStats(response.stats);
        setLastFetch(Date.now());
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Failed to fetch automation stats:", err);
      setError(err.message);

      // Keep existing stats on error, don't reset to defaults
      if (!stats.totalTriggers) {
        // Only set defaults if we have no data at all
        setStats((prev) => ({ ...prev }));
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, []);

  // Auto-refresh every 60 seconds if automation is enabled
  useEffect(() => {
    if (!stats.isEnabled) return;

    const interval = setInterval(() => {
      fetchStats();
    }, 60000); // 60 seconds to reduce load

    return () => clearInterval(interval);
  }, [stats.isEnabled]); // Removed lastFetch dependency to prevent infinite loops

  return {
    stats,
    loading,
    error,
    refetch: () => fetchStats(true),

    // Computed values for convenience
    isSetupComplete: stats.setupProgress.isComplete,
    setupProgress: stats.setupProgress.progress,
    hasKeywords: stats.keywordsCount > 0,
    hasTemplate: Boolean(stats.dmTemplate?.trim()),
    isActive: stats.isEnabled && stats.instagramConnected,

    // Performance metrics
    performanceData: {
      successRate: stats.successRate,
      totalDMs: stats.successfulDMs + stats.failedDMs,
      avgDMsPerTrigger:
        stats.totalTriggers > 0
          ? (stats.successfulDMs + stats.failedDMs) / stats.totalTriggers
          : 0,
    },
  };
};

export default useAutomationStats;
